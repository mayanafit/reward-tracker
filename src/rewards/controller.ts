import { Request, Response } from "express"
import httpLogger from "../libs/logger"

export const getRewards = (req: Request, res: Response) => {
  const testBody = req.body
  httpLogger.info("Success on getting data", {
    data: testBody,
    payload: req.body
  })
  res.status(200).json({
    data: testBody
  })
}
