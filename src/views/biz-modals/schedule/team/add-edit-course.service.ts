import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'

@Injectable()
export class AddEditCourseService {
  loading$ = new State({})
}
