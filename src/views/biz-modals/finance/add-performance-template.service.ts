import { UserService } from './../../../services/user.service'
import { Injectable } from 'vue-service-app'
import { FinanceApi, AddPerformanceParams } from '@/api/v1/finance'

@Injectable()
export class AddTemplateService {
  performanceModes$ = this.userService.getOptions$('finance.performance_mode')
  performanceTypes$ = this.userService.getOptions$('finance.performance_type')
  constructor(
    private MemberApi: FinanceApi,
    private userService: UserService
  ) {}
  addTemplate(params: AddPerformanceParams) {
    return this.MemberApi.addPerformance(params)
  }
}
