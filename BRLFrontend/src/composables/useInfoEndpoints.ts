import { constructDeleteCall, constructGetCall, constructPostCall, getSSOToken } from "./util";

export function useInfoEndpoints() {

    const getUserName = (onSuccess: (firstName: string, lastName: string) => void, onFailure: (reason: any) => void) => {
        const ssoToken = getSSOToken()

        if (ssoToken) {
            constructGetCall(
                import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/verification",
                ssoToken,
            ).then(
                (response) => onSuccess(response.data.firstName, response.data.lastName)
            ).catch(onFailure)
        }
    }

    return {
        getUserName,
    }
}

