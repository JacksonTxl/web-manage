import { Observable } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { catchError, pluck } from 'rxjs/operators'
import { API_BASE } from '@/constants/config'
import { authService } from './auth.service'

const ajaxErrorHandler = () => (source$: Observable<any>) =>
  source$.pipe(
    catchError(err => {
      throw err
    })
  )

export class HttpService {
  get(url: string) {
    const get$ = ajax
      .get(API_BASE + url, {
        'Authorization': `Bearer ${authService.getAuthToken()}`,
        'Device-Type': 1
      })
      .pipe(ajaxErrorHandler())
      .pipe(pluck('response', 'data'))

    return get$
  }
  post(url: string, data: any) {
    const post$ = ajax
      .post(API_BASE + url, data, {
        'Authorization': `Bearer ${authService.getAuthToken()}`,
        'Device-Type': 1
      })
      .pipe(ajaxErrorHandler())
      .pipe(pluck('response', 'data'))

    return post$
  }
}

export const http = new HttpService()
