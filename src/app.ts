import express from "express"
import "dotenv/config"
import cors from "cors"
import helmet from "helmet"
import rewardRoutes from "./rewards/routes"
import errorHandler from "./middlewares/errors"

const app = express()
// protect the request from vulnerable security issues
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use("/users", rewardRoutes)
// using errorHandler to display error response
app.use(errorHandler)

export default app
