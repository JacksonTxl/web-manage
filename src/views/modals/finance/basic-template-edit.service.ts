import { Injectable } from 'vue-service-app'
import { FinanceApi, AddTemplateParams } from '@/api/v1/finance'

@Injectable()
export class EditTemplateService {
  constructor(private MemberApi: FinanceApi) {}
  editTemplate(id: any, params: AddTemplateParams) {
    return this.MemberApi.editTemplate(id, params)
  }
}
