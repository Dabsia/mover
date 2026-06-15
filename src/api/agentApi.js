import api from "./baseUrl";

export const fetchProvince = async () => {
    const response = await api.get("Province/GetProvinces")
    return response.data
}

export const getCompanyDetailsByNumber = async (number) => {
    const response = await api.get(`Agent/GetCompanyDetailsByKvkNumber?kvkNumber=${number}`)
    return response.data
}

export const registerAgent = async ({ email, kvkNumber, companyName, password, image, provinces, companyOverView }) => {
    const response = await api.post(`Auth/RegisterAgent`, {
        email, kvkNumber, companyName, password, image, provinces, companyOverView
    })
    return response.data
}

export const loginAgent = async ({user, password}) => {
    const response = await api.post(`Auth/LoginUser`, {
        user, password
    })
    return response.data
}

export const getVerificationAgent = async ({ email, password }) => {
    const response = await api.post(`Agent/GetVerificationCode`, {
        email, password
    })
    return response.data
}

export const moversDashboardAnalytics = async () => {
    const response = await api.get(`Agent/DashBoardAnalytics`)

    return response.data
}
