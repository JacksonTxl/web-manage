import { StRoute, StRouteGuard } from '@/types'
import { State } from '@/utils/rx-state'
import { find, findIndex, last } from 'lodash-es'
import { router } from '@/router'

interface Tab {
  name: string
  key: string
  lastUrl: string
}

class TabService implements StRouteGuard {
  tabs$ = new State<Tab[]>([], 'tabs')
  activeKey$ = new State<string>('')
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
  init(tabName: string, to: StRoute) {
    const finedTab = find(this.tabs$.state, { key: to.name })
    if (!finedTab) {
      this.ADD_TAB({
        name: tabName,
        key: to.name,
        lastUrl: to.fullPath
      })
    } else {
      this.UPDATE_LAST_URL(to.name, to.fullPath)
    }
    this.SET_ACTIVE_KEY(to.name)
  }
  removeTab(tabKey: string) {
    const tabsState = this.tabs$.state
    if (tabsState.length > 1) {
      this.REMOVE_TAB(tabKey)
      const lastTab = last(this.tabs$.state)
      if (lastTab && lastTab.lastUrl) {
        router.push(lastTab.lastUrl)
      }
    }
  }
  beforeRouteEnter(to: StRoute, from: StRoute, next: any) {
    next()
  }
  beforeRouteUpdate(to: StRoute, from: StRoute, next: any) {
    this.UPDATE_LAST_URL(to.name, to.fullPath)
    next()
  }
}

export const tabService = new TabService()
