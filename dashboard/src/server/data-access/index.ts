import makePageDb from "./make-page-db";
import makePostDb from "./make-post-db";

import { PageModel, PostModel } from "../database/models";

const postDb = makePostDb({ postDbModel: PostModel });
const pageDb = makePageDb({ pageDbModel: PageModel });

const dbServices = Object.freeze({
  postDb,
  pageDb,
});

export default dbServices;

export { postDb, pageDb };
