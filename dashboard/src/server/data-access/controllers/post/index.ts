import { getPostsPaginated as findPostsPaginated } from "@/server/use-cases/post";

import makeGetPostsPaginated from "./get-posts-paginated";

const getPostsPaginated = makeGetPostsPaginated({ findPostsPaginated });

const postServices = Object.freeze({
  getPostsPaginated,
});

export default postServices;

export { getPostsPaginated };
