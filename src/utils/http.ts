import { HttpMethod } from '../../types/declaration';
import { signOut } from '../store/ducks';
import store from '../store';
import { env } from '../../environment/environment';

class Http {

    static transformQuery(query?: { [key: string]: string | number }) {
        const queryString = query
            ? Object.entries(query)
                .reduce((res, [key, value]) => res ? `${res}&${key}=${value}` : `${key}=${value}`, '')
            : '';

        return queryString ? `?${queryString}` : '';
    }

    token: string = localStorage.getItem('token');

    constructor(public baseUrl = '') {
    }

    setAuthToken(token: string) {
        this.token = token;
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
        const queryString = query ? Http.transformQuery(query) : '';

        const headers = new Headers();

        if (method !== 'GET') {
            headers.append('Content-Type', 'application/json');
        }

        if (this.token) {
            headers.append('Authorization', `Bearer ${this.token}`);
        }

        let options: any = {
            method,
            mode: 'cors',
            headers,
        };

        options = body ? { ...options, body: JSON.stringify(body) } : options;

        return fetch(`${this.baseUrl}${url}${queryString}`, options)
            .then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        store.dispatch(signOut() as any);
                    }

                    throw new Error(res.statusText);
                }

                return res;
            })
            .then(res => res.json().catch(() => null));
    }
}

export const http = new Http(env.api.baseURL);
