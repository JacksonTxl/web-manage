import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { LabelApi, AddLabel } from '@/api/v1/label'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class AddLabelService extends Store<CardsTableModelState> {
  constructor(private MemberApi: LabelApi) {
    super()
  }
  addLabel(params: AddLabel) {
    return this.MemberApi.addLabel(params)
  }
}
