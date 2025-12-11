export class Resource {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public creatorId: number,
        public creationDate: Date,
        public currentUserCanDelete: boolean,
        public isEdited: boolean,
        public title: string,
        public description: string,
        public url: string,
        public comments: Comment[],
        public reviewFlags: Flag[],
        public upvoteCount: number,
        public upvotedByCurrentUser: boolean,
        public currentUserUpvoteId: number,
    ) { }

    static fromResponse(
        data: {
            id: number,
            firstName: string,
            lastName: string,
            creatorId: number,
            creationDate: number,
            currentUserCanDelete: boolean,
            isEdited: boolean,
            title: string,
            description: string,
            url: string,
            comments: {
                id: number,
                firstName: string,
                lastName: string,
                creatorId: number,
                creationDate: number,
                currentUserCanDelete: boolean,
                isEdited: boolean,
                contents: string,
            }[],
            reviewFlags: {
                id: number,
                firstName: string,
                lastName: string,
                creatorId: number,
                creationDate: number,
                currentUserCanDelete: boolean,
                isEdited: boolean,
                contents: string,
            }[],
            upvoteCount: number,
            upvotedByCurrentUser: boolean,
            currentUserUpvoteId: number,
        }): Resource {
        return new Resource(
            data.id,
            data.firstName,
            data.lastName,
            data.creatorId,
            new Date(data.creationDate),
            data.currentUserCanDelete,
            data.isEdited,
            data.title,
            data.description,
            data.url,
            data.comments.map((commentData) => 
                Comment.fromResponse(commentData)
            ),
            data.reviewFlags.map((flagData) => 
                Flag.fromResponse(flagData)
            ),
            data.upvoteCount,
            data.upvotedByCurrentUser,
            data.currentUserUpvoteId
        )
    }
}

export class Comment {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public creatorId: number,
        public creationDate: Date,
        public currentUserCanDelete: boolean,
        public isEdited: boolean,
        public contents: string,
    ) { }

    static fromResponse(
        data: {
            id: number,
            firstName: string,
            lastName: string,
            creatorId: number,
            creationDate: number,
            currentUserCanDelete: boolean,
            isEdited: boolean,
            contents: string,
        }
    ): Comment {
        return new Comment(
            data.id,
            data.firstName,
            data.lastName,
            data.creatorId,
            new Date(data.creationDate),
            data.currentUserCanDelete,
            data.isEdited,
            data.contents
        )
    }
}

export class Flag {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public creatorId: number,
        public creationDate: Date,
        public currentUserCanDelete: boolean,
        public isEdited: boolean,
        public contents: string,
    ) { }

    static fromResponse(
        data: {
            id: number,
            firstName: string,
            lastName: string,
            creatorId: number,
            creationDate: number,
            currentUserCanDelete: boolean,
            isEdited: boolean,
            contents: string,
        }
    ): Flag {
        return new Flag(
            data.id,
            data.firstName,
            data.lastName,
            data.creatorId,
            new Date(data.creationDate),
            data.currentUserCanDelete,
            data.isEdited,
            data.contents
        )
    }
}
export type AboutUs = {
        title: string;
        missionStatement: string;
        team: {
            name: string,
            role: string,
            "fun fact": string
        }[],
        copyright: string;
    }