import { HttpMethod } from '../../types/declaration';
import { API } from '../api';

class Http {

    static transformQuery(query?: { [key: string]: string | number }) {
        const queryString = query
            ? Object.entries(query)
                .reduce((res, [key, value]) => res ? `${res}&${key}=${value}` : `${key}=${value}`, '')
            : '';

        return queryString ? `?${queryString}` : '';
    }

    constructor(public baseUrl = '') {
    }

    get(url: string, query?: { [key: string]: string | number }) {
        return this.request(url, 'GET', null, query);
    }

    post(url: string, body: any, query?: { [key: string]: string | number }) {
        return this.request(url, 'POST', body, query);
    }

    put(url: string, body: any, query?: { [key: string]: string | number }) {
        return this.request(url, 'PUT', body, query);
    }

    patch(url: string, body: any, query?: { [key: string]: string | number }) {
        return this.request(url, 'PATCH', body, query);
    }

    delete(url: string, body: any, query?: { [key: string]: string | number }) {
        return this.request(url, 'DELETE', body, query);
    }

    private request(url: string, method: HttpMethod, body: any, query?: { [key: string]: string | number }) {
        const queryString = Http.transformQuery(query);
        const options = method === 'GET' ? null : { method, body: JSON.stringify(body) };

        return fetch(`${this.baseUrl}${url}${queryString}`, options)
            .then(res => res.json());
    }
}

export const http = new Http(API.baseURL_DEV);
