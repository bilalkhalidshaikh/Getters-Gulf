export type Language = 'en' | 'ar' | 'it' | 'de';

export type View = 'home' | 'philosophy' | 'systems' | 'leadership';

export interface ServiceItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  span?: string; 
}

export interface ServiceCategory {
  id: string;
  nameKey: string;
  descriptionKey: string;
  items: ServiceItem[];
  promptContext: string;
}

export interface Leader {
  id: string;
  name: string;
  roleKey: string;
  archetypeKey: string;
  descriptionKey: string;
  imagePrompt: string;
}

export interface TranslationSchema {
  nav: {
    philosophy: string;
    systems: string;
    leadership: string;
    deploy: string;
    home: string;
  };
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    cta: string;
    caseStudies: string;
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
    loc1: string;
    loc2: string;
  };
  philosophy: {
    title: string;
    subtitle: string;
    card1Title: string;
    card1Subtitle: string;
    card1Desc: string;
    card2Title: string;
    card2Subtitle: string;
    card2Desc: string;
    processTitle: string;
    step1: string;
    step2: string;
    step3: string;
  };
  systems: {
    title: string;
    subtitle: string;
  };
  leadership: {
    title: string;
    subtitle: string;
  };
  footer: {
    basedIn: string;
    rights: string;
    request: string;
  };
  // Dynamic keys for content
  [key: string]: any;
}