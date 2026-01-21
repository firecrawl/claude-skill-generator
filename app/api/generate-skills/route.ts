import { NextRequest, NextResponse } from "next/server";

// Types for agent job creation response
interface AgentJobResponse {
  success: boolean;
  id?: string;
  error?: string;
}

// Reference file for endpoint documentation
interface ReferenceFile {
  name: string;
  content: string;
}

// Endpoint preview for UI display
interface EndpointPreview {
  name: string;
  description: string;
  method: string;
  path: string;
}

// Generated skill package from Firecrawl agent
interface GeneratedSkillPackage {
  serviceName: string;
  skillName: string;
  serviceDescription: string;
  shortDescription: string;
  hasDocumentation: boolean;
  skillMd: string;
  references: ReferenceFile[];
  endpoints: EndpointPreview[];
}

// Types for agent status/result response
interface AgentStatusResponse {
  success: boolean;
  status: "processing" | "completed" | "failed";
  data?: GeneratedSkillPackage;
  expiresAt?: string;
  creditsUsed?: number;
}

// Helper to poll for agent completion with retry logic
async function pollAgentStatus(
  jobId: string,
  apiKey: string,
  maxAttempts = 200, // ~10 minutes with 3s intervals
  intervalMs = 3000,
): Promise<AgentStatusResponse> {
  console.log(`[Agent] Starting to poll job ${jobId}`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    console.log(`[Agent] Poll attempt ${attempt + 1}/${maxAttempts}`);

    try {
      const response = await fetch(
        `https://api.firecrawl.dev/v2/agent/${jobId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Agent] HTTP error: ${response.status} - ${errorText}`);
        // Continue polling on HTTP errors (might be temporary)
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
        continue;
      }

      const result = (await response.json()) as AgentStatusResponse;
      console.log(`[Agent] Status: ${result.status}`);

      if (result.status === "completed") {
        console.log("[Agent] Job completed!");
        return result;
      }

      if (result.status === "failed") {
        throw new Error("Agent job failed");
      }

      // Still processing, wait and retry
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    } catch (error) {
      // Handle network errors with retry
      if (
        error instanceof Error &&
        (error.message.includes("ECONNRESET") ||
          error.message.includes("fetch failed"))
      ) {
        console.log(`[Agent] Network error, retrying... (${error.message})`);
        await new Promise((resolve) => setTimeout(resolve, intervalMs * 2));
        continue;
      }
      throw error;
    }
  }

  throw new Error("Agent job timed out after 10 minutes");
}

