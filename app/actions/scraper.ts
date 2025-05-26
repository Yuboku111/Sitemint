// app/actions/scraper.ts
import { extract } from "@extractus/article-extractor";
import { z } from "zod";

/** 取得結果の型 */
export interface ScrapedArticle {
  title: string;
  content: string;
  cover: string | null;
}

/**
 * 任意 URL を受け取り、記事タイトル・本文 (HTML)・OG 画像 URL を抽出して返す
 * @param url 対象ページの URL
 */
export async function scrapeSite(url: string): Promise<ScrapedArticle> {
  // ---- 入力バリデーション ----------------------------------------------------
  z.string().url().parse(url);

  // ---- 抽出 ------------------------------------------------------------------
  const article = await extract(url);

  return {
    title: article?.title?.trim() ?? "Untitled",
    content: article?.content ?? "<p>No content extracted</p>",
    cover: article?.image ?? null,
  };
}

// `import scrapeSite from "./scraper"` 形式でも使えるように default エクスポート
export default scrapeSite;
