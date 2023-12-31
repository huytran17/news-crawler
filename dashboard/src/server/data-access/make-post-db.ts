import { map, merge } from "lodash";
import mongoose from "mongoose";

import Post from "../database/entities/post";
import IPostDb from "./interfaces/post";

export default function makePostDb({
  postDbModel,
}: {
  postDbModel: mongoose.Model<
    IPost & mongoose.Document,
    Record<string, unknown>
  >;
}): IPostDb {
  return new (class PostDb implements IPostDb {
    async findAllPaginated({
      page,
      entries_per_page,
      query,
    }: {
      page: number;
      entries_per_page: number;
      query: string;
    }): Promise<IPostPaginated | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = merge({});

      if (query) {
        query_conditions["$or"] = {
          title: { $regex: ".*" + query + ".*", $options: "si" },
        };
      }

      const existing = await postDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .lean({ virtuals: true });

      const total = await postDbModel.countDocuments(query_conditions);

      if (existing) {
        const totalTaking = page * entries_per_page;

        const has_more = totalTaking < total;

        const from = has_more ? number_of_entries_to_skip : null;

        const is_over = totalTaking > total;
        const to = has_more ? (is_over ? total : totalTaking) : null;

        const data = map(existing, (post) => new Post(post));

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

    async upsert({
      postDetails,
    }: {
      postDetails: Omit<IPost, "_id" | "created_at">;
    }): Promise<IPost | null> {
      const query_conditions = {
        url: postDetails.url,
      };

      const inserted = await postDbModel.findOneAndUpdate(
        query_conditions,
        postDetails,
        {
          upsert: true,
          new: true,
          setDefaultOnInsert: true,
        }
      );

      if (inserted) {
        return new Post(inserted);
      }

      return null;
    }

    async findBySlug({ slug }: { slug: string }): Promise<IPost | null> {
      const query_conditions = {
        slug,
      };

      const existing = await postDbModel
        .findOne(query_conditions)
        .lean({ virtual: true });

      if (existing) {
        return new Post(existing);
      }

      return null;
    }
  })();
}
