export interface BrandingData {
  colorScheme?: "light" | "dark";
  images?: {
    logo?: string;
    favicon?: string;
    ogImage?: string;
  };
  colors?: Record<string, string>;
  fonts?: Array<string | { family: string; role?: string }>;
  typography?: {
    fontFamilies?: Record<string, string>;
    fontSizes?: Record<string, string>;
    fontWeights?: Record<string, string>;
    lineHeights?: Record<string, string>;
  };
  components?: {
    buttonPrimary?: {
      background: string;
      textColor: string;
      borderColor?: string;
      borderRadius: string;
      shadow?: string;
    };
    buttonSecondary?: {
      background: string;
      textColor: string;
      borderColor?: string;
      borderRadius: string;
      shadow?: string;
    };
    input?: {
      borderColor: string;
      borderRadius: string;
    };
  };
  icons?: {
    style?: string;
    primaryColor?: string;
  };
  animations?: {
    transitionDuration?: string;
    easing?: string;
  };
  layout?: {
    grid?: {
      columns?: string;
      maxWidth?: string;
    };
    headerHeight?: string;
    footerHeight?: string;
  };
  tone?: {
    voice?: string;
    emojiUsage?: string;
  };
  personality?: {
    tone: string;
    energy: string;
    targetAudience: string;
  };
  spacing?: Record<string, string>;
}
