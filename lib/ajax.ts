import axios from "axios"

export const baseUrl = process.env.baseUrl

export const USER_STORAGE_KEY = 'user'
export const ACCESSTOKEN_STORAGE_KEY = 'access-token'
export const ACCESSTOKEN_PREFIX_KEY = 'Bearer'

export const LOGIN_PATH = 'auth/sign-in'
export const REGISTER_PATH = 'auth/register'
export const LOGOUT_PATH = 'auth/log-out'


export const ajaxPost = async (path: string, body: any) => {
    const response = await axios.post(`${baseUrl}${path}`, body, {})
        .then(res => res.data)
        .catch(err => {
            let message = err?.response?.data?.message

            if (typeof message === 'object') {
                message = message.join()
            }

            return { message }
        })

    return response
}

const getAccessToken = () => {
    const accessToken = localStorage.getItem(ACCESSTOKEN_STORAGE_KEY)

    return accessToken
}

export const setDefaultAccessToken = () => {
    const accessToken = getAccessToken();
    axios.defaults.headers[ACCESSTOKEN_STORAGE_KEY] = ACCESSTOKEN_PREFIX_KEY + ' ' +accessToken 
}

export const deleteDefaultAccessToken = () => {
    delete axios.defaults.headers[ACCESSTOKEN_STORAGE_KEY]
}