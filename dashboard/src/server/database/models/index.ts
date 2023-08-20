import mongoose from "mongoose";

import post_schema from "../schemas/post";
import page_schema from "../schemas/page";

type IPostModel = IPost & mongoose.Document;
type IPageModel = IPage & mongoose.Document;

const PostModel = mongoose.model<IPostModel>("Post", post_schema);
const PageModel = mongoose.model<IPageModel>("Page", page_schema);

const modelServices = Object.freeze({
  PostModel,
  PageModel,
});

export default modelServices;

export { PostModel, PageModel };
