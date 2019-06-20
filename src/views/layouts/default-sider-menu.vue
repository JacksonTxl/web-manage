<template>
  <div>
    <div v-if="favorite.length" class="layout-default-sider__often">
      <h2 class="layout-default-sider__often-title">常用</h2>
      <ul class="layout-default-sider__often-list">
        <!-- <li
          class="layout-default-sider__often-item layout-default-sider__often-item--active"
        >
          <i></i>
          <span>营销插件</span>
        </li> -->
        <li
          v-for="(item, index) in favorite"
          :key="index"
          class="layout-default-sider__often-item"
          @click="delFavorite(item.id)"
        >
          <i></i>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <a-menu
        class="layout-default-sider__menu"
        :openKeys="openKeys"
        @openChange="onOpenChange"
        mode="inline"
        @click='onClickMenu'
      >
        <template v-for="menu in menus">
          <a-sub-menu
            v-if="isHasSubmenu(menu)"
            :key="menu.id"
          >
            <span slot="title">
              <st-icon :type="menu.icon"/>
              <span>{{menu.name}}</span>
            </span>
            <a-menu-item
              v-for="subMenu in menu.children"
              :key="subMenu.id"
            >
              {{subMenu.name}}
            </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="menu.id">
          <router-link :to="{ name: menu.url }">
            <st-icon :type="menu.icon"/>
            <span>{{menu.name}}</span>
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
import { treeToMap } from '@/utils/tree-to-map'
export default {
  name: 'DefaultBrandSiderMenu',
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      menuData: this.userService.menuData$
    }
  },
  data() {
    return {
      openKeys: []
    }
  },
  computed: {
    menus() {
      return this.menuData.menus || []
    },
    favorite() {
      return this.menuData.favorite || []
    },
    menuMap() {
      return treeToMap(this.menus)
    },
    rootSubmenuKeys() {
      return this.getRootSubmenuKeys()
    }
  },
  methods: {
    isHasSubmenu(menu) {
      return (
        menu.children && menu.children.length
      )
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    onClickMenu({ key }) {
      this.selectedKeys = [key]
      const menu = this.menuMap[key]
      // if (this.$route.name.indexOf(menu.url) > -1) {
      //   return
      // }
      this.$router.push({
        name: menu.url
      })
      // this.addFavorite(key)
    },
    addFavorite(id) {
      this.userService.addFavorite(id).subscribe(this.onMenuChange)
    },
    delFavorite(id) {
      this.userService.delFavorite(id).subscribe(this.onMenuChange)
    },
    onMenuChange() {
      this.userService.getMenus({
        force: true
      }).subscribe()
    },
    getRootSubmenuKeys() {
      const { menus } = this
      const rootSubmenuKeys = []
      menus.forEach(item => {
        rootSubmenuKeys.push(item.id)
      })
      return rootSubmenuKeys
    }
  }
}
</script>
