import { Observable } from 'rxjs'
import { ajax, AjaxError, AjaxResponse } from 'rxjs/ajax'
import { catchError, pluck, map } from 'rxjs/operators'
import { API_BASE, API_BASE_MOCK } from '@/constants/config'
import { notification } from 'ant-design-vue'
import { authService } from './auth.service'
import { StResponse } from '@/types/app'
import router from '@/router'
import qs from 'qs'
import { localeService } from './locale.service'
const t = localeService.translate.bind(localeService)
interface MockOptions {
  status?: number
}
interface Query {
  [key: string]: any
}
interface Params {
  [key: string]: any
}
interface RequestOptions {
  /**
   * mock参数
   */
  mock?: MockOptions
  /**
   * get 请求query参数
   */
  query?: Query
  /**
   * post put 请求bo           dy参数
   */
  params?: Params
}

export class HttpService {
  get(url: string, options: RequestOptions = {}) {
    let requestUrl = this.makeRequestUrl(url, options)
    const get$ = ajax
      .get(requestUrl, this.headers)
      .pipe(this.ajaxErrorHandler)
      .pipe(pluck('response', 'data'))

    return get$
  }
  post(url: string, options: RequestOptions = {}) {
    const requestUrl = this.makeRequestUrl(url, options)
    const post$ = ajax
      .post(requestUrl, options.params, this.headers)
      .pipe(this.ajaxErrorHandler)
      .pipe(pluck('response', 'data'))
    return post$
  }
  put(url: string, options: RequestOptions = {}) {
    const requestUrl = this.makeRequestUrl(url, options)
    const put$ = ajax
      .put(requestUrl, options.params, this.headers)
      .pipe(this.ajaxErrorHandler)
      .pipe(pluck('response', 'data'))
    return put$
  }
  delete(url: string, options: RequestOptions = {}) {
    const requestUrl = this.makeRequestUrl(url, options)
    const delete$ = ajax
      .delete(requestUrl, this.headers)
      .pipe(this.ajaxErrorHandler)
      .pipe(pluck('response', 'data'))
    return delete$
  }
  private makeRequestUrl(url: string, options: RequestOptions = {}) {
    let requestUrl = ''
    const { mock, query } = options
    if (mock) {
      if (mock.status && mock.status !== 200) {
        requestUrl = API_BASE_MOCK + '/' + mock.status
      } else {
        requestUrl = API_BASE_MOCK + url
      }
    } else {
      requestUrl = API_BASE + url
    }
    if (query && Object.keys(query)) {
      requestUrl = requestUrl + '?' + qs.stringify(query)
    }
    return requestUrl
  }
  get headers() {
    return {
      token: authService.getAuthToken(),
      'App-Id': '123',
      'App-Version': '1123',
      'Content-Type': 'application/json;charset=UTF-8;'
    }
  }
  private ajaxErrorHandler(source$: Observable<any>) {
    return source$.pipe(
      catchError((err: AjaxError) => {
        const serverResponse: StResponse = err.response
        switch (err.status) {
          case 400:
            notification.warn({
              message: serverResponse.msg,
              description: t('http.400')
            })
            break
          case 401:
            notification.warn({
              message: serverResponse.msg,
              description: t('http.401')
            })
            router.push({ name: 'user-login' })
            break
          case 403:
            notification.warn({
              message: serverResponse.msg,
              description: t('http.403')
            })
            break
          case 404:
            notification.error({
              message: t('http.404'),
              description: err.message
            })
            break
          case 500:
            notification.error({
              message: t('http.500'),
              description: err.message
            })
            break
          default:
            notification.error({
              message: t('http.other'),
              description: err.message
            })
            break
        }
        throw err
      })
    )
  }
}

export const http = new HttpService()
