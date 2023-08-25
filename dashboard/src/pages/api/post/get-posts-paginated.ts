import { NextApiRequest, NextApiResponse } from "next";
import { getPostsPaginated } from "@/server/data-access/controllers/post";
import { HttpStatus } from "@/config/enums";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      res.status(HttpStatus.UNSUPPORTED_METHOD).json({ success: false });
    }

    const data = await getPostsPaginated({ ...req.body });

    res.status(HttpStatus.OK).json(data.body.data);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}
