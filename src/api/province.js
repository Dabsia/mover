import api from "./baseUrl";

export const getAllJobs =  async (PageNumber, NumberOfRecords) => {
   const response = await api.get(`Province/GetRequestHistory?moveStatus=1&PageNumber=${PageNumber}&NumberOfRecords=${NumberOfRecords}`)
   return response.data
}

export const getNewRequestJobs =  async (PageNumber, NumberOfRecords) => {
   const response = await api.get(`Province/GetRequestHistory?moveStatus=1&PageNumber=${PageNumber}&NumberOfRecords=${NumberOfRecords}`)
   return response.data
}

export const getInProgressJobs =  async (PageNumber, NumberOfRecords) => {
   const response = await api.get(`Province/GetRequestHistory?moveStatus=2&PageNumber=${PageNumber}&NumberOfRecords=${NumberOfRecords}`)
   return response.data
}

export const getCompletedJobs =  async (PageNumber, NumberOfRecords) => {
   const response = await api.get(`Province/GetRequestHistory?moveStatus=3&PageNumber=${PageNumber}&NumberOfRecords=${NumberOfRecords}`)
   return response.data
}

export const getCancelledJobs =  async (PageNumber, NumberOfRecords) => {
   const response = await api.get(`Province/GetRequestHistory?moveStatus=4&PageNumber=${PageNumber}&NumberOfRecords=${NumberOfRecords}`)
   return response.data
}
export const getApprovedJobs =  async (PageNumber, NumberOfRecords) => {
   const response = await api.get(`Province/GetRequestHistory?moveStatus=5&PageNumber=${PageNumber}&NumberOfRecords=${NumberOfRecords}`)
   return response.data
}
export const getPaymentsMadeJobs =  async (PageNumber, NumberOfRecords) => {
   const response = await api.get(`Province/GetRequestHistory?moveStatus=6&PageNumber=${PageNumber}&NumberOfRecords=${NumberOfRecords}`)
   return response.data
}
export const getUpcomingJobs =  async (PageNumber, NumberOfRecords) => {
   const response = await api.get(`Province/GetRequestHistory?moveStatus=7&PageNumber=${PageNumber}&NumberOfRecords=${NumberOfRecords}`)
   return response.data
} 

export const getIncomingJobs = async ({pageNumber, numberOfRecords}) => {
   const response = await api.post(`Province/GetActiveRequests`, {
      pageNumber, numberOfRecords
   })
   return response.data
}



