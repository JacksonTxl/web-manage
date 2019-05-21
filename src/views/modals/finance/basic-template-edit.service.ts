import { Injectable } from 'vue-service-app'
import { FinanceAPi, AddTemplateParams } from '@/api/v1/finance'

@Injectable()
export class EditTemplateService {
  constructor(private MemberAPi: FinanceAPi) {
  }
  editTemplate(id: any, params: AddTemplateParams) {
    return this.MemberAPi.editTemplate(id, params)
  }
}
