import { extract } from '@extractus/article-extractor';

export interface ScrapedArticle {
  title: string;
  content: string;
  cover: string | null;
}

/**
 * Fetches article information from the provided URL.
 */
export async function scrapeSite(url: string): Promise<ScrapedArticle> {
  const article = await extract(url);
  return {
    title: article?.title?.trim() ?? 'Untitled',
    content: article?.content ?? '',
    cover: article?.image ?? null,
  };
}

export default scrapeSite;
