import { Injectable } from 'vue-service-app'
import { LabelApi, EditParams } from '@/api/v1/label'
import { State } from 'rx-state/src'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class EditLabelService {
  loading$ = new State({})
  constructor(private MemberApi: LabelApi) {}
  editLabel(id: number, params: EditParams) {
    return this.MemberApi.editLabel(id, params)
  }
}
