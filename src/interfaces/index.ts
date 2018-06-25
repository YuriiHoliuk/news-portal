export interface IComment {
    id: string;
    text: string;
    article: string;
}

export interface IArticle {
    id: string;
    date: string;
    title: string;
    text: string;
    comments?: IComment[];
}
