import axios from "axios"
import type { VueCookies } from "vue-cookies"

export function getSSOToken($cookies: VueCookies): string | null {
    console.log($cookies)
    console.log($cookies?.keys())
    if ($cookies && $cookies.isKey('sso-token')) {
        console.log($cookies.get('sso-token'))
        return $cookies.get('sso-token')
    }
    return null
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