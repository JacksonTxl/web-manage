import { Injectable, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state/src'

@Injectable()
export class ListService {
    list$ = new State([])
}
