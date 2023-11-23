import { User, Reward } from "./type"

/**
 * helper to retrieve reward from a user
 * @param user
 * @returns Reward of the user
 */
export const getUserReward = (user: User[]): Reward[] => {
  return user.map((foundUser: User) => foundUser.rewards).flat()
}
