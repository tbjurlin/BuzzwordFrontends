import { constructDeleteCall, constructPostCall, constructPutCall, getSSOToken } from "./util";
import { inject } from "vue";


export function useFlag() {


    const createFlag = (resourceId: number, contents: string, onSuccess: (newId: number) => void, onFailure: (reason: any) => void) => {
            const ssoToken = getSSOToken()

            if (ssoToken) {
                constructPostCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId + "/reviewFlag",
                    {
                        "contents": contents,
                    },
                    ssoToken,
                ).then(
                    (response) => onSuccess(response.data.reviewFlagId)
                ).catch(onFailure)
            }
    }

    const updateFlag = (resourceId: number, flagId: number, contents: string, onSuccess: () => void, onFailure: (reason: any) => void) => {
            const ssoToken = getSSOToken()

            if (ssoToken) {
                constructPutCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId + "/reviewFlag/" + flagId,
                    {
                        "contents": contents,
                    },
                    ssoToken,
                ).then(
                    (_response) => onSuccess()
                ).catch(onFailure)
            }
    }

    const deleteFlag = (resourceId: number, flagId: number, onSuccess: () => void, onFailure: (reasone: any) => void) => {
            const ssoToken = getSSOToken()

            if (ssoToken) {
                constructDeleteCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId + "/reviewFlag/" + flagId,
                    ssoToken,
                ).then(
                    (_response) => onSuccess()
                ).catch(onFailure)
            }
    }

    return {
        createFlag,
        updateFlag,
        deleteFlag
    }
}

