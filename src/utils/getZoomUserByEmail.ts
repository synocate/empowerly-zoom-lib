import axios from "axios"

export const getZoomUserByEmail = (token: string, email: string) => {
  const requestOptions = { headers: { 'Authorization': `Bearer ${token}` } }
  return axios.get(`https://api.zoom.us/v2/users/${email}`, requestOptions)
    .then(resp => resp.data)
    .catch(error => null)
}