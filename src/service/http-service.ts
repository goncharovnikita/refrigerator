
import axios, { AxiosPromise } from 'axios';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from '../config/config';
import { isServerError, mapServerError } from '../models/errors';
import qs from 'query-string';

export class HttpService {
  private readonly baseURL = AppConfig.apiBaseUrl;
  private authToken: string | null;
  on401 = new Subject();

  constructor() {
    axios.interceptors.response.use(
      res => res,
      err => {
        if (err.response) {
          const { status, data } = err.response;

          const { errors, error } = data;

          if (status === 401) {
            setTimeout(() => this.on401.next());
          }

          const e = (() => {
            if (Array.isArray(errors)) {
              return mapServerError(errors[0], status);
            }

            if (error) {
              return mapServerError(error, status);
            }

            return mapServerError(data, status);
          })();

          throw e;
        }
        throw err;
      }
    );

    axios.defaults.paramsSerializer = function(params) {
      const q = qs.stringify(params);

      return q;
    };
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  deleteAuthToken(): void {
    this.authToken = null;
  }

  get<T>(
    url: string,
    params: object = {},
    rawUrl = false,
    encodeParams = true
  ): Observable<T> {
    if (!rawUrl) {
      url = this.baseURL + url;
    }
    const headers = this.prepareHeaders();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    return this.fromAxios(
      () =>
        axios.get(url, {
          params,
          headers,
          cancelToken: source.token,
          paramsSerializer: function(p) {
            const q = qs.stringify(p, { encode: encodeParams });

            return q;
          }
        }),
      source.cancel
    );
  }

  post<T>(url: string, body?: object, params = {}): Observable<T> {
    url = this.baseURL + url;
    const headers = this.prepareHeaders();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    return this.fromAxios(
      () =>
        axios.post(url, body, {
          params,
          headers,
          cancelToken: new CancelToken(c => (source.cancel = c))
        }),
      source.cancel
    );
  }

  put<T>(url: string, body?: object, params = {}): Observable<T> {
    url = this.baseURL + url;
    const headers = this.prepareHeaders();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    return this.fromAxios(
      () =>
        axios.put(url, body, {
          params,
          headers,
          cancelToken: source.token
        }),
      source.cancel
    );
  }

  delete<T>(url: string, params = {}, data = {}): Observable<void> {
    url = this.baseURL + url;
    const headers = this.prepareHeaders();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    return this.fromAxios(
      () =>
        axios.delete(url, {
          params,
          headers,
          data,
          cancelToken: source.token
        }),
      source.cancel
    );
  }

  private fromAxios<T>(req: () => AxiosPromise, cancel: () => void): Observable<T> {
    return new Observable(subscriber => {
      req()
        .then(res => {
          subscriber.next(res.data);
          subscriber.complete();
        })
        .catch(err => {
          if (isServerError(err)) {
            subscriber.error(err);
          } else {
            //
          }
        });

      return () => {
        cancel();
      };
    });
  }

  private prepareHeaders(): object {
    const result: any = {};

    if (this.authToken) {
      result['Authorization'] = `Bearer ${this.authToken}`;
    }

    return result;
  }
}
