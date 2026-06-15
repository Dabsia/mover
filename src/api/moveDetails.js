import api from "./baseUrl";

export const moveDetails =  async (code) => {
   const response = await api.get(`MoveRequest/GetMoveDetails?code=${code}`)
   return response.data
}

export const trackMove = async (code) => {
  const response = await api.get(`MoveRequest/TrackMove?code=${code}`) 
  return response.data
} 
