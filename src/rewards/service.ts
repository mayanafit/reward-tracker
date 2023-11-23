import { Reward } from "./type"
import { getUserById, updateReward } from "./model"
import { getTimeFromDate, getDayFromDate } from "../utils"
import httpLogger from "../libs/logger"
import { getUserReward } from "./helper"

const logRef = "Service::"

/**
 * To get weekly rewards by ID from database (JSON)
 * @param userId
 * @param dateRewards
 * @returns weeklyRewards
 */
export const getWeeklyRewards = (userId: string, dateRewards: string): Reward[] | undefined => {
  // Retrieve rewards for specific userId
  const userRewards = getUserReward(getUserById(userId))
  // filter rewards based on the requested date of Rewards which resulted in a full length of a week data
  let weeklyRewards: Reward[] = []
  for (const [index, value] of userRewards.entries()) {
    if (getTimeFromDate(value.availableAt) === getTimeFromDate(dateRewards)) {
      const dayOfReward = getDayFromDate(value.availableAt)
      const daysBeforeDateReward = 0 - dayOfReward
      const daysAfterDateReward = 7 - dayOfReward
      weeklyRewards = userRewards.slice(index + daysBeforeDateReward, index + daysAfterDateReward)
      break
    }
  }
  if (weeklyRewards.length < 1) {
    httpLogger.warn(`${logRef} no data available for the date`, { data: weeklyRewards, date: dateRewards })
    return
  }
  httpLogger.info(`${logRef} Successfully retrieve weekly Rewards`)
  return weeklyRewards
}

/**
 * To redeem the available reward
 * @param userId
 * @param rewardId
 * @returns status of reward redemption
 */
export const redeemByRewardId = (userId: string, rewardId: string): Reward | string => {
  const userRewards = getUserReward(getUserById(userId))
  const reward = userRewards.find((reward: Reward) => getTimeFromDate(reward.availableAt) === getTimeFromDate(rewardId))
  if (reward) {
    if (reward.redeemedAt) {
      return "expired"
    }
    const expireRewardTime = getTimeFromDate(reward?.expiresAt)
    const timeNow = getTimeFromDate(new Date().toDateString())
    if (timeNow < expireRewardTime) {
      reward.redeemedAt = new Date().toISOString()
    } else {
      httpLogger.warn(`${logRef} the reward has been expired`, { reward })
      return "expired"
    }
    updateReward(userId, reward)
    httpLogger.info(`${logRef} reward has been successfully updated with redeemed date`, { reward })
    return reward
  } else {
    httpLogger.warn(`${logRef} No reward available with the ID`, { userId, rewardId })
    return "failed"
  }
}
