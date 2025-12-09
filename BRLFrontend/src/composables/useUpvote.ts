import type { VueCookies } from "vue-cookies"
import { constructDeleteCall, constructPostCall, getSSOToken } from "./util";
import { inject } from "vue";


export function useUpvote() {

    const $cookies = inject<VueCookies>('$cookies');

    const createUpvote = (resourceId: number, onSuccess: (newId: number) => void, onFailure: (reason: any) => void) => {
        if ($cookies) {
            const ssoToken = getSSOToken($cookies)

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
    }

    const deleteUpvote = (resourceId: number, upvoteId: number, onSuccess: () => void, onFailure: (reasone: any) => void) => {
        if ($cookies) {
            const ssoToken = getSSOToken($cookies)

            if (ssoToken) {
                constructDeleteCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId + "/upvote/" + upvoteId,
                    ssoToken,
                ).then(
                    (_response) => onSuccess()
                ).catch(onFailure)
            }
        }
    }

    return {
        createUpvote,
        deleteUpvote
    }
}

