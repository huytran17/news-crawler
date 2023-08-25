import { HttpMethod, HttpStatus } from "@/config/enums";
import { getPagesPaginated } from "@/server/data-access/controllers/page";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== HttpMethod.GET) {
      res.status(HttpStatus.UNSUPPORTED_METHOD).json({ success: false });
    }

    const query = req.query;

    const payload = {
      page: Number(query.page),
      entries_per_page: Number(query.entries_per_page),
      query: query.query as string,
    };

    const data = await getPagesPaginated({ ...payload });

    res.status(HttpStatus.OK).json(data.body.data);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}
