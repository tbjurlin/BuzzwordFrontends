import { constructDeleteCall, constructPostCall, constructPutCall, getSSOToken } from "./util";
import { inject } from "vue";


export function useComment() {


    const createComment = (resourceId: number, contents: string, onSuccess: (newId: number) => void, onFailure: (reason: any) => void) => {
        console.log("commenting")
        const ssoToken = getSSOToken();

        if (ssoToken) {
            constructPostCall(
                import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId + "/comment",
                {
                    "contents": contents,
                },
                ssoToken,
            ).then(
                (response) => onSuccess(response.data.resourceId)
            ).catch(onFailure)
        }
    }

    const updateComment = (resourceId: number, commentId: number, contents: string, onSuccess: () => void, onFailure: (reason: any) => void) => {
        const ssoToken = getSSOToken()

        if (ssoToken) {
            constructPutCall(
                import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId + "/comment/" + commentId,
                {
                    "contents": contents,
                },
                ssoToken,
            ).then(
                (_response) => onSuccess()
            ).catch(onFailure)
        }
    }

    const deleteComment = (resourceId: number, commentId: number, onSuccess: () => void, onFailure: (reasone: any) => void) => {
        const ssoToken = getSSOToken()

        if (ssoToken) {
            constructDeleteCall(
                import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId + "/comment/" + commentId,
                ssoToken,
            ).then(
                (_response) => onSuccess()
            ).catch(onFailure)
        }
    }

    return {
        createComment,
        updateComment,
        deleteComment
    }
}

