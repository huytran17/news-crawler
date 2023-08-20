import { HttpStatus, SiteType } from "@/config/enums";
import { UpsertPage } from "@/server/use-cases/page/upsert-page";
import Crawler from "crawler";
import { map } from "lodash";

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
            return done();
          }

          const $ = res.$;
          const list_news = $(".list-news-subfolder .item-news");

          const upsert_page_promises = map(list_news, async (news_item) => {
            const url = $(news_item).find(".title-news a").attr("href") || "";
            if (url === "") {
              return done();
            }

            const thumbnail_url =
              $(news_item).find(".thumb-art img").attr("src") || "";
            const title = $(news_item).find(".title-news a").text() || "";
            const description =
              $(news_item).find(".description a").html() || "";

            const pageDetails = {
              url,
              category,
              title,
              description,
              thumbnail_url,
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
        status: HttpStatus.OK,
        body: {
          data: {
            success: true,
          },
        },
      };
    } catch (error: any) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}
