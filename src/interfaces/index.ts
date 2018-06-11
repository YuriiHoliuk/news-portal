export interface IComment {
    id: number;
    text: string;
}

export interface IArticle {
    id: number;
    date: string;
    title: string;
    text: string;
    comments?: IComment[];
}
