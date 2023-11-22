import express from "express"
import "dotenv/config"
import cors from "cors"
import helmet from "helmet"
import rewardRoutes from "./rewards/routes"
const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use("/users", rewardRoutes)

export default app
