import { postDb } from "@/server/data-access";

import makeUpsertPost from "./upsert-post";
import makeGetPostsPaginated from "./get-posts-paginated";
import makeGetPostBySlug from "./get-post-by-slug";

const upsertPost = makeUpsertPost({ postDb });
const getPostsPaginated = makeGetPostsPaginated({ postDb });
const getPostBySlug = makeGetPostBySlug({ postDb });

const postServices = Object.freeze({
  upsertPost,
  getPostsPaginated,
  getPostBySlug,
});

export default postServices;

export { upsertPost, getPostsPaginated, getPostBySlug };
