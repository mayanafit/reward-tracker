import { Request, Response } from "express"
import httpLogger from "../libs/logger"
import { getWeeklyRewards, redeemByRewardId } from "./service"

const logRef = "Main Service::"
/**
 * HTTP GET request to fetch weekly rewards based on userId and date upon retrieving rewards
 * @param req: params as userId, query as date upon retrieving rewards
 * @param res: return response function
 * @returns response of a weekly rewards for particular userId
 */
export const getRewards = (req: Request, res: Response) => {
  const userId = req.params.userId
  const dateRewards = req.query.at as string
  httpLogger.info(`${logRef} Start of getRewards`)
  // validate userId
  if (!userId || !dateRewards) {
    httpLogger.error(`${logRef} Missing ${!userId ? "userId" : "retrieving date rewards"} on request.`, {
      reqParams: req.params,
      reqQuery: req.query
    })
    throw new Error("ValidationError")
  }
  const rewardsData = getWeeklyRewards(userId, dateRewards)
  if (!rewardsData) {
    httpLogger.error(`${logRef} No rewards data available for user ID ${userId} and date ${dateRewards}`, {
      reqBody: userId
    })
    throw new Error("NotFoundError")
  }
  httpLogger.info(`${logRef} Success on getting weekly rewards data`, {
    userId,
    result: rewardsData
  })
  res.status(200).json({
    data: rewardsData
  })
}

/**
 * HTTP PATCH request for redeem the reward by userId and rewardId
 * @param req: params as userId and rewardId to retrieve specific reward to be redeemed
 * @param res: return response function
 * @returns  response in reward data that has been redeemed
 */
export const redeemReward = (req: Request, res: Response) => {
  const { userId, rewardId } = req.params
  if (!userId || !rewardId) {
    httpLogger.error(`${logRef} Missing ${!userId ? "userId" : "rewardId"} on request.`, { reqParams: req.params })
    throw new Error("ValidationError")
  }
  const result = redeemByRewardId(userId, rewardId)
  if (result === "expired") {
    throw new Error("ExpiredRewardError")
  } else if (result === "failed") {
    throw new Error("NotFoundError")
  }
  res.status(200).json({ data: result })
}