export async function POST(request: NextRequest) {
  try {
    const { url, apiKey: userApiKey } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: "URL is required" },
        { status: 400 },
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid URL format" },
        { status: 400 },
      );
    }

    // Determine which API key to use based on app mode
    const isProductionMode = process.env.NEXT_PUBLIC_APP_MODE === "PRODUCTION";
    let apiKey: string | undefined;

    if (isProductionMode) {
      // In production mode, use the user-provided API key
      if (!userApiKey) {
        return NextResponse.json(
          { success: false, error: "API key is required. Please add your Firecrawl API key." },
          { status: 400 },
        );
      }
      apiKey = userApiKey;
    } else {
      // In non-production mode, use the server environment variable
      apiKey = process.env.FIRECRAWL_API_KEY;
    }

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "No Firecrawl API key configured." },
        { status: 400 },
      );
    }

    // Use Firecrawl agent to extract AND generate the complete skill package
    const agentPrompt = `You are a Claude Code skill generator. Analyze this API documentation and generate a complete Claude Code skill package.

IMPORTANT DISTINCTION: You are creating a SKILL for Claude (an AI assistant), NOT API documentation for human developers.
- Skills are TASK-ORIENTED: Guide Claude's decision-making process
- API docs are REFERENCE-ORIENTED: Exhaustive parameter lists for humans
- Focus on: When to use what, decision trees, error recovery, common workflows

CRITICAL INSTRUCTIONS:
- You MUST explore the ENTIRE documentation site, not just the landing page
- Navigate to ALL endpoint pages, API reference sections, and subpages
- Look for navigation menus, sidebars, and links to find ALL available endpoints
- Do NOT rely on cached or outdated information - fetch the latest documentation
- Generate COMPLETE, ready-to-use markdown files with CURL examples (NOT Python scripts)

Return a JSON object with:

1. "serviceName": The name of the service/API (e.g., "Firecrawl", "Stripe", "OpenAI")

2. "skillName": The skill name in lowercase-with-hyphens format (e.g., "firecrawl-api", "stripe-api", "openai-api"). This MUST match the directory name that will be used.

3. "serviceDescription": A VERY DETAILED and comprehensive description (5-10 sentences) that fully explains:
   - What this API/service does and its primary purpose
   - ALL the main capabilities and features it offers
   - What types of tasks/problems it solves
   - Key use cases and when someone would use this API
   - Any unique features or strengths
   This description should be detailed enough that a model reading ONLY this description understands everything the skill can do.

4. "shortDescription": A CONCISE description (300-400 characters max) for the YAML frontmatter that is scannable and keyword-rich. Focus on:
   - Primary function in one phrase
   - Key capabilities (comma-separated)
   - Main use cases
   Example: "Web scraping and data extraction API for converting websites into clean markdown, HTML, JSON, or structured data. Use for scraping pages, crawling sites, mapping URLs, searching the web, or extracting structured data with natural language prompts."

5. "hasDocumentation": true if this is API/developer docs, false otherwise

6. "skillMd": A complete SKILL.md file following this EXACT structure:

   YAML FRONTMATTER (only 2 fields - this is for SKILLS, not slash commands):
   \`\`\`yaml
   ---
   name: [skillName - lowercase-with-hyphens, MUST match directory name]
   description: [Comprehensive description of what this skill does AND when to use it. Should be detailed enough (300-500 chars) that Claude knows both capabilities and when to activate this skill.]
   ---
   \`\`\`

   NOTE: Do NOT include allowed-tools, argument-hint, model, license, compatibility, or metadata fields - those are for slash commands, not skills.

   BODY SECTIONS (in this exact order):

   ## How to Use This Skill
   Brief 2-3 sentence overview explaining what this skill enables Claude to do.

   ## Decision Tree
   Create a numbered decision tree to help Claude select the right endpoint:
   1. **User wants X** → Use \`/endpoint-a\`
   2. **User wants Y** → Use \`/endpoint-b\`
   3. **User wants Z** → Use \`/endpoint-c\`
   ... (cover ALL main endpoints/operations)

   ## When to Use
   Bullet points explaining specific scenarios when Claude should use this skill. Be concrete.

   ## Quick Examples
   Include 2-3 simple, ready-to-copy CURL examples demonstrating the most common operations.
   Format as:
   ### [Operation Name]
   \`\`\`bash
   curl command here
   \`\`\`

   ## Common Workflows
   Include 2-3 complete multi-step workflows showing how to accomplish real tasks:
   ### [Workflow Name] (e.g., "Research Workflow", "Data Extraction Workflow")
   1. First step with explanation
   2. Second step with explanation
   3. Final step with explanation

   ## Available References
   List all reference files with their paths (references/filename.md) and a brief description.

   ## Authentication
   Environment variable name (SERVICE_NAME_API_KEY format) and how to use it.

7. "references": An array of reference markdown files. IMPORTANT STRUCTURE:

   ALWAYS include these files:
   - "quickstart.md": Getting started guide with workflows
   - "common.md": Authentication, base URL, errors, rate limits, SDKs, AND error recovery guidance
   - Additional files grouped by feature (scrape.md, crawl.md, etc.)

   GROUPING RULES:
   - GROUP related endpoints into a SINGLE file
   - Do NOT create separate files for each HTTP method on the same resource
   - Keep reference files CONCISE - Claude can construct curl commands from parameter tables

   EACH REFERENCE FILE STRUCTURE:
   - "## TL;DR" section (2-3 bullet points for quick scanning)
   - Clear title describing the feature/capability
   - Brief explanation of when to use this feature (1-2 sentences)
   - For EACH endpoint:
     - "### [Endpoint Name]" as a subsection
     - Method and path on one line
     - 1-2 sentence description
     - Parameters table (ONLY required params and common optional ones - skip obvious/rarely-used ones)
     - ONE concise CURL example per endpoint
     - Brief response example (omit obvious fields like "success": true)
   - "## Use Cases" section at the end (MAXIMUM 3 bullet points)

   "quickstart.md" MUST contain:
   - "## TL;DR" with the 3 most important things to know
   - "## Getting Started" with setup steps
   - "## Common Workflows" with 3-5 complete, multi-step workflow examples:
     Each workflow should be a real-world task (e.g., "Research a Competitor", "Extract Product Data", "Monitor Website Changes")
     showing the complete flow from start to finish with numbered steps

   "common.md" MUST contain:
   - "## TL;DR" summarizing auth and key info
   - "## Authentication" with instructions
   - "## Base URL" for all requests
   - "## Rate Limits" with specific limits if documented
   - "## Error Handling" with error codes AND recovery steps
   - "## Error Recovery" section with specific guidance for Claude:
     **401 Unauthorized:** Verify API key is set, ask user to provide if missing
     **429 Rate Limited:** Wait and retry, suggest batch operations
     **402 Payment Required:** Inform user to add credits
     **5xx Server Error:** Retry with exponential backoff
     (Include all relevant error codes for this API)
   - "## SDK Integration" with installation commands for official SDKs (Python, Node.js, etc.) if available

8. "endpoints": Array of ALL endpoint previews for UI display, each with:
   - "name": Endpoint name in snake_case
   - "description": Detailed description (2-3 sentences)
   - "method": HTTP method
   - "path": Endpoint path

IMPORTANT: Be extremely thorough - explore every page of the documentation. Extract ALL endpoints. Make the skill TASK-ORIENTED, helping Claude make decisions, not just listing API parameters.`;

    const schema = {
      type: "object",
      properties: {
        serviceName: {
          type: "string",
          description: "Display name of the service/API (e.g., 'Firecrawl', 'Stripe')",
        },
        skillName: {
          type: "string",
          description:
            "Skill name in lowercase-with-hyphens format for directory and frontmatter name field (e.g., 'firecrawl-api', 'stripe-api')",
        },
        serviceDescription: {
          type: "string",
          description:
            "Very detailed description (5-10 sentences) covering all capabilities, features, use cases, and strengths of the API",
        },
        shortDescription: {
          type: "string",
          description:
            "Concise description (300-400 characters) for YAML frontmatter - scannable and keyword-rich",
        },
        hasDocumentation: {
          type: "boolean",
          description: "Whether the page contains actual API documentation",
        },
        skillMd: {
          type: "string",
          description:
            "Complete SKILL.md with YAML frontmatter (ONLY name and description fields), How to Use This Skill, Decision Tree, When to Use, Quick Examples, Common Workflows, Available References, and Authentication sections",
        },
        references: {
          type: "array",
          description:
            "Reference files including quickstart.md (with workflows), common.md (with error recovery and SDK integration), and concise feature-specific files. Each file starts with TL;DR section.",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description:
                  "Filename (quickstart.md, common.md, scrape.md, etc.)",
              },
              content: {
                type: "string",
                description:
                  "Complete markdown content starting with TL;DR section",
              },
            },
          },
        },
        endpoints: {
          type: "array",
          description: "All endpoints for UI display",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Endpoint name in snake_case",
              },
              description: {
                type: "string",
                description:
                  "Detailed description (2-3 sentences) of what this endpoint does and when to use it",
              },
              method: {
                type: "string",
                description: "HTTP method",
              },
              path: {
                type: "string",
                description: "Endpoint path",
              },
            },
          },
        },
      },
      required: [
        "serviceName",
        "skillName",
        "serviceDescription",
        "shortDescription",
        "hasDocumentation",
        "skillMd",
        "references",
        "endpoints",
      ],
    };

    // Start the Firecrawl agent job
    console.log(`[Agent] Starting job for URL: ${url}`);
    const agentResponse = await fetch("https://api.firecrawl.dev/v2/agent", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urls: [url],
        prompt: agentPrompt,
        schema,
      }),
    });

    if (!agentResponse.ok) {
      const errorText = await agentResponse.text();
      throw new Error(
        `Firecrawl API error: ${agentResponse.status} - ${errorText}`,
      );
    }

    const jobResponse = (await agentResponse.json()) as AgentJobResponse;
    console.log(`[Agent] Job response:`, JSON.stringify(jobResponse));

    if (!jobResponse.success || !jobResponse.id) {
      return NextResponse.json(
        {
          success: false,
          error: jobResponse.error || "Failed to start agent job",
        },
        { status: 500 },
      );
    }

    // Poll for job completion
    const result = await pollAgentStatus(jobResponse.id, apiKey);

    if (!result.success || !result.data) {
      return NextResponse.json(
        { success: false, error: "Failed to analyze documentation" },
        { status: 500 },
      );
    }

    const skillPackage = result.data;
    console.log(
      `[Agent] Generated skill package for: ${skillPackage.serviceName}`,
    );

    // Check if documentation was found
    if (!skillPackage.hasDocumentation) {
      return NextResponse.json({
        success: true,
        data: {
          hasDocumentation: false,
          message:
            "No API documentation found at this URL. Please provide a link to developer/API documentation.",
          sourceUrl: url,
        },
      });
    }

    // Return the generated skill package
    // Use skillName directly as it's already in the correct format (lowercase-with-hyphens)
    // The folder name matches the name field in SKILL.md frontmatter as per spec
    const skillFolderName = skillPackage.skillName;

    return NextResponse.json({
      success: true,
      data: {
        hasDocumentation: true,
        serviceName: skillPackage.serviceName,
        serviceDescription: skillPackage.serviceDescription,
        shortDescription: skillPackage.shortDescription,
        skillFolderName: skillFolderName,
        files: {
          skillMd: skillPackage.skillMd,
          references: skillPackage.references,
        },
        endpoints: skillPackage.endpoints,
        sourceUrl: url,
        creditsUsed: result.creditsUsed,
      },
    });
  } catch (error) {
    console.error("Skill generation error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    if (errorMessage.includes("402") || errorMessage.includes("insufficient")) {
      return NextResponse.json(
        { success: false, error: "Insufficient Firecrawl credits." },
        { status: 402 },
      );
    }

    if (errorMessage.includes("401") || errorMessage.includes("unauthorized")) {
      return NextResponse.json(
        { success: false, error: "Invalid API key." },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
