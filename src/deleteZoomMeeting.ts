import axios from "axios"
import { getZoomToken } from "./utils"

const deleteZoomMeeting = async (meetingId: string) => {
  const token = await getZoomToken()
  const requestOptions = { headers: { 'Authorization': `Bearer ${token}` } }

  return axios.delete(`https://api.zoom.us/v2/meetings/${meetingId}`, requestOptions)
    .then(() => 'ok')
    .catch(error => {
      throw new Error(`Error deleting the meeting "${meetingId}": ${JSON.stringify(error.response.data)}`)
    })
}

export default deleteZoomMeeting