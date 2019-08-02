import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state'
import { CardsApi, CourseTeamShelfListInput } from '@/api/v1/cards'
import { tap, debounceTime, switchMap, catchError } from 'rxjs/operators'
import { EMPTY } from 'rxjs'

@Injectable()
export class ShelfService {
  info$ = new State({})
  loading$ = new State({})
  courseListAction$: Action<any>
  courseList$ = new State([])
  constructor(private cardApi: CardsApi) {
    this.courseListAction$ = new Action(data$ => {
      return data$.pipe(
        debounceTime(200),
        switchMap((query: CourseTeamShelfListInput) =>
          this.getCourseList(query).pipe(catchError(() => EMPTY))
        ),
        tap(res => {
          this.courseList$.commit(() => res.list)
        })
      )
    })
  }
  getInfo(id: string) {
    return this.cardApi.getCardShelfInfo(id, 'shop', 'member').pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  getCourseList(query: CourseTeamShelfListInput) {
    return this.cardApi.getCourseTeamShelfList(query, 'shop')
  }
  resetCourseList() {
    this.courseList$.commit(() => [])
  }
  @Effect()
  shelfCard(params: any, id: string) {
    return this.cardApi.setCardShelf(params, id, 'shop', 'member')
  }
}
