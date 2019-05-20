import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { LabelApi, EditParams } from '@/api/v1/label'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class EditLabelService extends Store<CardsTableModelState> {
  constructor(private MemberAPi: LabelApi) {
    super()
  }
  editLabel(id: number, params: EditParams) {
    return this.MemberAPi.editLabel(id, params)
  }
}
