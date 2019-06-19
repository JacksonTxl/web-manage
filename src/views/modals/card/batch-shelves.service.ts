import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state/src'
import { CardsApi } from '@/api/v1/cards'
import { tap, debounceTime, switchMap, catchError } from 'rxjs/operators'
import { PackageApi, GetCourseInput } from '@/api/v1/course/package'
import { EMPTY } from 'rxjs'

@Injectable()
export class BatchShelvesService {
  info$ = new State({})
  loading$ = new State({})
  courseListAction$: Action<any>
  courseList$ = new State([])
  constructor(private cardApi: CardsApi, private packageApi: PackageApi) {
    this.courseListAction$ = new Action(data$ => {
      return data$.pipe(
        debounceTime(200),
        switchMap((params:GetCourseInput) => this.getCourseList(params).pipe(catchError(() => EMPTY))),
        tap(res => {
          this.courseList$.commit(() => res.list)
        })
      )
    })
  }
  getInfo(id:string) {
    return this.cardApi.getCardShelfInfo(id).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  @Effect()
  getCourseList(params:GetCourseInput) {
    return this.packageApi.getCourseList(params)
  }
  resetCourseList() {
    this.courseList$.commit(() => [])
  }
  @Effect()
  shelfCard(params:any) {

  }
}
