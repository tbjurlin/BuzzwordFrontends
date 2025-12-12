import { constructGetCall, getSSOToken } from "./util";
import { inject } from "vue";
import type { AboutUs } from "../types";

export function useAboutUs() {


    const getAboutUs = (onSuccess: (aboutUs: AboutUs) => void, onFailure: (reason: any) => void) => {
        const ssoToken = getSSOToken()

        if (ssoToken) {
            constructGetCall(
                import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/about-us",
                ssoToken,
            ).then(
                (response) => onSuccess(response.data)
            ).catch(onFailure)
        }
    }

   
    return {
        getAboutUs,
    }
}

