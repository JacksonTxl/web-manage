import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { FrontApi, AddWorkNotesInput } from '@/api/v1/front'

@Injectable()
export class AddWorkNoteService {
    loading$ = new State({})
    constructor(private frontApi:FrontApi) {}
    @Effect()
    addWorkNote(params:AddWorkNotesInput) {
      return this.frontApi.addWorkNotes(params)
    }
}
