"use server";

import { z } from 'zod';
import scrapeSite from './scraper';
import { prisma } from '@/lib/prisma';

export interface CreateSiteResult {
  projectId: string;
  pageId: string;
}

export async function createSiteFromURL(rawUrl: string): Promise<CreateSiteResult> {
  const url = z.string().url().parse(rawUrl);
  const { title, content, cover } = await scrapeSite(url);

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

  return { projectId: result.project.id, pageId: result.page.id };
}

export default createSiteFromURL;
