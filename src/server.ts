import app from "./app"
import "dotenv/config"
import httpLogger from "./libs/logger"

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  httpLogger.info(`Server is running on port ${PORT}`)
})
