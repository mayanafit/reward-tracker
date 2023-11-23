import { readFileSync, writeFileSync } from "fs"
import { ROOT_FOLDER } from "../utils/constant"
import httpLogger from "../libs/logger"
import { User, Reward } from "./type"
import { getTimeFromDate } from "../utils"

const logRef = "Database::"

/**
 * to get all users from JSOn
 * @returns all users
 */
const getUsers = () => {
  const usersJson = readFileSync(`${ROOT_FOLDER}/database/rewards.json`, "utf-8")
  const usersData = JSON.parse(usersJson)
  return usersData
}
/**
 * To retrieve data user by ID from database. I'm using JSON to simplify the process
 * @param userId
 * @returns user's data by ID
 */
export const getUserById = (userId: string): User[] => {
  const usersData = getUsers()
  const user = usersData.filter((user: User) => user.userId === userId)
  httpLogger.info(`${logRef} Successfully retrieve user data from JSON`)
  return user
}

/**
 * to update the JSON based on new reward
 * @param userId
 * @param newReward
 */
export const updateReward = (userId: string, newReward: Reward): void => {
  const users = getUsers()
  const updatedRewards = users.map((user: User) => {
    if (user.userId === userId) {
      for (const reward of user.rewards) {
        if (getTimeFromDate(reward.availableAt) === getTimeFromDate(newReward.availableAt)) {
          reward.redeemedAt = newReward.redeemedAt
          break
        }
      }
    }
    return user
  })
  const updateToJson = JSON.stringify(updatedRewards)
  writeFileSync(`${ROOT_FOLDER}/database/rewards.json`, updateToJson)
  httpLogger.info(`${logRef} Successfully update JSON data with new reward`)
}
