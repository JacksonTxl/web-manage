import { Injectable } from 'vue-service-app'
import { FinanceApi, AddPerformanceParams } from '@/api/v1/finance'

@Injectable()
export class AddTemplateService {
  constructor(private MemberApi: FinanceApi) {}
  addTemplate(params: AddPerformanceParams) {
    return this.MemberApi.addPerformance(params)
  }
}
