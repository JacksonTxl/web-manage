import { State, withNamespace, getState } from '@/utils/rx-state'
import Cookie from 'js-cookie'
import { StRouteGuard, StRoute } from '@/types/route'
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
    if (!getState(this.collapsed$)) {
      this.openKeys$.commit(() => openKeys)
    }
  }
  TOGGLE_COLLAPSED(collapsed: Boolean) {
    this.collapsed$.commit(() => collapsed)
  }
  beforeRouteEnter(to: StRoute, from: StRoute, next: any) {
    next()
  }
}
export const sidebarService = new SidebarService()
