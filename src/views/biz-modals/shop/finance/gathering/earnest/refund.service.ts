import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardApi, RefundCardInput } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class RefundService {
  refundInfo$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardApi) {}
  @Effect()
  getRefundInfo(id: string, type: string) {
    return this.cardApi.getCardRefundInfo(id, type).pipe(
      tap((res: any) => {
        this.refundInfo$.commit(() => res.info)
      })
    )
  }
  @Effect()
  refund(params: RefundCardInput, id: string, type: string) {
    return this.cardApi.editCardRefund(params, id, type)
  }
}
