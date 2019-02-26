import { StRoute, StRouteGuard } from '@/types/route'
import { sidebarService } from '@/services/sidebar.service'
import { State, withNamespace } from '@/utils/rx-state'
import { of, forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { tabService } from '@/services/tab.service'
const t = withNamespace('course')

class CourseService implements StRouteGuard {
  list$ = new State<any[]>([], t('list'))

  beforeRouteEnter(to: StRoute, from: StRoute, next: Function) {
    sidebarService.SET_SELECTED_KEYS(['12'])
    sidebarService.SET_OPEN_KEYS(['sub2', 'sub3'])

    tabService.init('课程管理', to)

    this.initData$().subscribe(() => {
      next()
    })
  }
  initData$() {
    return forkJoin(this.getList$())
  }
  getList$() {
    return of([1, 2, 3]).pipe(
      tap(res => {
        this.list$.commit(() => res)
      })
    )
  }
}

export const courseService = new CourseService()
