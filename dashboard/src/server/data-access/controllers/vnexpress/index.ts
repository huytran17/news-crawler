import { upsertPage } from "@/server/use-cases/page";

import makeCrawlNews from "./crawl-news";

const crawlNews = makeCrawlNews({ upsertPage });

export default Object.freeze({
  crawlNews,
});

export { crawlNews };
