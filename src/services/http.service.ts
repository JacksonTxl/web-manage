import { forEach } from 'lodash-es'
import qs from 'qs'
import { Observable, throwError } from 'rxjs'
import { ajax, AjaxError } from 'rxjs/ajax'
import { catchError, pluck, timeout, tap, shareReplay } from 'rxjs/operators'
import { StResponse } from '@/types/app'
import { Injectable, ServiceRouter } from 'vue-service-app'
import { I18NService } from './i18n.service'
import { TokenService } from './token.service'
import { AppConfig } from '@/constants/config'
import { NotificationService } from './notification.service'
import { NProgressService } from './nprogress.service'
// @ts-ignore
import VueModalRouter from 'vue-modal-router'

interface Query {
  [key: string]: any
}
interface Params {
  [key: string]: any
}
interface RequestOptions {
  /**
   * get 请求query参数
   */
  query?: Query
  /**
   * post put 请求body参数
   */
  params?: Params
  /**
   * 自定义header头
   */
  headers?: Object
  /**
   * 忽略一些不需要提示错误信息的code
   */
  ignoreCodes?: any[]
}

@Injectable()
export class HttpService {
  private cacheContainer = new Map()
  constructor(
    private i18n: I18NService,
    private tokenService: TokenService,
    private router: ServiceRouter,
    private notification: NotificationService,
    private appConfig: AppConfig,
    private nprogress: NProgressService,
    private modalRouter: VueModalRouter
  ) {}
  get(url: string, options: RequestOptions = {}): Observable<any> {
    let requestUrl = this.makeRequestUrl(url, options)
    const get$ = ajax
      .get(requestUrl, this.appHeaders)
      .pipe(timeout(this.appConfig.HTTP_TIMEOUT))
      .pipe(this.ajaxErrorHandler(options))
      .pipe(this.ajaxResponseHandler.bind(this))
      .pipe(pluck('response', 'data'))
    /**
     * 1. 缓存里没有的时候重新获取
     * 2. 非浏览器的前进后退点击 重新获取
     * 3. 模态窗打开的情况下 不激活http缓存
     * 4. 浏览器后退的页面指定api不缓存
     */

    const cacheKey = requestUrl
    let apiCanUseCache = !this.appConfig.API_BF_HISTORY_CACHE_WHITE_LIST.find(
      (item: string) => {
        console.log('not cache', requestUrl)
        return requestUrl.search(item) > -1
      }
    )
    if (
      this.cacheContainer.get(cacheKey) &&
      this.router.isHistoryBF &&
      !this.modalRouter.isOpening &&
      apiCanUseCache
    ) {
      console.log('hit cache', cacheKey)
      return this.cacheContainer.get(cacheKey) as Observable<any>
    }

    const cacheReplay$ = get$.pipe(shareReplay(1))
    this.cacheContainer.set(cacheKey, cacheReplay$)
    return cacheReplay$
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
      .pipe(this.ajaxErrorHandler(options))
      .pipe(this.ajaxResponseHandler.bind(this))
      .pipe(pluck('response', 'data'))
    return post$
  }
  put(url: string, options: RequestOptions = {}) {
    const requestUrl = this.makeRequestUrl(url, options)
    const put$ = ajax
      .put(requestUrl, options.params, this.appHeadersWithContentType)
      .pipe(timeout(this.appConfig.HTTP_TIMEOUT))
      .pipe(this.ajaxErrorHandler(options))
      .pipe(this.ajaxResponseHandler.bind(this))
      .pipe(pluck('response', 'data'))
    return put$
  }
  delete(url: string, options: RequestOptions = {}) {
    const requestUrl = this.makeRequestUrl(url, options)
    const delete$ = ajax
      .delete(requestUrl, this.appHeaders)
      .pipe(timeout(this.appConfig.HTTP_TIMEOUT))
      .pipe(this.ajaxErrorHandler(options))
      .pipe(this.ajaxResponseHandler.bind(this))
      .pipe(pluck('response', 'data'))
    return delete$
  }
  private makeRequestUrl(url: string, options: RequestOptions = {}) {
    let requestUrl = this.appConfig.API_BASE + url
    const { query } = options
    if (query && Object.keys(query)) {
      requestUrl = requestUrl + '?' + qs.stringify(query)
    }
    return requestUrl
  }
  get appHeaders() {
    return {
      token: this.tokenService.token$.snapshot(),
      'app-id': this.appConfig.API_APP_ID,
      'app-version': this.appConfig.GIT_COMMIT
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
        ;['code', 'data'].forEach(filed => {
          if (
            userResponse.status === 200 &&
            userResponse.response[filed] === undefined
          ) {
            console.error(
              `[httpService] response field [${filed}] not found in Api[${
                userResponse.request.url
              }]`
            )
          }
        })
      })
    )
  }
  private ajaxErrorHandler(options: RequestOptions) {
    const ignoreCodes = options.ignoreCodes || []
    return (source$: Observable<any>) =>
      source$.pipe(
        catchError((err: AjaxError) => {
          const serverResponse: StResponse = err.response
          this.notification.close('ajaxError')
          this.nprogress.SET_TEXT(`${err.message}`)
          const errMsg = (serverResponse && serverResponse.msg) || err.message
          switch (err.status) {
            case 400:
              if (ignoreCodes.includes(serverResponse.code)) {
                break
              }
              this.notification.warn({
                title: this.i18n.t('http.400'),
                key: 'ajaxError',
                content: errMsg
              })
              break
            case 401:
              console.log('is401')
              this.notification.warn({
                title: this.i18n.t('http.401'),
                key: 'ajaxError',
                content: errMsg
              })
              location.href = '/account/login'
              break
            case 403:
              this.notification.warn({
                title: this.i18n.t('http.403'),
                key: 'ajaxError',
                content: errMsg
              })
              break
            case 404:
              this.notification.error({
                title: this.i18n.t('http.404'),
                key: 'ajaxError',
                content: errMsg
              })
              break
            case 500:
              this.notification.error({
                title: this.i18n.t('http.500'),
                key: 'ajaxError',
                content: errMsg
              })
              break
            default:
              this.notification.error({
                title: this.i18n.t('http.other'),
                key: 'ajaxError',
                content: errMsg
              })
              break
          }
          throw err
        })
      )
  }
}
