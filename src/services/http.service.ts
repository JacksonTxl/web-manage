import { Observable } from 'rxjs'
import { ajax, AjaxError } from 'rxjs/ajax'
import { catchError, pluck } from 'rxjs/operators'
import { API_BASE } from '@/constants/config'
import { notification } from 'ant-design-vue'
import { authService } from './auth.service'
import { StResponse } from '@/types/app'

const ajaxErrorHandler = () => (source$: Observable<any>) =>
  source$.pipe(
    catchError((err: AjaxError) => {
      const serverResponse: StResponse = err.response
      switch (err.status) {
        case 400:
          notification.warn({
            message: serverResponse.message,
            description: err.message
          })
          break
        case 401:
          notification.warn({
            message: serverResponse.message,
            description: err.message
          })
          break
        case 403:
          notification.warn({
            message: serverResponse.message,
            description: err.message
          })
          break
        case 404:
          notification.error({
            message: '请求的服务不存在',
            description: err.message
          })
          break
        case 500:
          notification.error({
            message: '服务器错误',
            description: err.message
          })
          break
        default:
          notification.error({
            message: '未知错误',
            description: err.message
          })
          break
      }
      throw err
    })
  )

export class HttpService {
  get(url: string) {
    const get$ = ajax
      .get(API_BASE + url, {
        Authorization: `Bearer ${authService.getAuthToken()}`,
        'Device-Type': 1
      })
      .pipe(ajaxErrorHandler())
      .pipe(pluck('response', 'data'))

    return get$
  }
  post(url: string, data: any) {
    const post$ = ajax
      .post(API_BASE + url, data, {
        Authorization: `Bearer ${authService.getAuthToken()}`,
        'Device-Type': 1
      })
      .pipe(ajaxErrorHandler())
      .pipe(pluck('response', 'data'))

    return post$
  }
  put(url: string, data: any) {
    const put$ = ajax
      .put(API_BASE + url, data, {
        Authorization: `Bearer ${authService.getAuthToken()}`,
        'Device-Type': 1
      })
      .pipe(ajaxErrorHandler())
      .pipe(pluck('response', 'data'))
  }
  delete(url: string, data: any) {
    const put$ = ajax
      .delete(API_BASE + url, {
        Authorization: `Bearer ${authService.getAuthToken()}`,
        'Device-Type': 1
      })
      .pipe(ajaxErrorHandler())
      .pipe(pluck('response', 'data'))
  }
}

export const http = new HttpService()
