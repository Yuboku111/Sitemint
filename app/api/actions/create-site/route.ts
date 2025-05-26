import { NextResponse } from "next/server";
import { z } from "zod";
import createSiteFromURL from "@/app/actions/createSiteFromURL";

const bodySchema = z.object({
  url: z.string().url(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = bodySchema.parse(body);
    const result = await createSiteFromURL(url);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
