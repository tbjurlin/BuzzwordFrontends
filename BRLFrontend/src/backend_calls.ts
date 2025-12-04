import type { Resource } from "./types";

export function retrieveResource(id: number): Resource | undefined {
    if (Number.isFinite(id)) {
        return {
            "id": 17,
            "firstName": "Timothee",
            "lastName": "Greswell",
            "creatorId": 31,
            "creationDate": new Date(1764885210440),
            "currentUserCanDelete": false,
            "isEdited": false,
            "title": "YET ANOTHER RESOURCE",
            "description": "Wow, yet another description. Isn't that lovely?",
            "url": "https://runningoutofcoolideasatthispoint.com",
            "comments": [
                {
                    "id": 0,
                    "firstName": "Margit",
                    "lastName": "Filipczynski",
                    "creatorId": 19,
                    "creationDate": new Date(1764885417291),
                    "currentUserCanDelete": false,
                    "isEdited": false,
                    "contents": "Beautiful. Brought a tear to my eye."
                },
                {
                    "id": 1,
                    "firstName": "Margit",
                    "lastName": "Filipczynski",
                    "creatorId": 19,
                    "creationDate": new Date(1764885428055),
                    "currentUserCanDelete": false,
                    "isEdited": false,
                    "contents": "Beautiful. Brought a second tear to my eye."
                }
            ],
            "reviewFlags": [
                {
                    "id": 0,
                    "firstName": "Margit",
                    "lastName": "Filipczynski",
                    "creatorId": 19,
                    "creationDate": new Date(1764885462868),
                    "currentUserCanDelete": false,
                    "isEdited": false,
                    "contents": "This is a flag for manager review."
                },
                {
                    "id": 1,
                    "firstName": "Margit",
                    "lastName": "Filipczynski",
                    "creatorId": 19,
                    "creationDate": new Date(1764885495432),
                    "currentUserCanDelete": false,
                    "isEdited": false,
                    "contents": "Whoops! I didn't mean to add that one."
                },
                {
                    "id": 2,
                    "firstName": "Renee",
                    "lastName": "Zecchii",
                    "creatorId": 22,
                    "creationDate": new Date(1764885796465),
                    "currentUserCanDelete": true,
                    "isEdited": false,
                    "contents": "Another one? Absolutely not. Manager!!!!!!! [Oh cool, you can edit these...] -&gt; Multiple times even"
                }
            ],
            "upvoteCount": 0,
            "upvotedByCurrentUser": false,
            "currentUserUpvoteId": 0
        }
    } else {
        return undefined;
    }
} 