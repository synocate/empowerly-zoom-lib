import axios from "axios";

export const getZoomToken = async (zoomAccountId: string, zoomClientId: string, zoomClientSecret: string) => {
  const ZOOM_OAUTH_ENDPOINT = 'https://zoom.us/oauth/token';

  const request = await axios.post(
    ZOOM_OAUTH_ENDPOINT,
    `account_id=${zoomAccountId}&grant_type=account_credentials`,
    { headers: { 'Authorization': `Basic ${Buffer.from(`${zoomClientId}:${zoomClientSecret}`).toString('base64')}` } }
  );
  return request.data.access_token;
}