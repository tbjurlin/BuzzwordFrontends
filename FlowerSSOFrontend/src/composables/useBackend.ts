import axios from "axios";
import { constructDeleteCall, constructGetCall, constructPostCall, constructPutCall, getSSOToken } from "./util";
import type { Profile } from "@/types";


export function useBackend() {


    const loginAPICall = (email: string, password: string, onSuccess: (token: string) => void, onFailure: (reason: any) => void) => {

        axios.post(
            import.meta.env.VITE_FLOWER_SSO_BACKEND_URL + "/login",
            {
                "email": email,
                "password": password
            }
        ).then((response) => {
            onSuccess(response.headers.Bearer)
            }
        ).catch(onFailure);
    }

    const profileCall = (onSuccess: (profile: Profile) => void, onFailure: (reason: any) => void) => {
        const token = getSSOToken()

        if (token) {
            constructGetCall(
                import.meta.env.VITE_FLOWER_SSO_BACKEND_URL + "/profile",
                token,
            ).then((response) => onSuccess(response.data)).catch(onFailure)
        }
    }

    return {
        loginAPICall
    }
}

