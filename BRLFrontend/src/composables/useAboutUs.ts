import type { VueCookies } from "vue-cookies"
import { constructGetCall, getSSOToken } from "./util";
import { inject } from "vue";
import type { AboutUs } from "../types";

export function useAboutUs() {

    const $cookies = inject<VueCookies>('$cookies');

    const getAboutUs = (onSuccess: (aboutUs: AboutUs) => void, onFailure: (reason: any) => void) => {
        if ($cookies) {
            const ssoToken = getSSOToken($cookies)

            if (ssoToken) {
                constructGetCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/about-us",
                    ssoToken,
                ).then(
                    (response) => onSuccess(response.data)
                ).catch(onFailure)
            }
        }
    }

   
    return {
        getAboutUs,
    }
}

