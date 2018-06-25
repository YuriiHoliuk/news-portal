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

    post(url: string, body?: any, query?: { [key: string]: string | number }) {
        return this.request(url, 'POST', query, body);
    }

    put(url: string, body?: any, query?: { [key: string]: string | number }) {
        return this.request(url, 'PUT', query, body);
    }

    patch(url: string, body?: any, query?: { [key: string]: string | number }) {
        return this.request(url, 'PATCH', query, body);
    }

    delete(url: string, body?: any, query?: { [key: string]: string | number }) {
        return this.request(url, 'DELETE', query, body);
    }

    private request(url: string, method: HttpMethod, query?: { [key: string]: string | number }, body?: any) {
        const queryString = Http.transformQuery(query);
        let options: any = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        options = body ? { ...options, body: JSON.stringify(body) } : options;

        return fetch(`${this.baseUrl}${url}${queryString}`, options)
            .then(res => res.json());
    }
}

export const http = new Http(API.baseURL_DEV);
