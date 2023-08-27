import { map } from "lodash";
import NewsItem from "./NewsItem";

export default function NewsList({ pages }: { pages: IPage[] }) {
  return (
    <>
      <div>
        {map(pages, (page) => (
          <NewsItem {...page} />
        ))}
      </div>
    </>
  );
}
