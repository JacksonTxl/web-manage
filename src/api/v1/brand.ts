import { Api } from '../api'
import { of } from 'rxjs'
import { delay } from 'rxjs/operators'

export interface BrandInfoInput {
  name: string
  age: number
}

export class BrandApi extends Api {
  getInfo(query: BrandInfoInput) {
    return of({ name: 'agn', age: 444 }).pipe(delay(500))
  }
}
