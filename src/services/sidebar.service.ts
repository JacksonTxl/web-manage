import { BeforeRouteEnter, StRoute } from '@/types'
import { State } from '@/utils/rx-state'
import Cookie from 'js-cookie'

class SidebarService implements BeforeRouteEnter {
  selectedKeys$ = new State<string[]>([])
  openKeys$ = new State<string[]>([])
  collapsed$ = new State<Boolean>(Boolean(Cookie.get('collapsed') || ''))

  constructor() {
    this.collapsed$.subscribe(v => {
      Cookie.set('collapsed', v ? '1' : '')
    })
  }

  SET_SELECTED_KEYS(selectedKeys: string[]) {
    this.selectedKeys$.commit(() => selectedKeys)
  }
  SET_OPEN_KEYS(openKeys: string[]) {
    if (!this.collapsed$.snapshot) {
      this.openKeys$.commit(() => openKeys)
    }
  }
  RESET_KEYS() {
    this.openKeys$.commit(() => [])
    this.selectedKeys$.commit(() => [])
  }
  TOGGLE_COLLAPSED(collapsed: Boolean) {
    this.collapsed$.commit(() => collapsed)
  }
  beforeRouteEnter(to: StRoute, from: StRoute, next: Function) {
    this.RESET_KEYS()
    next()
  }
}
export const sidebarService = new SidebarService()
