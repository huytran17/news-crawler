import { upsertPage } from "@/server/use-cases/page";

import makeCrawlNewsURLs from "./crawl-news-urls";

const crawlNewsURLs = makeCrawlNewsURLs({ upsertPage });

export default Object.freeze({
  crawlNewsURLs,
});

export { crawlNewsURLs };
