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
}