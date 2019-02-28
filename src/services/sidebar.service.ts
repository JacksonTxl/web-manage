import { State, withNamespace, getState } from 'rx-state'
import Cookie from 'js-cookie'
const ns = withNamespace('sidebar')
class SidebarService {
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
}
export const sidebarService = new SidebarService()
