import { State, withNamespace, getState } from 'rx-state'
import { find, findIndex, last, clone } from 'lodash-es'
import router from '@/router'
import { ServiceRoute, RouteGuard } from 'vue-service-app'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

const ns = withNamespace('tab')
interface Tab {
  name: string
  key: string
  lastUrl: string
}

class TabService implements RouteGuard {
  tabs$ = new State<Tab[]>([], ns('tabs'))
  activeKey$ = new State<string>('', ns('activeKey'))
  activeTab$ = combineLatest(this.tabs$, this.activeKey$, (tabs, activeKey) =>
    find(tabs, activeKey)
  )
  canCloseTab$ = this.tabs$.pipe(map(tabs => tabs.length > 1))
  private ADD_TAB(tab: Tab) {
    this.tabs$.commit(tabs => {
      tabs && tabs.push(tab)
    })
  }
  private UPDATE_TAB(tab: Tab) {
    this.tabs$.commit(tabs => {
      const findedTab = find(tabs, { key: tab.key })
      if (findedTab) {
        findedTab.name = tab.name
        findedTab.lastUrl = tab.lastUrl
      }
    })
  }
  private REMOVE_TAB(key: string) {
    this.tabs$.commit(tabs => {
      const tabIndex = findIndex(tabs, { key })
      tabs && tabs.splice(tabIndex, 1)
    })
  }
  private SET_ACTIVE_KEY(key: string) {
    this.activeKey$.commit(() => key)
  }
  make(tab: Tab) {
    const tabs = getState(this.tabs$)
    const finedTab = find(tabs, { key: tab.key })
    if (!finedTab) {
      this.ADD_TAB(tab)
    } else {
      this.UPDATE_TAB(tab)
    }
    this.SET_ACTIVE_KEY(tab.key)
  }
  removeTab(tabKey: string) {
    if (getState(this.tabs$).length > 1) {
      this.REMOVE_TAB(tabKey)
      const lastTab = last(getState(this.tabs$))
      if (lastTab && lastTab.lastUrl) {
        router.push(lastTab.lastUrl)
      }
    }
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    this.make({
      name: to.meta.title,
      key: to.name,
      lastUrl: to.fullPath
    })
    next()
  }
}

export const tabService = new TabService()
