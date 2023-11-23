import { NextFunction, Request, Response } from "express"
import httpLogger from "../libs/logger"

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!req.headers) {
    next()
  }
  const errorMessage = err.message
  const returnError = {
    status: 500,
    message: "Internal Server Error"
  }
  // handle error based on the type message
  switch (errorMessage) {
    case "ExpiredRewardError":
      returnError.status = 400
      returnError.message = "This reward is already expired"
      break
    case "ValidationError":
      returnError.status = 400
      returnError.message = "Missing userId or retrieving date rewards on request."
      break
    case "NotFoundError":
      returnError.status = 404
      returnError.message = "Data not found for the request."
      break
    default:
      break
  }
  httpLogger.error(`ErrorHandler:: ${returnError.status} status code error detected`, {
    errMessage: err?.message,
    name: err?.name,
    stack: err?.stack
  })
  return res.status(returnError.status).json(returnError)
}

export default errorHandler
