import api from "./baseUrl"
const token = sessionStorage.getItem('token')

export const createQuote = async ({ moveId, amount, proposedTime, additonalInformation }) => {
    const response = await api.post(`Quote/CreateQuote`, {
        moveId, amount, proposedTime, additonalInformation
    })
    return response.data
}

export const getCalendarByDateRange = async (startDate, endDate) => {
    const response = await api.get(`Quote/GetCalenderByDateRange?startDate=${startDate}&endDate=${endDate}` )
    return response.data
}

