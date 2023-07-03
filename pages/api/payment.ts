// import type { NextApiRequest, NextApiResponse } from "next";
// import FlibustaAPI from "flibusta";
import { Response } from "../../shared/api";

export default async function handler(
  req: any,
  res: any
) {
  let response: Response = {
    tag: "SUCCESS",
    data: {
      reqKeys: Object.keys(req)
    },
  };
  res.json(response);
}
