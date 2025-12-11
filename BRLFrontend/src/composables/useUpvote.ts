import { constructDeleteCall, constructPostCall, getSSOToken } from "./util";
import { inject } from "vue";


export function useUpvote() {


    const createUpvote = (resourceId: number, onSuccess: (newId: number) => void, onFailure: (reason: any) => void) => {
            const ssoToken = getSSOToken()

            if (ssoToken) {
                constructPostCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId + "/upvote",
                    null,
                    ssoToken,
                ).then(
                    (response) => onSuccess(response.data.upvoteId)
                ).catch(onFailure)
            }
    }

    const deleteUpvote = (resourceId: number, upvoteId: number, onSuccess: () => void, onFailure: (reasone: any) => void) => {
            const ssoToken = getSSOToken()

            if (ssoToken) {
                constructDeleteCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId + "/upvote/" + upvoteId,
                    ssoToken,
                ).then(
                    (_response) => onSuccess()
                ).catch(onFailure)
            }
    }

    return {
        createUpvote,
        deleteUpvote
    }
}

