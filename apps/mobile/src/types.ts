/** Controlled topic tags (v0.1). See specs/content-rules.md */
export type TopicTag =
  | 'software'
  | 'systems'
  | 'web'
  | 'oss'
  | 'electronics'
  | 'networks'
  | 'reliability'
  | 'practices';

export type SourceLicense =
  | 'CC-BY-SA-4.0'
  | 'CC-BY-SA-2.5+'
  | 'CC-BY-4.0'
  | 'CC0-1.0'
  | 'MIT'
  | 'Apache-2.0'
  | 'BSD-3-Clause'
  | string;

export interface BriefSource {
  title: string;
  url: string;
  license: SourceLicense;
  attribution_text: string;
}

export interface Brief {
  id: string;
  title: string;
  summary: string;
  tags: TopicTag[];
  source: BriefSource;
  order: number;
}

export interface Feed {
  version: string;
  briefs: Brief[];
}
