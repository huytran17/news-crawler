import { HttpMethod, HttpStatus } from "@/config/enums";
import { crawlNewsURLs } from "@/server/data-access/controllers/vnexpress";
import makeDb from "@/server/data-access/make-db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== HttpMethod.POST) {
    res.status(HttpStatus.UNSUPPORTED_METHOD).json({ success: false });
  }

  try {
    await makeDb();

    const data = await crawlNewsURLs({ ...req.body });

    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}
