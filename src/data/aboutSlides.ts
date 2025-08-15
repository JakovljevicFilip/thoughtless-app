import type { AboutSlideData } from 'src/types/AboutSlideData';

export const aboutSlides: AboutSlideData[] = [
  {
    name: 'intro',
    bgColor: 'bg-primary',
    title: 'What is Thoughtless?',
    body: 'Thoughtless is a simple, intuitive way to capture your fleeting thoughts and ideas without friction, so you can focus on what matters.',
    tag: 'h1'
  },
  {
    name: 'problem',
    bgColor: 'bg-negative',
    title: 'The Problem?',
    body: 'Ideas come and go quickly, and without an easy way to store them, they are often forgotten or lost in the chaos of daily life.'
  },
  {
    name: 'solution',
    bgColor: 'bg-positive',
    title: 'Solution',
    body: 'With Thoughtless, you can instantly jot down your thoughts, organize them effortlessly, and retrieve them when you need inspiration.'
  }
];
