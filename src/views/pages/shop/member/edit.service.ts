import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberAPi } from '@/api/v1/member'
import { UpdateMemberEdit } from '../../../../api/v1/member'

interface EditState {
    info: Object
}
@Injectable()
export class EditService extends Store<EditState> {
    state$: State<EditState>
    info$: Computed<Object>
    constructor(protected memberApi: MemberAPi) {
      super()
      this.state$ = new State({
        info: {}
      })
      this.info$ = new Computed(this.state$.pipe(pluck('info')))
    }
    getMemberEdit(id: number) {
      return this.memberApi.getMemberEdit(id).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.info = res.info
          })
        })
      )
    }
    @Effect()
    updateMemberEdit(id: string, params: UpdateMemberEdit) {
      return this.memberApi.updateMemberEdit(id, params)
    }
    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      console.log('to.meta', to.meta)
      const member_id = to.meta.query.id
      this.getMemberEdit(member_id).subscribe(() => {
        next()
      }, () => {
        next(false)
      })
    }
}
