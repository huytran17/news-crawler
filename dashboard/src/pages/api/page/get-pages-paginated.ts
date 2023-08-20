import { HttpMethod, HttpStatus } from "@/config/enums";
import makeDb from "@/server/data-access/make-db";
import { getPagesPaginated } from "@/server/use-cases/page";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== HttpMethod.GET) {
      res.status(HttpStatus.UNSUPPORTED_METHOD).json({ success: false });
    }

    await makeDb();

    await getPagesPaginated({ ...req.body });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}
