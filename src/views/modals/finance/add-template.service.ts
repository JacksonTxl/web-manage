import { Injectable } from 'vue-service-app'
import { FinanceAPi, AddTemplateParams } from '@/api/v1/finance'

@Injectable()
export class AddTemplateService {
  constructor(private MemberAPi: FinanceAPi) {
  }
  addTemplate(params: AddTemplateParams) {
    return this.MemberAPi.addTemplate(params)
  }
}
