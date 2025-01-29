import stackTrace from 'stack-trace';
import path from 'path'
import moment from 'moment';

const consoleLog = (level: string, message: any): any => {
  const env: string = process.env.ENV || process.env.NODE_ENV || 'development'
  const inDevelopment = !(['production', 'staging'].includes(env))
  const trace = stackTrace.get();
  const filePath = trace.length > 3 ? trace[3].getFileName() : trace[trace.length - 1].getFileName()
  const stdOutLog = () => `[${level}]  ${level} ${message.method} ${message.step}: ${JSON.stringify(message.jsonMessage)}`

if (inDevelopment) {
    return stdOutLog()
  } else {
    return JSON.stringify({
      timestamp: moment().toISOString(),
      requestInfo: {
        level,
        module: path.basename(filePath),
        method: message.method,
        step: message.step,
        message: JSON.stringify(message.jsonMessage)
      }
    })
  }
}

export default consoleLog
