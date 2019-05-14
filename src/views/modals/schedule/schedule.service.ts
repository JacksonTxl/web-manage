import { PostScheduleTeamInput, GetScheduleTeamListQuery, GetMemberInput, PostScheduleTeamCopyInput } from './../../../api/v1/course/team/schedule'
import { CourseApi } from './../../../api/v1/setting/course'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap, map } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ScheduleApi } from '@/api/v1/course/team/schedule'
import { forkJoin } from 'rxjs'
import { Option } from 'ant-design-vue/types/select/option'

@Injectable()
export class ScheduleService extends Store<any> {
  constructor(private scheduleApi: ScheduleApi) {
    super()
  }
  postScheduleTeam(params: PostScheduleTeamInput) {
    return this.scheduleApi.postScheduleTeam(params)
  }
  @Effect()
  getScheduleTeamList(query: GetScheduleTeamListQuery) {
    return this.scheduleApi.getScheduleTeamList(query)
  }
  getScheduleTeamInEdit(id: string) {
    return this.scheduleApi.getScheduleTeamInEdit(id)
  }
  putScheduleTeam(params: any) {

  }
  getScheduleTeamCourseList() {
    return this.scheduleApi.getScheduleTeamCourseList()
  }
  getScheduleTeamCoachList() {
    return this.scheduleApi.getScheduleTeamCoachList()
  }
  getScheduleTeamCourtList() {
    return this.scheduleApi.getScheduleTeamCourtList()
  }
  initEditSchedule(id: string) {
    return forkJoin(this.initOptions(), this.getScheduleTeamInEdit(id))
      .pipe(map(state => {
        let [options, info] = state
        return { ...options, ...info }
      }))
  }
  initOptions() {
    return forkJoin(this.getScheduleTeamCoachList(), this.getScheduleTeamCourseList(), this.getScheduleTeamCourtList())
      .pipe(map(state => {
        const [coachOptions, courseOptions, courtOption] = state.map(item => item.list)
        return {
          coachOptions,
          courseOptions,
          courtOption
        }
      }))
  }
  postScheduleTeamCopy(params: PostScheduleTeamCopyInput) {
    return this.scheduleApi.postScheduleTeamCopy(params)
  }
  getMemberByMemberName(query: GetMemberInput) {
    return this.scheduleApi.getMemberByMemberName(query)
  }
}
