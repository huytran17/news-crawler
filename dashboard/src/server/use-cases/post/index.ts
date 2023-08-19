import { postDb } from "@/server/data-access";

import makeCreatePost from "./create-post";
import makeGetPostsPaginated from "./get-posts-paginated";

const createPost = makeCreatePost({ postDb });

const getPostsPaginated = makeGetPostsPaginated({ postDb });

const postServices = Object.freeze({
  createPost,
  getPostsPaginated,
});

export default postServices;

export { createPost, getPostsPaginated };
