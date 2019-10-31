import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'

/**
 * 根据路由参数生成query$
 */
@Injectable()
export class RouteService {
  query$: State<any>
  constructor() {
    this.query$ = new State({})
  }
  SET_QUERY(query: any) {
    this.query$.commit(() => query)
  }
}
