import type { Lang } from './translations';

export function bi(lang: Lang, en: string, ta: string): string {
  return lang === 'ta' ? ta : en;
}
