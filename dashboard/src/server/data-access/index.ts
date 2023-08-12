import makePostDb from "./make-post-db";

import { PostModel } from "../database/models";

const postDb = makePostDb({ postDbModel: PostModel });

const dbServices = Object.freeze({
  postDb,
});

export default dbServices;

export { postDb };
