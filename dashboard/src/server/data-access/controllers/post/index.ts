import {
  getPostsPaginated as findPostsPaginated,
  getPostBySlug as findPostBySlug,
} from "@/server/use-cases/post";

import makeGetPostsPaginated from "./get-posts-paginated";
import makeGetPostBySlug from "./get-post-by-slug";

const getPostsPaginated = makeGetPostsPaginated({ findPostsPaginated });
const getPostBySlug = makeGetPostBySlug({ findPostBySlug });

const postServices = Object.freeze({
  getPostsPaginated,
  getPostBySlug,
});

export default postServices;

export { getPostsPaginated, getPostBySlug };
