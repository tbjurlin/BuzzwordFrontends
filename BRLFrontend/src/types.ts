export type Resource = {
    id: number,
    title: string,
    description: string,
    url: string,
    firstName: string,
    lastName: string,
    creationDate: Date,
    creatorId: number,
    comments: Comment[],
    upvoteCount: number,
    upvotedByCurrentUser: boolean,
    currentUserCanDelete: boolean,
    isEdited: boolean,
    reviewFlags: Flag[],
    currentUserUpvoteId: number,
}

export type Comment = {
    id: number,
    contents: string,
    firstName: string,
    lastName: string,
    creationDate: Date,
    creatorId: number,
    currentUserCanDelete: boolean,
    isEdited: boolean,
}

export type Flag = {
    id: number,
    contents: string,
    firstName: string,
    lastName: string,
    creationDate: Date,
    creatorId: number,
    currentUserCanDelete: boolean,
    isEdited: boolean,
}