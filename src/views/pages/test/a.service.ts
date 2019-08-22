import { tap } from 'rxjs/operators'
import { Route } from 'vue-router'
import { Injectable } from 'vue-service-app'
import { TestApi } from '@/api/test'
import { State } from 'rx-state/src'

@Injectable()
export class AService {
  list$ = new State([])
  constructor(private testApi: TestApi) {}
  getList() {
    return this.testApi.getPhotos().pipe(
      tap((res: any) => {
        this.list$.commit(() => res)
      })
    )
  }
  beforeEach(to: Route, from: Route) {
    console.log('AService beforeEach')
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 30)
    })
  }
  beforeRouteEnter(to: Route, from: Route) {
    console.log('AService beforeRouteEnter')
    return this.getList()
  }
  afterEach(to: Route, from: Route) {
    console.log('after AService')
  }
}
