<template>
  <div>
    <a-menu
        class="layout-default-sider__menu"
        :openKeys="openKeys"
        :selectedKeys="selectedKeys"
        @openChange="onOpenChange"
        mode="inline"
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
              <st-icon
                v-if="isfavorite(subMenu.id)"
                type="star"
                size="8px"
                class="layout-default-sider__menu-star active"
                @click.native="delFavorite(subMenu.id)"
              />
              <st-icon
                v-else
                type="star"
                size="8px"
                class="layout-default-sider__menu-star"
                @click.native="addFavorite(subMenu.id)"
              />
              <span @click="onClickMenuItem(subMenu)">{{subMenu.name}}</span>
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
        >
          <st-icon
            type="star"
            @click.native="delFavorite(item.id)"
          />
          <router-link :to="{ name: item.url }">
            <span class="layout-default-sider__favorite-title">{{item.name}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
import { treeToMap } from '@/utils/tree-to-map'
import { find } from 'lodash-es'
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
      // selectedKeys: []
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
    },
    currentSiderMenu() {
      return this.findCurrentSiderMenu()
    },
    selectedKeys() {
      const selectedKey = this.findSelectedKey(this.currentSiderMenu)
      return selectedKey ? [selectedKey] : []
    }
  },
  watch: {
    selectedKeys() {
      this.setOpenKeys()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.setOpenKeys()
    },
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
    findCurrentSiderMenu() {
      const { menus } = this
      let currentSiderMenu
      menus.forEach(menu => {
        if (this.getPageName().indexOf(menu.icon) !== -1) {
          currentSiderMenu = menu
        }
      })
      return currentSiderMenu || {}
    },
    findSelectedKey() {
      let selectedKey
      (this.currentSiderMenu.children || []).forEach(item => {
        if (item.url && this.getPageName().indexOf(item.url) !== -1) {
          selectedKey = item.id
        }
      })
      return selectedKey
    },
    setOpenKeys() {
      const openKey = this.currentSiderMenu.id
      this.openKeys = openKey ? [openKey] : []
    },
    setSelectedKeys() {
      const selectedKey = this.findSelectedKey(this.currentSiderMenu)
      this.selectedKeys = selectedKey ? [selectedKey] : []
    },
    onClickMenuItem(menu) {
      // if (this.$route.name.indexOf(menu.url) > -1) {
      //   return
      // }
      this.$router.push({
        name: menu.url
      })
    },
    addFavorite(id) {
      this.userService.addFavorite(id).subscribe(this.onMenuChange)
    },
    delFavorite(id) {
      this.userService.delFavorite(id).subscribe(this.onMenuChange)
    },
    onMenuChange() {
      this.userService.reloadMenus()
    },
    getRootSubmenuKeys() {
      const { menus } = this
      const rootSubmenuKeys = []
      menus.forEach(item => {
        rootSubmenuKeys.push(item.id)
      })
      return rootSubmenuKeys
    },
    isfavorite(id) {
      return find(this.favorite, { id })
    },
    getPageName() {
      return this.$route.path.replace(/\//g, '-')
    }
  }
}
</script>
