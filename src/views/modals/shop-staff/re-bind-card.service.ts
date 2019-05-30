import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { LabelApi, AddLabel } from '@/api/v1/label'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class AddLabelService extends Store<CardsTableModelState> {
  constructor(private MemberAPi: LabelApi) {
    super()
  }
  addLabel(params: AddLabel) {
    return this.MemberAPi.addLabel(params)
  }
}
