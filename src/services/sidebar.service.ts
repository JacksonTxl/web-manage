import { StRouteGuard, StRoute } from '@/types'
import { State, withNamespace } from '@/utils/rx-state'
import Cookie from 'js-cookie'
const ns = withNamespace('sidebar')

class SidebarService implements StRouteGuard {
  selectedKeys$ = new State<string[]>([], ns('selectedKeys'))
  openKeys$ = new State<string[]>([], ns('openKeys'))
  collapsed$ = new State<Boolean>(
    Boolean(Cookie.get('collapsed') || ''),
    ns('collapsed')
  )

  constructor() {
    this.collapsed$.subscribe(v => {
      Cookie.set('collapsed', v ? '1' : '')
    })
  }

  SET_SELECTED_KEYS(selectedKeys: string[]) {
    this.selectedKeys$.commit(() => selectedKeys)
  }
  SET_OPEN_KEYS(openKeys: string[]) {
    if (!this.collapsed$.state) {
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
