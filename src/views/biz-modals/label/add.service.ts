import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { LabelApi, AddLabel } from '@/api/v1/label'

@Injectable()
export class AddLabelService {
  constructor(private memberApi: LabelApi) {}
  addLabel(params: AddLabel) {
    return this.memberApi.addLabel(params)
  }
}
