'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins — called once at app initialization
let registered = false;

export function registerGSAPPlugins() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

// Custom text splitter (replaces GSAP SplitText Club plugin)
export function splitTextIntoSpans(
  element: HTMLElement,
  type: 'chars' | 'words' | 'lines' = 'chars'
): HTMLElement[] {
  const text = element.textContent || '';
  element.innerHTML = '';

  if (type === 'chars') {
    const chars: HTMLElement[] = [];
    // Split into words first to preserve spaces
    const words = text.split(' ');
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'split-word';
      word.split('').forEach((char) => {
        const outer = document.createElement('span');
        outer.className = 'split-char';
        const inner = document.createElement('span');
        inner.className = 'split-char-inner';
        inner.textContent = char;
        outer.appendChild(inner);
        wordSpan.appendChild(outer);
        chars.push(inner);
      });
      element.appendChild(wordSpan);
      if (wordIndex < words.length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
    });
    return chars;
  }

  if (type === 'words') {
    const wordElements: HTMLElement[] = [];
    const words = text.split(' ');
    words.forEach((word, i) => {
      const outer = document.createElement('span');
      outer.className = 'split-word';
      const inner = document.createElement('span');
      inner.className = 'split-word-inner';
      inner.textContent = word;
      outer.appendChild(inner);
      element.appendChild(outer);
      if (i < words.length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
      wordElements.push(inner);
    });
    return wordElements;
  }

  // Lines — wrap entire content as one line (simplified)
  const outer = document.createElement('span');
  outer.className = 'split-line';
  const inner = document.createElement('span');
  inner.className = 'split-line-inner';
  inner.textContent = text;
  outer.appendChild(inner);
  element.appendChild(outer);
  return [inner];
}

export { gsap, ScrollTrigger };
