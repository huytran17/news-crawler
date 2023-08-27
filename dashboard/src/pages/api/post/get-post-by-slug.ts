import { NextApiRequest, NextApiResponse } from "next";
import { getPostBySlug } from "@/server/data-access/controllers/post";
import { HttpMethod, HttpStatus } from "@/config/enums";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== HttpMethod.GET) {
      res.status(HttpStatus.UNSUPPORTED_METHOD).json({ success: false });
    }

    const payload = {
      slug: req.query.slug?.toString() ?? "",
    };

    const data = await getPostBySlug({ ...payload });

    res.status(HttpStatus.OK).json(data.body.data);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}
