export type Reward = {
  availableAt: string
  redeemedAt: string | null
  expiresAt: string
}

export type User = {
  userId: string
  rewards: Reward[]
}
