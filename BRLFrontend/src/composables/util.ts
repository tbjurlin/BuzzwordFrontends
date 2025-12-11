import axios from "axios"


export function getSSOToken(): string | null {
    return window.localStorage.getItem("sso-token")
}

export function constructGetCall(url: string, ssoToken: string) {
    return axios.get(
        url,
        {
            headers: {
                'Bearer': ssoToken
            }
        }
    )
}

export function constructPostCall(url: string, data: any, ssoToken: string) {
    return axios.post(
        url,
        data,
        {
            headers: {
                'Bearer': ssoToken
            }
        }
    )
}

export function constructPutCall(url: string, data: any, ssoToken: string) {
    return axios.put(
        url,
        data,
        {
            headers: {
                'Bearer': ssoToken
            }
        }
    )
}

export function constructDeleteCall(url: string, ssoToken: string) {
    return axios.delete(
        url,
        {
            headers: {
                'Bearer': ssoToken
            }
        }
    )
}