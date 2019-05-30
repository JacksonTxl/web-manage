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
  packageCourseInfo$ = new State({})
  packageTransferInfo$ = new State({})
  timeScope$ = new State({})
  personalCourseInfo$ = new State({})
  constructor(private contractApi:ContractApi, private memberApi: ShopPersonalCourseApi, private courseApi:CourseApi) {}
  @Effect()
  getMember(member:string) {
    return this.memberApi.getMemberList(member).pipe(tap((res:any) => {
      this.memberList$.commit(() => res.list)
    }))
  }
  @Effect()
  getCourseInfo(id:string, type:string) {
    return this.courseApi.getCourseTransferInfo(id, type).pipe(tap((res:any) => {
      if (type === 'package') {
        this.packageCourseInfo$.commit(() => res.info.course_info)
        this.packageTransferInfo$.commit(() => res.info.transfer_info)
        this.timeScope$.commit(() => {
          return res.info.transfer_info.course_end_time * 1000 - Date.now()
        })
      } else if (type === 'personal') {
        this.personalCourseInfo$.commit(() => res.info)
        this.timeScope$.commit(() => {
          return res.info.end_time * 1000 - Date.now()
        })
      }
    }))
  }
  @Effect()
  editCourseTransfer(params:TransferCoursePackageInput, id:string, type:string) {
    return this.courseApi.editCourseTransfer(params, id, type)
  }
  @Effect()
  getCodeNumber(id:string) {
    return this.contractApi.getCodeNumber(id)
  }
}