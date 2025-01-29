import axios from "axios";
import moment from "moment-timezone";
import { Invitee } from "./types";
import { getZoomUserByEmail, getZoomToken } from "./utils";

const createZoomMeeting = async (email: string, title: string, description: string, durationInMinutes: number, datetime: string, timezone: string, invitees?: Invitee[]) => {
  const meetingDateTime = moment(datetime, 'YYYY-MM-DDTHH:mi').tz(timezone, true)

  const token = await getZoomToken()
  const requestOptions = { headers: { 'Authorization': `Bearer ${token}` } }

  const user = await getZoomUserByEmail(token, email)
  if (!user) throw Error(`User not found with the email ${email}.`)

  if (invitees && invitees.length > 0 && user.type < 2) throw new Error('Only paid users can invite participants.')

  //Create the meeting
  const meeting = await axios.post(`https://api.zoom.us/v2/users/${user.id}/meetings`, {
    schedule_for: 'admin@empowerly.com',
    topic: title,
    agenda: description,
    type: 2, //1=Instant Meeting, 2=Scheduled Meeting, 3=Recurring Meeting (No Fixed Time), 8=Recurring Meeting (Fixed Time)	
    start_time: meetingDateTime.format(),
    duration: durationInMinutes,
    timezone,
    email_notification: true,
    settings: {
      approval_type: 1, //0=auto approval, 1=manual approval
      registrants_email_notification: true
    }
  }, requestOptions).then(resp => resp.data)

  //Add the meetings participants
  const participants = invitees && invitees.length > 0 ? await Promise.all(invitees.map(async invitee => {
    const participant = await axios.post(`https://api.zoom.us/v2/meetings/${meeting.id}/registrants`, invitee, requestOptions).then(resp => resp.data)
    return {
      id: participant.id,
      email: invitee.email,
      first_name: invitee.first_name,
      last_name: invitee.last_name,
      join_url: participant.join_url
    }
  })).catch(error => {
    throw new Error(`Error adding participants: ${JSON.stringify(error.response.data)}`)
  }) : []


  return {
    id: meeting.id,
    meeting_url: meeting.join_url,
    registration_url: meeting.registration_url,
    participants
  }
}

export default createZoomMeeting