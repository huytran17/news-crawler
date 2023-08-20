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
      <table className="w-full" key={site}>
        <thead className="h-12 bg-sky-200">
          <tr>
            <th>{site}</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="separator"></tr>
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

  return <div className="p-4 relative overflow-x-auto">{list}</div>;
}
