import { Injectable } from 'vue-service-app'
import { FinanceApi, AddPerformanceParams } from '@/api/v1/finance'
import { UserService } from './../../../services/user.service'

@Injectable()
export class EditTemplateService {
  performanceModes$ = this.userService.getOptions$('finance.performance_mode')
  performanceTypes$ = this.userService.getOptions$('finance.performance_type')
  constructor(
    private MemberApi: FinanceApi,
    private userService: UserService
  ) {}
  editTemplate(id: any, params: AddPerformanceParams) {
    return this.MemberApi.editPerformance(id, params)
  }
  getInfo(id: any) {
    return this.MemberApi.getPerformanceInfo(id)
  }
}
