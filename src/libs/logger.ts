import winston, { format, transports } from "winston"

const { combine, timestamp, prettyPrint } = format
const httpLogger = winston.createLogger({
  format: combine(timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }), prettyPrint()),
  transports: [new transports.Console()]
})

export default httpLogger
