import axios from "axios"
import { getZoomToken } from "./utils"

const cancelZoomMeeting = async (meetingId: string) => {
  const token = await getZoomToken()
  const requestOptions = { headers: { 'Authorization': `Bearer ${token}` } }

  return axios.put(`https://api.zoom.us/v2/meetings/${meetingId}/status`, { action: 'end' }, requestOptions)
    .then(() => 'ok')
    .catch(error => {
      throw new Error(`Error canceling the meeting "${meetingId}": ${JSON.stringify(error.response.data)}`)
    })
}

export default cancelZoomMeeting