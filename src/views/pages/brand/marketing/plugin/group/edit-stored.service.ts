import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class EditStoredService {
  loading$ = new State({})
  info$ = new State({})
  constructor() {}
}
