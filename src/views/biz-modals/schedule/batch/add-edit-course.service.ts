import {
  TeamScheduleScheduleApi,
  AddCourseInput
} from '@/api/v1/schedule/team/schedule'
import { PersonalTeamScheduleScheduleApi } from '@/api/v1/schedule/personal-team/schedule'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { from } from 'rxjs'

@Injectable()
export class AddEditCourseService {
  loading$ = new State({})
  constructor(
    private teamApi: TeamScheduleScheduleApi,
    private smallApi: PersonalTeamScheduleScheduleApi
  ) {}
  /**
   * 获取团课排期信息
   */
  getTeamInfo(id: number) {
    return this.teamApi.getTeamInfo(id)
  }
  /**
   * 新建团课
   */
  @Effect()
  addTeamDetail(params: AddCourseInput) {
    return this.teamApi.addTeamDetail(params)
  }
  /**
   * 编辑团课
   */
  @Effect()
  editTeamDetail(id: number, params: AddCourseInput) {
    return this.teamApi.editTeamDetail(id, params)
  }
  /**
   * 获取私教小团课排期信息
   */
  getSmallInfo(id: number) {
    return this.smallApi.getSmallInfo(id)
  }
  /**
   * 新建私教小团课
   */
  @Effect()
  addSmallDetail(params: AddCourseInput) {
    return this.smallApi.addSmallDetail(params)
  }
  /**
   * 编辑私教小团课
   */
  @Effect()
  editSmallDetail(id: number, params: AddCourseInput) {
    return this.smallApi.editSmallDetail(id, params)
  }
}
