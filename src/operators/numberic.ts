import { Observable } from 'rxjs'
/**
 * 数字化发射值
 * @param numbericFields 需要数字化的字段
 */
export function numberic(numbericFields: string[] = []) {
  return function(source$: Observable<any>) {
    return new Observable(subscriber => {
      const observer = {
        next(v: any) {
          subscriber.next(v)
        },
        error(err: any) {
          subscriber.error(err)
        },
        complete() {
          subscriber.complete()
        }
      }

      source$.subscribe(observer)
    })
  }
}
