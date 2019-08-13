import { Api } from './api'
import { tap, map } from 'rxjs/operators'

class Photo {
  [key: string]: any
  constructor(obj: any) {
    Object.keys(obj).forEach(k => {
      this[k] = obj[k]
    })
  }
}
export class TestApi extends Api {
  getPhotos() {
    return this.http
      .originalGet('https://jsonplaceholder.typicode.com/photos')
      .pipe(map(res => res.response.map((item: object) => new Photo(item))))
  }
}
