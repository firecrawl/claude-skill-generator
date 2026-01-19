export interface ReferenceFile {
  name: string;
  content: string;
}

export interface SkillFiles {
  skillMd: string;
  references: ReferenceFile[];
}

export interface EndpointPreview {
  name: string;
  description: string;
  method: string;
  path: string;
}

export interface ExtractedEndpoint {
  name: string;
  description: string;
  method: string;
  path: string;
  fullUrl: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    defaultValue?: string;
  }[];
  requestBody?: {
    contentType: string;
    schema: string;
    example: string;
  };
  responseExample?: string;
  curlExample: string;
  authentication: string;
}

export interface ExtractedApiData {
  serviceName: string;
  serviceDescription: string;
  hasDocumentation: boolean;
  baseUrl: string;
  authentication: {
    type: string;
    headerName?: string;
    description: string;
  };
  endpoints: ExtractedEndpoint[];
}

// Generated skill package from Firecrawl agent
export interface GeneratedSkillPackage {
  skillMd: string;
  references: ReferenceFile[];
}

export interface SkillGenerationResult {
  hasDocumentation: boolean;
  message?: string;
  serviceName?: string;
  serviceDescription?: string;
  shortDescription?: string;
  skillFolderName?: string;
  files?: SkillFiles;
  endpoints?: EndpointPreview[];
  sourceUrl: string;
  creditsUsed?: number;
}

export interface SkillGenerationResponse {
  success: boolean;
  data?: SkillGenerationResult;
  error?: string;
}

// Cache structure for localStorage
export interface CachedApiData {
  url: string;
  extractedApiData: ExtractedApiData;
  timestamp: number;
}
