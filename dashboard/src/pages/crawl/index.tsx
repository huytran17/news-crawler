import CrawlList from "@/components/crawling/CrawlList";
import { crawl_data } from "@/config/crawl-data";

export default function CrawlPage() {
  return <CrawlList crawl_data={crawl_data} />;
}
