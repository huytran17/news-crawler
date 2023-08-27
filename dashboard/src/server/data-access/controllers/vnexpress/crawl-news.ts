import { Domain, HttpStatus, SiteType } from "@/config/enums";
import { GetAllBySite } from "@/server/use-cases/page/get-all-by-site";
import { UpsertPost } from "@/server/use-cases/post/upsert-post";
import Crawler from "crawler";
import { map, trim, replace } from "lodash";

export default function makeCrawlNews({
  getAllBySite,
  upsertPost,
}: {
  getAllBySite: GetAllBySite;
  upsertPost: UpsertPost;
}) {
  return async function crawlNews({ site }: { site: SiteType }) {
    const options = {
      maxConnections: 10,
    };

    try {
      const pages = await getAllBySite({ site });
      const urls = map(pages, (page) => page.url);

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
          const page = $(".page-detail");
          const category =
            $(page).find(".breadcrumb li:last-of-type a").attr("href") || "";

          const title = $(page).find(".title-detail").text() || "";
          const description = $(page).find(".description").html() || "";
          const slug = replace(
            res.request.uri.href,
            Domain.VNEXPRESS,
            ""
          ).replace(".html", "");

          const content = $(page).find(".fck_detail").html() || "";
          $(content).find(".box-tinlienquanv2").remove();

          const final_content = replace(
            content,
            /<figure\s(.*?)>(.*?)<\/figure>/gs,
            (matched) => {
              const meta_url =
                matched
                  .match(/<img itemprop="contentUrl"\s(.*?)>/gs)
                  ?.toString() || "";

              const url = meta_url
                ?.match(/https?:\/\/\S*/gi)
                ?.toString()
                ?.replace('"', "")
                ?.replace(">", "");

              return `<img src='${url}' alt='${slug}'>`;
            }
          );

          const postDetails = {
            url: res.request.uri.href,
            slug,
            title,
            category: trim(category, "/"),
            description,
            content: final_content,
          };

          await upsertPost({ postDetails });

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
