import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StoreApi } from '@/api/v1/shop/store/store'
import { MessageService } from '@/services/message.service'
@Injectable()
export class ClassManageService {
  list$ = new State([])
  loading$ = new State({})
  constructor(private storeApi: StoreApi, private msg: MessageService) {}
  @Effect()
  getList() {
    return this.storeApi.categoryList()
  }
  @Effect()
  addClass(params: { category_name: string }) {
    return this.storeApi.addCategory(params).pipe(tap(() => {}))
  }
  @Effect()
  editClass(id: number, params: { category_name: string }) {
    return this.storeApi.editCategory(id, params).pipe(tap(() => {}))
  }
  @Effect()
  delClass(id: number) {
    return this.storeApi.delCategory(id).pipe(
      tap(() => {
        this.msg.success({
          content: '删除成功！'
        })
      })
    )
  }
}
