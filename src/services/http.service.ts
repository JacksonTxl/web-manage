import { Observable, throwError } from 'rxjs'
import { ajax, AjaxError } from 'rxjs/ajax'
import { catchError, pluck, timeout, tap } from 'rxjs/operators'
import { StResponse } from '@/types/app'
import qs from 'qs'
import { Injectable, ServiceRouter } from 'vue-service-app'
import { I18NService } from './i18n.service'
import { AuthService } from './auth.service'
import { AppConfig } from '@/constants/config'
import { NotificationService } from './notification.service'

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
  /**
   * 自定义header头
   */
  headers?: Object
}

@Injectable()
export class HttpService {
  constructor(
    private i18n: I18NService,
    private auth: AuthService,
    private router: ServiceRouter,
    private notification: NotificationService,
    private appConfig: AppConfig
  ) {}
  get(url: string, options: RequestOptions = {}) {
    let requestUrl = this.makeRequestUrl(url, options)
    const get$ = ajax
      .get(requestUrl, this.appHeaders)
      .pipe(timeout(this.appConfig.HTTP_TIMEOUT))
      .pipe(this.ajaxErrorHandler.bind(this))
      .pipe(this.ajaxResponseHandler.bind(this))
      .pipe(pluck('response', 'data'))
    return get$
  }
  /**
   * @param url 请求url
   * @param headers headers头
   */
  originalGet(url: string, headers?: Object) {
    const get$ = ajax
      .get(url, headers)
      .pipe(timeout(this.appConfig.HTTP_TIMEOUT))
    return get$
  }
  originalPost(url: string, headers?: Object) {
    const post$ = ajax
      .post(url, headers)
      .pipe(timeout(this.appConfig.HTTP_TIMEOUT))
    return post$
  }
  post(url: string, options: RequestOptions = {}) {
    const requestUrl = this.makeRequestUrl(url, options)
    const post$ = ajax
      .post(requestUrl, options.params, this.appHeadersWithContentType)
      .pipe(timeout(this.appConfig.HTTP_TIMEOUT))
      .pipe(this.ajaxErrorHandler.bind(this))
      .pipe(this.ajaxResponseHandler.bind(this))
      .pipe(pluck('response', 'data'))
    return post$
  }
  put(url: string, options: RequestOptions = {}) {
    const requestUrl = this.makeRequestUrl(url, options)
    const put$ = ajax
      .put(requestUrl, options.params, this.appHeadersWithContentType)
      .pipe(timeout(this.appConfig.HTTP_TIMEOUT))
      .pipe(this.ajaxErrorHandler.bind(this))
      .pipe(this.ajaxResponseHandler.bind(this))
      .pipe(pluck('response', 'data'))
    return put$
  }
  delete(url: string, options: RequestOptions = {}) {
    const requestUrl = this.makeRequestUrl(url, options)
    const delete$ = ajax
      .delete(requestUrl, this.appHeaders)
      .pipe(timeout(this.appConfig.HTTP_TIMEOUT))
      .pipe(this.ajaxErrorHandler.bind(this))
      .pipe(this.ajaxResponseHandler.bind(this))
      .pipe(pluck('response', 'data'))
    return delete$
  }
  private makeRequestUrl(url: string, options: RequestOptions = {}) {
    let requestUrl = ''
    const { mock, query } = options
    if (mock) {
      if (mock.status && mock.status !== 200) {
        requestUrl = this.appConfig.API_BASE_MOCK + '/' + mock.status
      } else {
        requestUrl = this.appConfig.API_BASE_MOCK + url
      }
    } else {
      requestUrl = this.appConfig.API_BASE + url
    }
    if (query && Object.keys(query)) {
      requestUrl = requestUrl + '?' + qs.stringify(query)
    }
    return requestUrl
  }
  get appHeaders() {
    return {
      token: this.auth.token$.snapshot(),
      'app-id': '11111',
      'app-version': '11111'
    }
  }
  get appHeadersWithContentType() {
    return Object.assign(this.appHeaders, {
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  private ajaxResponseHandler(source$: Observable<any>) {
    return source$.pipe(
      tap(userResponse => {
        ;['code', 'msg', 'data'].forEach(filed => {
          if (
            userResponse.status === 200 &&
            userResponse.response[filed] === undefined
          ) {
            console.warn(
              `[httpService] response field [${filed}] not found in Api[${
                userResponse.request.url
              }]`
            )
          }
        })
      })
    )
  }
  private ajaxErrorHandler(source$: Observable<any>) {
    return source$.pipe(
      catchError((err: AjaxError) => {
        const serverResponse: StResponse = err.response
        switch (err.status) {
          case 400:
            this.notification.warn({
              title: this.i18n.translate('app.http.400'),
              content: serverResponse.msg
            })
            break
          case 401:
            this.notification.warn({
              title: this.i18n.translate('app.http.401'),
              content: serverResponse.msg
            })
            this.router.push({ name: 'account-login' })
            break
          case 403:
            this.notification.warn({
              title: this.i18n.translate('app.http.403'),
              content: serverResponse.msg
            })
            break
          case 404:
            this.notification.error({
              title: this.i18n.translate('app.http.404'),
              content: err.message
            })
            break
          case 500:
            this.notification.error({
              title: this.i18n.translate('app.http.500'),
              content: err.message
            })
            break
          default:
            this.notification.error({
              title: this.i18n.translate('app.http.other'),
              content: err.message
            })
            break
        }
        throw err
      })
    )
  }
}
