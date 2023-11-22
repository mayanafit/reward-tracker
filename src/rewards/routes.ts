import { Router } from "express"
import { getRewards } from "./controller"
const router = Router()

router.get("/", getRewards)

export default router
