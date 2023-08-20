import type { NextApiRequest, NextApiResponse } from "next";
import { crawlNewsURLs } from "@/server/data-access/controllers/vnexpress";
import makeDb from "@/server/data-access/make-db";
import { HttpStatus } from "@/config/enums";
import { HttpMethod } from "@/config/enums/http-method";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== HttpMethod.POST) {
    res.status(HttpStatus.UNSUPPORTED_METHOD).json({ success: false });
  }

  try {
    await makeDb();

    await crawlNewsURLs({ ...req.body });

    res.status(HttpStatus.OK).json({ success: true });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}
