import { getAllBySite, upsertPage } from "@/server/use-cases/page";
import { upsertPost } from "@/server/use-cases/post";

import makeCrawlNews from "./crawl-news";
import makeCrawlNewsURLs from "./crawl-news-urls";

const crawlNewsURLs = makeCrawlNewsURLs({ upsertPage });
const crawlNews = makeCrawlNews({ getAllBySite, upsertPost });

export default Object.freeze({
  crawlNewsURLs,
  crawlNews,
});

export { crawlNewsURLs, crawlNews };
