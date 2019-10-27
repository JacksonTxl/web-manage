import { Injectable } from 'vue-service-app'
import { State, computed } from 'rx-state'
import { UserService } from './user.service'

@Injectable()
export class TitleService {
  title$ = new State<string>('')
  normalTitle$ = new State<string>('')
  appDocumentTitle$ = computed<string>(
    (title: string, brand: any, shop: any) => {
      if (brand.name || shop.name) {
        return `${title ? title + ' - ' : ''}${shop.name} ${brand.name}`
      }
      return `${title ? title + ' - ' : ''}三体云动Pro`
    },
    [this.title$, this.userService.brand$, this.userService.shop$]
  )
  constructor(private userService: UserService) {
    this.appDocumentTitle$.subscribe(appDocumentTitle => {
      document.title = appDocumentTitle
    })

    this.normalTitle$.subscribe(normalTitle => {
      console.log('no', normalTitle)
      document.title = `${normalTitle ? normalTitle + ' - ' : ''}三体云动Pro`
    })
  }
  // 设定标题 和应用数据相关
  SET_TITLE(title: string) {
    this.title$.commit(() => this.userService.interpolation(title))
  }
  // 设定普通标题 和应用无关
  SET_NORMAL_TITLE(title: string) {
    this.normalTitle$.commit(() => title)
  }
}
