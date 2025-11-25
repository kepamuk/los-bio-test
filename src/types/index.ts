export * from "./api";

export interface Slide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  image: string | null;
}

export interface SlideRaw {
  id: number;
  value: string | SlideData;
}

export interface SlideData {
  id?: number;
  title?: string;
  description?: string;
  btnText?: string;
  link?: string;
  image?: Array<{
    name: string;
    catalog?: string;
  }>;
}

export interface Advantage {
  id: number;
  title: string;
  description: string;
  icon: string | null;
}

export interface AdvantageRaw {
  id: number;
  value: string | AdvantageData;
}

export interface AdvantageData {
  id?: number;
  title?: string;
  description?: string;
  icon?: string;
}

export interface Photo {
  id?: number;
  catalog: string;
  name: string;
}

export interface EditorBlock {
  id?: string;
  type: string;
  data?: {
    text?: string;
    level?: number;
    items?: string[];
    style?: string;
    link?: string;
  };
}

export interface EditorData {
  blocks: EditorBlock[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  short_description?: EditorData | string;
  description?: EditorData;
  photos?: Photo[];
  image?: string;
  works?: string;
  equipment?: string;
  customer?: string;
  date?: string;
}

export interface ParsedProject {
  id: number;
  slug: string;
  title: string;
  image: string | null;
  shortDescription: string;
  type: string;
  client: string;
}

export interface LoadingProps {
  fullHeight?: boolean;
  size?: string;
  text?: string;
}

export interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  fullHeight?: boolean;
}

export interface Theme {
  breakpoints: {
    mobile: string;
    tablet: string;
    smallDesktop: string;
    desktop: string;
  };
  media: {
    mobile: string;
    tablet: string;
    smallDesktop: string;
    desktop: string;
  };
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    light: string;
    dark: string;
    darkBlue: string;
    navy: string;
    white: string;
    black: string;
    text: string;
    textLight: string;
    textWhite: string;
    background: string;
    border: string;
    borderLight: string;
    overlay: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
    huge: string;
  };
  fonts: {
    body: string;
    heading: string;
  };
  fontWeights: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}
