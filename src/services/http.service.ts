import { Observable } from 'rxjs'
import { ajax, AjaxError } from 'rxjs/ajax'
import { catchError, pluck } from 'rxjs/operators'
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
      .get(requestUrl, this.headers)
      .pipe(this.ajaxErrorHandler.bind(this))
      .pipe(pluck('response', 'data'))

    return get$
  }
  post(url: string, options: RequestOptions = {}) {
    const requestUrl = this.makeRequestUrl(url, options)
    const post$ = ajax
      .post(requestUrl, options.params, this.headers)
      .pipe(this.ajaxErrorHandler.bind(this))
      .pipe(pluck('response', 'data'))
    return post$
  }
  put(url: string, options: RequestOptions = {}) {
    const requestUrl = this.makeRequestUrl(url, options)
    const put$ = ajax
      .put(requestUrl, options.params, this.headers)
      .pipe(this.ajaxErrorHandler.bind(this))
      .pipe(pluck('response', 'data'))
    return put$
  }
  delete(url: string, options: RequestOptions = {}) {
    const requestUrl = this.makeRequestUrl(url, options)
    const delete$ = ajax
      .delete(requestUrl, this.headers)
      .pipe(this.ajaxErrorHandler.bind(this))
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
  get headers() {
    return {
      token: this.auth.getAuthToken(),
      'App-Id': '123',
      'App-Version': '1123',
      'Content-Type': 'application/json;charset=UTF-8;'
    }
  }
  private ajaxErrorHandler(source$: Observable<any>) {
    console.log(this)
    return source$.pipe(
      catchError((err: AjaxError) => {
        console.log(this)
        const serverResponse: StResponse = err.response
        switch (err.status) {
          case 400:
            this.notification.warn({
              title: serverResponse.msg,
              content: this.i18n.translate('app.http.400')
            })
            break
          case 401:
            this.notification.warn({
              title: serverResponse.msg,
              content: this.i18n.translate('app.http.401')
            })
            this.router.push({ name: 'user-login' })
            break
          case 403:
            this.notification.warn({
              title: serverResponse.msg,
              content: this.i18n.translate('app.http.403')
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
