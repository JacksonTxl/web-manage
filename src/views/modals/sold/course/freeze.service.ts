import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CourseApi, FreezeCoursePackageInput } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'
import { TransactionApi } from '@/api/v1/sold/transaction'

@Injectable()
export class FreezeService {
  info$ = new State({})
  loading$ = new State({})
  memberPaymentlist$ = new State({})
  constructor(private courseApi: CourseApi, private transactionApi: TransactionApi) {}

  getInfo(id:string, type: string) {
    return this.courseApi.getFreezeCourseInfo(id, type).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }

  @Effect()
  freeze(params: FreezeCoursePackageInput, id:string, type:string) {
    return this.courseApi.freezeCourse(params, id, type)
  }
  @Effect()
  getMemberPaymentList(query: {member_id: number, product_type: number}) {
    return this.transactionApi.getMemberPaymentList(query).pipe(tap((res:any) => {
      this.memberPaymentlist$.commit(() => res.list)
    }))
  }
}
