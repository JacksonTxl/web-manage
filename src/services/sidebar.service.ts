import { State, withNamespace, getState } from 'rx-state'
import Cookie from 'js-cookie'
const ns = withNamespace('sidebar')
export class SidebarService {
  selectedKeys$: State<string[]>
  openKeys$: State<string[]>
  collapsed$: State<boolean>

  constructor() {
    this.selectedKeys$ = new State([], ns('selectedKeys'))
    this.openKeys$ = new State([], ns('openKeys'))
    this.collapsed$ = new State(
      Boolean(Cookie.get('collapsed') || ''),
      ns('collapsed')
    )
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
  TOGGLE_COLLAPSED(collapsed: boolean) {
    this.collapsed$.commit(() => collapsed)
  }
}
export const sidebarService = new SidebarService()
