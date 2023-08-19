import Crawler from "crawler";

export default class NewsCrawler {
  static crawler_instance: NewsCrawler;

  constructor() {
    if (NewsCrawler.crawler_instance) {
      return NewsCrawler.crawler_instance;
    }

    NewsCrawler.crawler_instance = this;
    return NewsCrawler.crawler_instance;
  }

  static getInstance(): NewsCrawler {
    if (NewsCrawler.crawler_instance) {
      return NewsCrawler.crawler_instance;
    }

    NewsCrawler.crawler_instance = new NewsCrawler();
    return NewsCrawler.crawler_instance;
  }

  createCrawler({
    options,
  }: {
    options: Crawler.CreateCrawlerOptions;
  }): Crawler {
    const crawler = new Crawler({
      ...options,
      callback: (
        error: Error,
        res: Crawler.CrawlerRequestResponse,
        done: Function
      ) => {
        if (error) {
          done();
          return console.error(error);
        }

        done();
        return res.$;
      },
    });

    return crawler;
  }
}

const crawler = NewsCrawler.getInstance();
export { crawler };
