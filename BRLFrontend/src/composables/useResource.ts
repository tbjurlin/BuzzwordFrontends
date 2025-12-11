import { Resource } from "@/types";
import { constructDeleteCall, constructGetCall, constructPostCall, constructPutCall, getSSOToken } from "./util";
import { inject } from "vue";


export function useResource() {


    const listAllResources = (onSuccess: (resources: Resource[]) => void, onFailure: (reason: any) => void) => {
            const ssoToken = getSSOToken();
            if (ssoToken) {
                constructGetCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource",
                    ssoToken,
                ).then((response) => {
                    onSuccess(response.data.map(Resource.fromResponse))
                }).catch(onFailure)
            }
    }

    const listResourcesByKeywords = (searchString: string, onSuccess: (resources: Resource[]) => void, onFailure: (reason: any) => void) => {
            const ssoToken = getSSOToken();
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

    const listMyResources = (onSuccess: (resources: Resource[]) => void, onFailure: (response: any) => void) => {
            const ssoToken = getSSOToken();
            if (ssoToken) {
                constructGetCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource-own",
                    ssoToken
                ).then((response) => {
                    onSuccess(response.data.map(Resource.fromResponse))
                }).catch(onFailure)
            }
    }

    const getResourceById = (resourceId: number, onSuccess: (resource: Resource) => void, onFailure: (reason: any) => void) => {
            const ssoToken = getSSOToken();

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

    const createResource = (title: string, url: string, description: string, onSuccess: (newId: number) => void, onFailure: (reason: any) => void) => {
            const ssoToken = getSSOToken()

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

    const updateResource = (resourceId: number, title: string, url: string, description: string, onSuccess: () => void, onFailure: (reason: any) => void) => {
            const ssoToken = getSSOToken()

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

    const deleteResource = (resourceId: number, onSuccess: () => void, onFailure: (reasone: any) => void) => {
            const ssoToken = getSSOToken()

            if (ssoToken) {
                constructDeleteCall(
                    import.meta.env.VITE_BRL_BACKEND_URL + "/wiki/resource/" + resourceId,
                    ssoToken,
                ).then(
                    (_response) => onSuccess()
                ).catch(onFailure)
            }
    }

    return {
        listAllResources,
        listResourcesByKeywords,
        listMyResources,
        getResourceById,
        createResource,
        updateResource,
        deleteResource
    }
}

