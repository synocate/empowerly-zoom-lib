import axios from "axios"
import { ZOOM_API_BASE_PATH } from '../const'

export const getZoomUserByEmail = (token: string, email: string) => {
  const requestOptions = { headers: { 'Authorization': `Bearer ${token}` } }
  return axios.get(`${ZOOM_API_BASE_PATH}/users/${email}`, requestOptions)
    .then(resp => resp.data)
    .catch(error => null)
}