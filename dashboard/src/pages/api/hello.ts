// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await fetch(
    "https://vnexpress.net/microservice/gocnhinpaging/category_id/1004930/page/2"
  );
  const r = await data.json();
  res.status(200).json(r);
}
