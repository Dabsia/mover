import api from './baseUrl'

export const logArrival = async (code) => {
    const response = await api.get(`Tracking/LogArrival?bookingCode=${code}`)
    return response.data
}

export const startMove = async (code) => {
    const response = await api.get(`Tracking/BeginMove?authCode=${code}`)
    return response.data
}

export const endMove = async (code) => {
    const response = await api.get(`Tracking/EndMove?authCode=${code}`)
    return response.data
}

export const createPayment = async (ref) => {
    const response = await api.get(`MoveRequest/CreatePaymentIntent?amount=${ref}`)
    return response.data
}