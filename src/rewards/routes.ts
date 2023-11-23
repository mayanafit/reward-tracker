import { Router } from "express"
import { getRewards, redeemReward } from "./controller"
const router = Router()

router.get("/:userId/rewards", getRewards)
router.patch("/:userId/rewards/:rewardId/redeem", redeemReward)
export default router
