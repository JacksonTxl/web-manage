import { BeforeRouteEnter, StRoute } from '@/types'
import { State } from '@/utils/rx-state'
import { find } from 'lodash-es'

interface Tab {
  name: string
  key: string
}

class TabService implements BeforeRouteEnter {
  tabs$ = new State<Tab[]>([], 'tabs')
  activeKey$ = new State<string>('')
  ADD(tab: Tab) {
    if (!find(this.tabs$.snapshot, { key: tab.key })) {
      this.tabs$.commit(prevTabs => prevTabs.concat(tab))
    }
  }
  SET_ACTIVE_KEY(tabKey: string) {
    this.activeKey$.commit(() => tabKey)
  }
  beforeRouteEnter(to: StRoute, from: StRoute, next: any) {
    this.SET_ACTIVE_KEY(to.name)
    next()
  }
}

export const tabService = new TabService()
