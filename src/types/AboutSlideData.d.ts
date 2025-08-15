export type SlideName = 'intro' | 'problem' | 'solution';

export interface AboutSlideData {
  name: SlideName;
  bgColor: `bg-${string}`; // e.g. bg-primary, bg-negative
  title: string;
  body: string;
  tag?: 'h1' | 'h2' | 'h3';
}
