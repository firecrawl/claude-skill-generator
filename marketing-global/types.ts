export interface Hero {
  badge: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

export interface SEO {
  title: string;
  description: string;
}

export interface CustomerStory {
  company: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface Tutorial {
  title: string;
  description: string;
  slug: string;
  image?: string;
}

export interface YouTubeVideo {
  title: string;
  creator: string;
  url: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface FooterCTA {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  primaryButton?: {
    label: string;
    href: string;
  };
  secondaryButton?: {
    label: string;
    href: string;
  };
}

export interface Logo {
  src: string;
  alt: string;
}

export interface UseCaseData {
  id: string;
  component: string;
  hero: Hero;
  seo: SEO;
  bullets: string[];
  customerStories: CustomerStory[];
  tutorials: Tutorial[];
  youtubeVideos: YouTubeVideo[];
  logos: Logo[];
  faqs: FAQ[];
  footerCTA: FooterCTA;
}

export interface IntegrationTool {
  name: string;
  description: string;
  docsUrl: string;
  logo?: string;
}

export interface SetupStep {
  title: string;
  description: string;
  code?: {
    code: string;
    language: string;
    title?: string;
  };
}

export interface SetupGuide {
  title: string;
  description: string;
  steps: SetupStep[];
}

export interface PopularIntegration {
  name: string;
  description: string;
  category: string;
}

export interface DetailedUseCase {
  title: string;
  subtitle?: string;
  description: string;
  example?: {
    code: string;
    language: string;
    title?: string;
  };
}

export interface IntegrationData {
  id: string;
  hero: Hero;
  features?: string[];
  tools?: IntegrationTool[];
  items?: IntegrationTool[];
  editors?: IntegrationTool[];
  useCases?: string[] | DetailedUseCase[];
  actions?: string[];
  popularIntegrations?: PopularIntegration[];
  validationPoints?: string[];
  setupGuide?: SetupGuide;
  tutorials?: Tutorial[];
  youtubeVideos?: YouTubeVideo[];
  faqs: FAQ[];
  footerCTA: FooterCTA;
}

export interface WhyFirecrawlBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyFirecrawl {
  title: string;
  subtitle: string;
  description: string;
  benefits: WhyFirecrawlBenefit[];
}
