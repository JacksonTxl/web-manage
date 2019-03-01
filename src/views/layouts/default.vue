<template>
  <div class="layout-default">
    <a-layout>
      <a-layout-sider collapsible
        @collapse="onSidebarCollapse"
        :collapsed="collapsed">
        <div class="logo">logo</div>
        <a-menu theme="dark"
          mode="inline"
          :openKeys.sync="openKeys"
          :selectedKeys.sync='selectedKeys'>
          <a-menu-item key="1">
            <router-link :to="{name:'dashboard'}">dashboard</router-link>
          </a-menu-item>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="appstore" />
              <span>Navigation Two</span>
            </span>
            <a-menu-item key="9">
              <router-link :to="{name:'test-llf'}">test-llf</router-link>
            </a-menu-item>
            <a-menu-item key="10">Option 10</a-menu-item>
            <a-sub-menu key="sub3"
              title="Submenu">
              <a-menu-item key="11">Option 11</a-menu-item>
              <a-menu-item key="12">
                <router-link :to="{name:'plugins-course'}">plugins-course</router-link>
              </a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
          <a-menu-item key="3">
            <router-link :to="{name:'test-llf'}">test-llf</router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="user" />
            <span class="nav-text">nav 4</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header></a-layout-header>
        <a-layout-content>
          <a-tabs type='editable-card'
            hideAdd
            :defaultActiveKey="activeKey"
            @edit='onTabEdit'
            @change="onTabChange">
            <a-tab-pane v-for="tabItem in tabs"
              :key="tabItem.key"
              :tab="tabItem.name">
            </a-tab-pane>
          </a-tabs>
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer>Ant Design ©2018 Created by Ant UED</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { userService } from '@/services/user.service'
import { sidebarService } from '@/services/sidebar.service'
import { tabService } from '@/services/tab.service'
import { find } from 'lodash-es'

export default {
  subscriptions() {
    return {
      user: userService.user$,
      selectedKeys: sidebarService.selectedKeys$,
      openKeys: sidebarService.openKeys$,
      collapsed: sidebarService.collapsed$,

      tabs: tabService.tabs$,
      activeKey: tabService.activeKey$
    }
  },
  methods: {
    onSidebarCollapse(collapsed) {
      sidebarService.TOGGLE_COLLAPSED(collapsed)
    },
    onTabChange(tabKey) {
      const tab = find(this.tabs, { key: tabKey })
      this.$router.push(tab.lastUrl)
    },
    onTabEdit(tabKey, action) {
      if (action === 'remove') {
        tabService.removeTab(tabKey)
      }
    }
  }
}
</script>
