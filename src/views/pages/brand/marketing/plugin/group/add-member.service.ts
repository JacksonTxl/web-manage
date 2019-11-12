import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'

@Injectable()
export class AddMemberService {
  loading$ = new State({})
  info$ = new State({})
}
