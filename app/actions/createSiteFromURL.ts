

// app/actions/createSiteFromURL.ts
"use server";

import { z } from "zod";
import scrapeSite from "./scraper";                   // 同ディレクトリ
import { prisma } from "@/lib/prisma";                // ← パスは環境に合わせて調整

/** 返却値 */
export interface CreateSiteResult {
  projectId: string;
  pageId: string;
}

/**
 * URL を受け取り:
 *  1. scrapeSite(url) でタイトル／本文／OG画像を抽出
 *  2. prisma.project & prisma.page にレコードを登録
 *  3. 作成した ID を返す
 */
export async function createSiteFromURL(rawUrl: string): Promise<CreateSiteResult> {
  // ---- 1. 入力バリデーション --------------------------------------------------
  const url = z.string().url().parse(rawUrl);

  // ---- 2. スクレイピング -------------------------------------------------------
  const { title, content, cover } = await scrapeSite(url);

  // ---- 3. DB 登録（トランザクション）-------------------------------------------
  const result = await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: { url, title, cover },
    });

    const page = await tx.page.create({
      data: {
        projectId: project.id,
        title,
        content,
        cover,
      },
    });

    return { project, page };
  });

  // ---- 4. 作成した ID を返却 ---------------------------------------------------
  return { projectId: result.project.id, pageId: result.page.id };
}

export default createSiteFromURL;