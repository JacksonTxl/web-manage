import { Injectable } from 'vue-service-app'
import { FinanceAPi, AddPerformanceParams } from '@/api/v1/finance'

@Injectable()
export class AddTemplateService {
  constructor(private MemberAPi: FinanceAPi) {
  }
  addTemplate(params: AddPerformanceParams) {
    return this.MemberAPi.addPerformance(params)
  }
}
