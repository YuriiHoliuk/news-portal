declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
}

declare module '*.png' {
    const content: string;
    export  = content;
}

declare module '*.svg' {
    const content: string;
    export  = content;
}

declare module '*.jpg' {
    const content: string;
    export  = content;
}

declare module '*.gif' {
    const content: string;
    export  = content;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
