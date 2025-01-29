import axios from "axios";

export const getZoomToken = async () => {
  const ZOOM_OAUTH_ENDPOINT = 'https://zoom.us/oauth/token';
  const ZOOM_ACCOUNT_ID = 'DT0wDLTbRzWk3ry-j-HDSQ' //process.env.ZOOM_ACCOUNT_ID
  const ZOOM_CLIENT_ID = 'Cmkm6Y_QStG6N0m6ZGgCzg' //process.env.ZOOM_CLIENT_ID
  const ZOOM_CLIENT_SECRET = 'dyinXEM29NuiBZVAVm8CFPCpHU8aZVDQ' //process.env.ZOOM_CLIENT_SECRET

  const request = await axios.post(
    ZOOM_OAUTH_ENDPOINT,
    `account_id=${ZOOM_ACCOUNT_ID}&grant_type=account_credentials`,
    { headers: { 'Authorization': `Basic ${Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64')}` } }
  );
  return request.data.access_token;
}