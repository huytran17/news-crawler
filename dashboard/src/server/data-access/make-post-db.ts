import mongoose from "mongoose";
import { merge } from "lodash";

import IPost from "../database/interfaces/post";
import Post from "../database/entities/post";
import IPostDb, { IPostPaginated } from "./interfaces/post";

export default function makePostDb({
  postDbModel,
}: {
  postDbModel: mongoose.Model<
    IPost & mongoose.Document,
    Record<string, unknown>
  >;
}) {
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

        const data = existing.map((post) => new Post(post));

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

    async insert({
      postDetails,
    }: {
      postDetails: IPost;
    }): Promise<IPost | null> {
      const inserted = await postDbModel.create(postDetails);

      if (inserted) {
        return new Post(inserted);
      }

      return null;
    }
  })();
}
