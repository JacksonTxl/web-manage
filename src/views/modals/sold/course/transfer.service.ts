import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { ShopPersonalCourseApi } from '@/api/v1/course/personal/shop'
import { CourseApi, TransferCoursePackageInput } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'

@Injectable()
export class TransferService {
  loading$ = new State({})
  memberList$ = new State({})
  courseInfo$ = new State({})
  transferInfo$ = new State({})
  timeScope$ = new State({})
  constructor(private contractApi:ContractApi, private memberApi: ShopPersonalCourseApi, private courseApi:CourseApi) {}
  @Effect()
  getMember(member:string) {
    return this.memberApi.getMemberList(member).pipe(tap((res:any) => {
      this.memberList$.commit(() => res.list)
    }))
  }
  @Effect()
  getCourseInfo(id:string) {
    return this.courseApi.getCoursePackageTransferInfo(id).pipe(tap((res:any) => {
      this.courseInfo$.commit(() => res.info.course_info)
      this.transferInfo$.commit(() => res.info.transfer_info)
      this.timeScope$.commit(() => {
        return res.info.transfer_info.course_end_time * 1000 - Date.now()
      })
    }))
  }
  @Effect()
  editCoursePackageTransfer(params:TransferCoursePackageInput, id:string) {
    return this.courseApi.editCoursePackageTransfer(params, id)
  }
  @Effect()
  getCodeNumber(id:string) {
    return this.contractApi.getCodeNumber(id)
  }
}
