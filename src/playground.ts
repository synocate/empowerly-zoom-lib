import zoomLib from '../dist/index.js'

const exec = async () => {
  debugger
  const meeting = await zoomLib.createZoomMeeting('sarah@empowerly.com', 'Title Test', 'Description Test', 45, '2025-08-28T13:00', 'America/New_York', [])
}

exec()