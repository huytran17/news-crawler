import { map } from "lodash";
import NewsItem from "./NewsItem";
import Paginator from "../paging/Paginator";

export default function NewsList({ pages }: { pages: IPage[] }) {
  return (
    <>
      <div>
        {map(pages, (page) => (
          <NewsItem {...page} />
        ))}
      </div>
      <Paginator />
    </>
  );
}
