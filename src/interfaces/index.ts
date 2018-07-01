export interface IComment {
    id: string;
    comment: string;
    author: string;
}

export interface IArticle {
    _id: string;
    slug: string;
    author: string[];
    title: string;
    text: string;
    publicatedAt: string;
    createdAt: string;
    comments: IComment[];
    image?: string;
}

export interface IPagination {
    currentPage: string;
    isLast: boolean;
    total: string;
}

export interface IArticlesResponse extends IPagination {
    items: IArticle[];
}

export interface ISignInRequest {
    email: string;
    password: string;
}

export interface ISignUpRequest extends ISignInRequest {
    name: string;
    password_confirm: string;
}

export interface IUserData {
    email: string;
    name: string;
}

export interface IAuthResponse {
    token: string;
    ttl: number;
    account: IUserData;
}

export interface IPaginationInfo {
    pages: number[];
    lastPage: number;
    currentPage: number;
    showFirst: boolean;
    showLast: boolean;
}
