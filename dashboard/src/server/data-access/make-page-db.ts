import { SiteType } from "@/config/enums";
import { map, merge } from "lodash";
import mongoose from "mongoose";
import Page from "../database/entities/page";
import IPageDb from "./interfaces/page";

export default function makePageDb({
  pageDbModel,
}: {
  pageDbModel: mongoose.Model<
    IPage & mongoose.Document,
    Record<string, unknown>
  >;
}): IPageDb {
  return new (class PageDb implements IPageDb {
    async findAllPaginated({
      page,
      entries_per_page,
      query,
    }: {
      page: number;
      entries_per_page: number;
      query: string;
    }): Promise<IPagePaginated | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = merge({});

      if (query) {
        query_conditions["$or"] = {
          title: { $regex: ".*" + query + ".*", $options: "si" },
        };
      }

      const existing = await pageDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .lean({ virtuals: true });

      const total = await pageDbModel.countDocuments(query_conditions);

      if (existing) {
        const totalTaking = page * entries_per_page;

        const has_more = totalTaking < total;

        const from = has_more ? number_of_entries_to_skip : null;

        const is_over = totalTaking > total;
        const to = has_more ? (is_over ? total : totalTaking) : null;

        const data = existing.map((page) => new Page(page));

        return {
          pagination: {
            from,
            to,
            page,
            entries_per_page,
            total,
          },
          data,
        };
      }

      return null;
    }

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
