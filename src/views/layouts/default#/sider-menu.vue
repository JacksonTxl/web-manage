<template>
  <div class="layout-default-sider__both">
    <div v-if="favorite.length" class="layout-default-sider__often">
      <h2 class="layout-default-sider__often-title">常用</h2>
      <ul class="layout-default-sider__often-list">
        <li
          v-for="(item, index) in favorite"
          :key="index"
          class="layout-default-sider__often-item"
        >
          <st-icon type="star" @click.native="delFavorite(item.id)" />
          <router-link
            :to="{ name: item.url }"
            class="layout-default-sider__favorite-title"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>
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
          class="layout-default-sider__submenu"
        >
          <span slot="title">
            <st-icon :type="menu.icon" />
            <span>{{ menu.name }}</span>
            <st-icon
              class="layout-default-sider__menu-arrow open"
              type="add"
              size="8px"
            />
            <st-icon
              class="layout-default-sider__menu-arrow fold-up"
              type="minus"
              size="8px"
            />
          </span>
          <a-menu-item
            v-for="subMenu in menu.children"
            :key="subMenu.id"
            class="layout-default-sider__menu-item sub"
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
              type="star-line"
              size="8px"
              class="layout-default-sider__menu-star"
              @click.native="addFavorite(subMenu.id, subMenu)"
            />
            <span
              @click="onClickMenuItem(subMenu)"
              class="layout-default-sider__menu-title"
            >
              {{ subMenu.name }}
            </span>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item
          v-else
          :class="{
            'st-menu-item-selected': menu.id === currentSiderMenu.id
          }"
          class="ant-menu-item__only-one"
          :key="menu.id"
        >
          <router-link :to="{ name: menu.url }">
            <st-icon :type="menu.icon" />
            <span>{{ menu.name }}</span>
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
import { treeToMap } from '@/utils/tree-to-map'
import { find, remove, constant } from 'lodash-es'
import { iconMap } from './sider-menu.config'
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
    },
    currentSiderMenu() {
      return this.findCurrentSiderMenu()
    },
    selectedKeys() {
      const selectedKey = this.findSelectedKey(this.currentSiderMenu)
      this.$emit('change', {
        selectedKey,
        currentSiderMenu: this.currentSiderMenu,
        menus: this.menus
      })
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
    // this.$nextTick().then(() => {
    //   document.querySelectorAll('.ant-menu-submenu-title').forEach(item =>
    //     item.addEventListener('click', () => {
    //       console.log('ddss')
    //       document.querySelectorAll('.ant-menu-item.st-menu-item-selected').forEach(ele => {
    //         ele.setAttribute('class', '.ant-menu-item')
    //       })
    //     })
    //   )
    // })
  },
  methods: {
    init() {
      this.setOpenKeys()
    },
    isHasSubmenu(menu) {
      return menu.children && menu.children.length
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      )
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    findCurrentSiderMenu() {
      let currentSiderMenu
      this.menus.forEach(menu => {
        const matchRule = this.getMatchRule(menu)
        if (matchRule.test(this.$route.name)) {
          currentSiderMenu = menu
        }
      })
      return currentSiderMenu || {}
    },
    getMatchRule(menu) {
      let { icon } = menu
      if (!icon) {
        return /^The menu config is error\.The icon field of the menu api should not be empty!/
      }
      /**
       * 对一些特殊的 icon 做处理，比如 dashboard 用的是 home, 建立起菜单 icon 与路由的映射关系
       */
      if (iconMap.hasOwnProperty(icon)) {
        icon = iconMap[icon]
      }
      return new RegExp(`^((brand|shop)-)?${icon}`)
    },
    findSelectedKey() {
      let selectedKey
      ;(this.currentSiderMenu.children || []).forEach(item => {
        if (item.url && this.$route.name.indexOf(item.url) !== -1) {
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
      const { resolved } = this.$router.resolve({
        name: menu.url
      })
      if (!resolved.matched.length) {
        location.href = '/404'
      } else {
        this.$router.push({
          name: menu.url
        })
      }
    },
    addFavorite(id, subMenu) {
      this.userService.addFavorite(id).subscribe(() => {
        const findMenu = find(this.menuData.favorite, item => {
          return item.id === id
        })
        if (!findMenu) {
          this.menuData.favorite.push(subMenu)
        }
      })
    },
    delFavorite(id) {
      const { favorite } = this.menuData
      remove(favorite, item => {
        return item.id === id
      })
      this.userService.delFavorite(id).subscribe(() => {
        this.menuData.favorite = [...favorite]
      })
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
    }
  }
}
</script>
