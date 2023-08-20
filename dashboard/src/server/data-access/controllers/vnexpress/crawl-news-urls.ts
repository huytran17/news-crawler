import Crawler from "crawler";
import { map } from "lodash";
import { UpsertPage } from "@/server/use-cases/page/upsert-page";
import { SiteType, HttpStatus } from "@/config/enums";

export default function makeCrawlNewsURLs({
  upsertPage,
}: {
  upsertPage: UpsertPage;
}) {
  return async function crawlNewsURLs({
    url,
    category,
    total_page,
  }: {
    url: string;
    category: string;
    total_page: number;
  }) {
    const headers = {
      "Content-Type": "application/json",
    };

    const options = {
      maxConnections: 10,
    };

    try {
      const urls = [];

      for (let index = 1; index <= total_page; index++) {
        urls.push(`${url}-p${index}`);
      }

      const crawler = new Crawler({
        ...options,
        callback: async (
          err: Error,
          res: Crawler.CrawlerRequestResponse,
          done: Function
        ) => {
          if (err) {
            console.error(err);
            done();
          }

          const $ = res.$;
          const list_news = $(".list-news-subfolder .item-news");

          const upsert_page_promises = map(list_news, async (news_item) => {
            const url = $(news_item).find(".title-news a").attr("href") || "";

            const pageDetails = {
              url,
              category,
              site: SiteType.VNEXPRESS,
            };

            return await upsertPage({ pageDetails });
          });

          await Promise.all(upsert_page_promises);

          done();
        },
      });

      crawler.queue([...urls]);

      return {
        headers,
        status: HttpStatus.OK,
        body: {
          success: true,
        },
      };
    } catch (error: any) {
      throw {
        headers,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}
