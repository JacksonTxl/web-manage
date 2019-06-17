import { Injectable } from 'vue-service-app'
import { FinanceApi, AddTemplateParams } from '@/api/v1/finance'

@Injectable()
export class AddTemplateService {
  constructor(private MemberApi: FinanceApi) {
  }
  addTemplate(params: AddTemplateParams) {
    return this.MemberApi.addTemplate(params)
  }
}
