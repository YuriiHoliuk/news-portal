export interface IComment {
    id: string;
    text: string;
}

export interface IArticle {
    id: string;
    date: string;
    title: string;
    text: string;
    comments?: IComment[];
}
