import mongoose from "mongoose";

import post_schema from "../schemas/post";

import IPost from "../interfaces/post";

type IPostModel = IPost & mongoose.Document;

const PostModel = mongoose.model<IPostModel>("Post", post_schema);

const modelServices = Object.freeze({
  PostModel,
});

export default modelServices;

export { PostModel };
