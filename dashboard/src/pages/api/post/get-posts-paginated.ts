import { NextApiRequest, NextApiResponse } from "next";
import { getPostsPaginated } from "@/server/data-access/controllers/post";
import { HttpStatus } from "@/config/enums";
import makeDb from "@/server/data-access/make-db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      res.status(HttpStatus.UNSUPPORTED_METHOD).json({ success: false });
    }

    await makeDb();

    await getPostsPaginated({ ...req.body });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}
