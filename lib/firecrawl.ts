import FirecrawlApp from "@mendable/firecrawl-js";

/**
 * Initialize Firecrawl client
 * Set your API key in environment variables: FIRECRAWL_API_KEY
 */
export function getFirecrawlClient() {
  const apiKey = process.env.FIRECRAWL_API_KEY;

  if (!apiKey) {
    throw new Error("FIRECRAWL_API_KEY is not set in environment variables");
  }

  return new FirecrawlApp({ apiKey });
}

/**
 * Scrape a single URL
 */
export async function scrapeUrl(url: string) {
  const firecrawl = getFirecrawlClient();

  try {
    const result = await firecrawl.scrape(url, {
      formats: ["markdown", "html"],
    });

    return result;
  } catch (error) {
    console.error("Error scraping URL:", error);
    throw error;
  }
}

/**
 * Crawl a website
 */
export async function crawlWebsite(
  url: string,
  options?: {
    limit?: number;
    scrapeOptions?: {
      formats?: string[];
    };
  },
) {
  const firecrawl = getFirecrawlClient();

  try {
    const result = await firecrawl.crawl(url, {
      limit: options?.limit || 10,
      scrapeOptions: {
        formats: (options?.scrapeOptions?.formats || ["markdown"]) as
          | ["markdown"]
          | ["html"]
          | ["markdown", "html"],
      },
    });

    return result;
  } catch (error) {
    console.error("Error crawling website:", error);
    throw error;
  }
}

/**
 * Map a website to get all accessible URLs
 */
export async function mapWebsite(url: string) {
  const firecrawl = getFirecrawlClient();

  try {
    const result = await firecrawl.map(url);
    return result;
  } catch (error) {
    console.error("Error mapping website:", error);
    throw error;
  }
}

/**
 * Search using Firecrawl
 */
export async function searchWeb(
  query: string,
  options?: {
    limit?: number;
  },
) {
  const firecrawl = getFirecrawlClient();

  try {
    const result = await firecrawl.search(query, {
      limit: options?.limit || 10,
    });

    return result;
  } catch (error) {
    console.error("Error searching:", error);
    throw error;
  }
}
