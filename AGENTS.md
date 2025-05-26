# AGENTS.md ― How to work in this repo
## Dev commands
- Setup : pnpm install
- Lint  : pnpm lint        # 無ければこの行を消す
- Run   : pnpm dev

## Folder map
- app/actions/            … サーバーアクション
- app/api/                … API ルート
- components/             … 共通 UI
- prisma/schema.prisma    … DB スキーマ

## Your TODO list, Codex 👇
1. **app/actions/scraper.ts**  
   - 関数 `scrapeSite(url)` で {title, content, cover} を返す  
   - @extractus/article-extractor を使用
2. **app/actions/createSiteFromURL.ts**  
   - scrapeSite を呼び、prisma.project & prisma.page に保存  
3. **app/api/actions/create-site/route.ts**  
   - POST {url} を受けて createSiteFromURL を実行  
4. **components/SiteShell.tsx**  
   - Tailwind Typography + Shadcn で本文を包むレイアウト  
5. **app/(routes)/projects/[id]/page.tsx**  
   - DB から取得→SiteShell で表示
