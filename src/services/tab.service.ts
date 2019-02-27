import { State, withNamespace, getState } from '@/utils/rx-state'
import { find, findIndex, last } from 'lodash-es'
import router from '@/router'
import { ServiceRoute, Service } from 'vue-service-app'

const t = withNamespace('tab')
interface Tab {
  name: string
  key: string
  lastUrl: string
}

class TabService extends Service {
  tabs$ = new State<Tab[]>([], t('tabs'))
  activeKey$ = new State<string>('', t('activeKey'))
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
  init(tabName: string, to: ServiceRoute) {
    const tabs = getState(this.tabs$)
    const finedTab = find(tabs, { key: to.name })
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
    if (getState(this.tabs$).length > 1) {
      this.REMOVE_TAB(tabKey)
      const lastTab = last(getState(this.tabs$))
      if (lastTab && lastTab.lastUrl) {
        router.push(lastTab.lastUrl)
      }
    }
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.UPDATE_LAST_URL(to.name, to.fullPath)
    next()
  }
}

export const tabService = new TabService()
