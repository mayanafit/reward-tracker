import { createLogger, format, transports } from "winston"

/**
 * Logger is implemented for better monitoring ahead in future
 * It helps us to find the root cause of the system better with help of monitoring tools or just to store the logs to cloud storage
 */
const { combine, timestamp, prettyPrint } = format
const httpLogger = createLogger({
  format: combine(timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }), prettyPrint()),
  transports: [new transports.Console()]
})

export default httpLogger
