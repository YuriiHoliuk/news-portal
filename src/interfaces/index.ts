export interface IComment {
    _id: string;
    text: string;
    article: string;
}

export interface IArticle {
    _id: string;
    date: string;
    title: string;
    text: string;
    comments?: IComment[];
}

export interface IPagination {
    currentPage: number;
    isLast: boolean;
    total: number;
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
    confirm_password: string;
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
