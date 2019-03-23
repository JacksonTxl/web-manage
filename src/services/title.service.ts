import { I18NService } from './i18n.service'
import { ServiceRoute, Injectable, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state/src'
import { pluck, map } from 'rxjs/operators'
import { Observable, combineLatest } from 'rxjs'

interface TitleState {
  titleIndex: string
  title: string
}

@Injectable()
export class TitleService implements RouteGuard {
  state$: State<TitleState>
  titleIndex$: Observable<string>
  title$: Observable<string>
  constructor(private i18n: I18NService) {
    this.state$ = new State(
      {
        titleIndex: '',
        title: ''
      },
      'TitleService.state$'
    )
    this.titleIndex$ = this.state$.pipe(pluck('titleIndex'))

    this.title$ = combineLatest(this.titleIndex$, this.i18n.locale$).pipe(
      map(
        ([titleIndex]) =>
          `${this.i18n.t('app.title')} - ${this.i18n.t(titleIndex)}`
      )
    )
    this.title$.subscribe(title => {
      document.title = title
    })
  }
  // 设定标题国际化索引值
  SET_TITLE_INDEX(titleIndex: string) {
    this.state$.commit(state => {
      state.titleIndex = titleIndex
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const titleIndex: string = to.meta.title
    this.SET_TITLE_INDEX(titleIndex)
    next()
  }
}
