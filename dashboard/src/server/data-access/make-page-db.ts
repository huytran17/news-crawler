import mongoose from "mongoose";
import { map } from "lodash";
import IPageDb from "./interfaces/page";
import Page from "../database/entities/page";

export default function makePageDb({
  pageDbModel,
}: {
  pageDbModel: mongoose.Model<
    IPage & mongoose.Document,
    Record<string, unknown>
  >;
}): IPageDb {
  return new (class PageDb implements IPageDb {
    async findAllBySite({ site }: { site: SiteType }): Promise<IPage[] | null> {
      const query_conditions = {
        site,
      };

      const existing = await pageDbModel
        .find(query_conditions)
        .select("_id url");

      if (existing) {
        return map(existing, (page) => new Page(page));
      }

      return null;
    }

    async upsert({
      pageDetails,
    }: {
      pageDetails: Omit<IPage, "_id" | "created_at">;
    }): Promise<IPage | null> {
      const query_conditions = {
        url: pageDetails.url,
      };

      const existing = await pageDbModel.findOneAndUpdate(
        query_conditions,
        pageDetails,
        {
          upsert: true,
          new: true,
          setDefaultOnInsert: true,
        }
      );

      if (existing) {
        return new Page(existing);
      }

      return null;
    }
  })();
}
