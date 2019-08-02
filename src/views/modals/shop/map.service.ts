import { Injectable } from 'vue-service-app'
import { Observable } from 'rxjs'

@Injectable()
export class MapService {
  getLocation(url: string) {
    let index = 0
    let o$ = new Observable(observer => {
      index++
      const key = '__jsonp_callback' + index
      const script = document.createElement('script')
      script.src = url + key
      script.onerror = err => observer.error(err)
      // @ts-ignore
      window[key] = (response: any) => {
        // @ts-ignore
        script.parentNode.removeChild(script)
        // @ts-ignore
        delete window[key]
        observer.next(response)
        observer.complete()
      }

      document.getElementsByTagName('head')[0].appendChild(script)
      index = 0
    })
    return o$
  }
}
