import { crawler } from "@/server/config/crawler";

import makeCrawlNews from "./crawl-news";

const crawlNews = makeCrawlNews({ crawler });

export default Object.freeze({
  crawlNews,
});

export { crawlNews };
