import { State, withNamespace, getState } from 'rx-state'
import { find, findIndex, last } from 'lodash-es'
import router from '@/router'
import { ServiceRoute, RouteGuard } from 'vue-service-app'
import { localeService } from './locale.service'

const ns = withNamespace('tab')
interface Tab {
  name: string
  key: string
  lastUrl: string
}

class TabService implements RouteGuard {
  tabs$ = new State<Tab[]>([], ns('tabs'))
  activeKey$ = new State<string>('', ns('activeKey'))
  ADD_TAB(tab: Tab) {
    this.tabs$.commit(tabs => {
      tabs.push(tab)
    })
  }
  UPDATE_LAST_URL(key: string, lastUrl: string) {
    this.tabs$.commit(tabs => {
      const findedTab = find(tabs, { key: key })
      if (findedTab) {
        findedTab.lastUrl = lastUrl
      }
    })
  }
  REMOVE_TAB(key: string) {
    this.tabs$.commit(tabs => {
      const tabIndex = findIndex(tabs, { key })
      tabs.splice(tabIndex, 1)
    })
  }
  SET_ACTIVE_KEY(key: string) {
    this.activeKey$.commit(() => key)
  }
  init(tab: Tab) {
    const tabs = getState(this.tabs$)
    const finedTab = find(tabs, { key: tab.key })
    if (!finedTab) {
      this.ADD_TAB(tab)
    } else {
      this.UPDATE_LAST_URL(tab.key, tab.lastUrl)
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
    const tabName = localeService.translate(to.meta.title)
    const tabKey = to.name
    const tab = { name: tabName, key: tabKey, lastUrl: to.fullPath }
    this.init(tab)
    setTimeout(() => {
      next()
    }, 1000)
  }
}

export const tabService = new TabService()
