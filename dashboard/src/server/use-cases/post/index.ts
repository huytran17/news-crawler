import { postDb } from "@/server/data-access";

import makeUpsertPost from "./upsert-post";
import makeGetPostsPaginated from "./get-posts-paginated";

const upsertPost = makeUpsertPost({ postDb });
const getPostsPaginated = makeGetPostsPaginated({ postDb });

const postServices = Object.freeze({
  upsertPost,
  getPostsPaginated,
});

export default postServices;

export { upsertPost, getPostsPaginated };
