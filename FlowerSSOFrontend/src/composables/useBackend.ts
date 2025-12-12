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
                console.log(response)
                console.log(response.headers)
            if (response.headers.bearer && typeof response.headers.bearer === "string") {
                onSuccess(response.headers.bearer)
            } else {
                onFailure("invalid token")
            }
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

    const listUsers = (onSuccess: (users: Profile[]) => void, onFailure: (reason: any) => void) => {
        const token = getSSOToken()

        if (token) {
            constructGetCall(
                import.meta.env.VITE_FLOWER_SSO_BACKEND_URL + "/admin/users",
                token
            ).then((response) => onSuccess(response.data)).catch(onFailure)
        }
    }

    const deleteUser = (userId: number, onSuccess: () => void, onFailure: (reason: any) => void) => {
        const token = getSSOToken()

        if (token) {
            constructDeleteCall(
                import.meta.env.VITE_FLOWER_SSO_BACKEND_URL + "/admin/delete/" + userId,
                token
            ).then((_response) => onSuccess()).catch(onFailure)
        }
    }

    const createUser = (profile: Profile, password: string, onSuccess: () => void, onFailure: (reason: any) => void) => {
        const token = getSSOToken()

        if (token) {
            constructPostCall(
                import.meta.env.VITE_FLOWER_SSO_BACKEND_URL + "/admin/add",
                { password, ...profile },
                token
            ).then((response) => onSuccess()).catch(onFailure)
        }
    }

    const updateUser = (profile: Profile, onSuccess: () => void, onFailure: (reason: any) => void) => {
        const token = getSSOToken()

        if (token) {
            constructPutCall(
                import.meta.env.VITE_FLOWER_SSO_BACKEND_URL + "/admin/update",
                { password: "", ...profile },
                token
            ).then((response) => onSuccess()).catch(onFailure)
        }
    }

    const changePassword = (password: string, onSuccess: () => void, onFailure: (reason: any) => void) => {
        const token = getSSOToken()

        if (token) {
            axios.put(
                import.meta.env.VITE_FLOWER_SSO_BACKEND_URL + "/password",
                password,
                {
                    headers: {
                        'Bearer': token,
                        'Content-Type': 'text/plain'
                    }
                }
            ).then((response) => onSuccess()).catch(onFailure)
        }
    }

    const forgotPassword = (email: string, onSuccess: () => void, onFailure: (reason: any) => void) => {
        const token = getSSOToken()

        if (token) {
            constructPostCall(
                import.meta.env.VITE_FLOWER_SSO_BACKEND_URL + "/admin/users",
                { email },
                token
            ).then((response) => onSuccess()).catch(onFailure)
        }
    }

    return {
        loginAPICall,
        profileCall,
        listUsers,
        deleteUser,
        createUser,
        updateUser,
        forgotPassword,
        changePassword
    }
}

