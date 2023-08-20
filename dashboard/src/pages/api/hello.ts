// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// import { crawlNews } from "@/server/data-access/controllers/vnexpress";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ name: "unsupported method" });
  }

  res.status(200).json({ name: "jkl" });
}
