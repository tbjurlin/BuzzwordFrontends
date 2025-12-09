import { Resource } from "@/types";
import type { VueCookies } from "vue-cookies"
import { constructDeleteCall, constructGetCall, constructPostCall, constructPutCall, getSSOToken } from "./util";
import { inject } from "vue";


export function useResource() {

    const $cookies = inject<VueCookies>('$cookies');

    const listAllResources = (onSuccess: (resources: Resource[]) => void, onFailure: (reason: any) => void) => {
        if ($cookies) {
            const ssoToken = getSSOToken($cookies);
            if (ssoToken) {
                constructGetCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource",
                    ssoToken,
                ).then((response) => {
                    onSuccess(response.data.map(Resource.fromResponse))
                }).catch(onFailure)
            }
        }
    }

    const listResourcesByKeywords = (searchString: string, onSuccess: (resources: Resource[]) => void, onFailure: (reason: any) => void) => {
        if ($cookies) {
            const ssoToken = getSSOToken($cookies);
            if (ssoToken) {
                constructPostCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource-filtered",
                    { "keywords": searchString.split(" ").join(", ") },
                    ssoToken
                ).then((response) => {
                    onSuccess(response.data.map(Resource.fromResponse))
                }).catch(onFailure)
            }
        }
    }

    const listResourcesByUserId = (userId: number, onSuccess: (resources: Resource[]) => void, onFailure: (response: any) => void) => {
        if ($cookies) {
            const ssoToken = getSSOToken($cookies);
            if (ssoToken) {
                constructPostCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/",
                    { "user": userId},
                    ssoToken
                ).then((response) => {
                    onSuccess(response.data.map(Resource.fromResponse))
                }).catch(onFailure)
            }
        }
    }

    const getResourceById = (resourceId: number, onSuccess: (resource: Resource) => void, onFailure: (reason: any) => void) => {
        if ($cookies) {
            const ssoToken = getSSOToken($cookies);

            if (ssoToken) {
                constructGetCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId,
                    ssoToken
                ).then((response) => {
                    onSuccess(Resource.fromResponse(response.data))
                    }
                ).catch(onFailure);
            }
        }
    }

    const createResource = (title: string, url: string, description: string, onSuccess: (newId: number) => void, onFailure: (reason: any) => void) => {
        if ($cookies) {
            const ssoToken = getSSOToken($cookies)

            if (ssoToken) {
                constructPostCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource",
                    {
                        "title": title,
                        "description": description,
                        "url": url
                    },
                    ssoToken,
                ).then(
                    (response) => onSuccess(response.data.resourceId)
                ).catch(onFailure)
            }
        }
    }

    const updateResource = (resourceId: number, title: string, url: string, description: string, onSuccess: () => void, onFailure: (reason: any) => void) => {
        if ($cookies) {
            const ssoToken = getSSOToken($cookies)

            if (ssoToken) {
                constructPutCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId,
                    {
                        "title": title,
                        "url": url,
                        "description": description,
                    },
                    ssoToken,
                ).then(
                    (_response) => onSuccess()
                ).catch(onFailure)
            }
        }
    }

    const deleteResource = (resourceId: number, onSuccess: () => void, onFailure: (reasone: any) => void) => {
        if ($cookies) {
            const ssoToken = getSSOToken($cookies)

            if (ssoToken) {
                constructDeleteCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId,
                    ssoToken,
                ).then(
                    (_response) => onSuccess()
                ).catch(onFailure)
            }
        }
    }

    return {
        listAllResources,
        listResourcesByKeywords,
        getResourceById,
        createResource,
        updateResource,
        deleteResource
    }
}

