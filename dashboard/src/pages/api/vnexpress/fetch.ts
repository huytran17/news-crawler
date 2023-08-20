import type { NextApiRequest, NextApiResponse } from "next";
import { crawlNewsURLs } from "@/server/data-access/controllers/vnexpress";
import makeDb from "@/server/data-access/make-db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ name: "unsupported method" });
  }

  try {
    await makeDb();

    await crawlNewsURLs({ ...req.body });

    res.status(200).json({ name: "jkl" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
