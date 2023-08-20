import CrawlList from "@/components/CrawlList";
import { crawl_data } from "@/config/crawl-data";

export default function CrawlPage() {
  return <CrawlList crawl_data={crawl_data} />;
}
