import { SiteType } from "@/config/enums";
import { map } from "lodash";
import CrawItem from "./CrawlItem";

export default function CrawlList({
  crawl_data,
}: {
  crawl_data: Record<string, any>;
}) {
  const list = [];

  for (const site in crawl_data) {
    const site_data = crawl_data[site];

    const template = (
      <table className="table-fixed w-full" key={site}>
        <thead>
          <tr>
            <th>{site}</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {map(site_data.pages, (page) => {
            const sub_categories = page.sub_categories;

            return map(sub_categories, (sub_category) => (
              <tr key={`${page.category}/${sub_category}`}>
                <CrawItem
                  total={1}
                  category={`${page.category}/${sub_category}`}
                  domain={site_data.domain}
                  site={site as SiteType}
                />
              </tr>
            ));
          })}
        </tbody>
      </table>
    );

    list.push(template);
  }

  return <>{list}</>;
}
