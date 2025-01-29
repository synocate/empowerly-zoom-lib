import winston from 'winston'
import consoleLog from './consoleLog';

type loggerMessageType = { [key: string]: any }

const createLogger = () => {
  const winstonLogger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
        level: process.env.LOGGER_LEVEL || 'info',
        format: winston.format.printf((msg: any): any => {
          const { level, message } = msg
          return consoleLog(level, message)
        }),
      }),
    ],
  })

  const info = (method: string, step: string, jsonMessage: loggerMessageType): winston.Logger => {
    return winstonLogger.info({ method, step, jsonMessage })
  }

  const warn = (method: string, step: string, jsonMessage: loggerMessageType): winston.Logger => {
    return winstonLogger.warn({ method, step, jsonMessage })
  }

  const error = (method: string, step: string, jsonMessage: loggerMessageType): winston.Logger => {
    return winstonLogger.error({ method, step, jsonMessage })
  }

  return { info, warn, error }
}

export default createLogger