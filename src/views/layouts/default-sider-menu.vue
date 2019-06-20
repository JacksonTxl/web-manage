<template>
  <div>
    <div v-if="favor.length" class="layout-default-sider__often">
      <h2 class="layout-default-sider__often-title">常用</h2>
      <ul class="layout-default-sider__often-list">
        <!-- <li
          class="layout-default-sider__often-item layout-default-sider__often-item--active"
        >
          <i></i>
          <span>营销插件</span>
        </li> -->
        <li
          v-for="(item, index) in favor"
          :key="index"
          class="layout-default-sider__often-item"
        >
          <st-icon
            type="star"
            @click.native="delfavor(item.id)"
          />
          <router-link :to="{ name: item.url }">
            <span class="layout-default-sider__favor-title">{{item.name}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <a-menu
        class="layout-default-sider__menu"
        :openKeys.sync="openKeys"
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
                v-if="isfavor(subMenu.id)"
                type="star"
                @click.native="delfavor(subMenu.id)"
              />
              <st-icon
                v-else
                type="star"
                @click.native="addfavor(subMenu.id)"
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
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
import { treeToMap } from '@/utils/tree-to-map'
import { find as lodashFind } from 'lodash-es'
import { findPathWithTree } from '@/utils/find-path-with-tree'
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
    favor() {
      return this.menuData.favor || []
    },
    menuMap() {
      return treeToMap(this.menus)
    },
    rootSubmenuKeys() {
      return this.getRootSubmenuKeys()
    }
    // activeSiderMenuRouteName() {
    //   const findedSiderMenuRouteConfig = lodashFind(
    //     this.$route.matched,
    //     routeConfig => routeConfig.meta.siderMenuRouteName
    //   )
    //   if (!findedSiderMenuRouteConfig) {
    //     console.warn(
    //       `[layout-default] 路由[${
    //         this.$route.name
    //       }]或父级路由 未配置 siderMenuRouteName`
    //     )
    //     return ''
    //   }
    //   const siderMenuRouteName =
    //     findedSiderMenuRouteConfig.meta.siderMenuRouteName
    //   return siderMenuRouteName
    // }
  },
  created() {
    // console.log('created', this.menus)
    lodashFind(this.menus, menu => {
      return location.pathname.replace(/\//g, '-').indexOf(menu.url) !== -1
    })
    this.calcOpenKeys()
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
    calcOpenKeys() {
      this.openKeys = [28]
    },
    selectedKeysPath() {
      // const siderMenu = lodashFind(this.menus, {
      //   route_name: this.activeSiderMenuRouteName
      // })
      // if (!siderMenu) {
      //   console.warn(
      //     `[layout-default] can not find ${
      //       this.activeSiderMenuRouteName
      //     } in siderMenuTree,侧边栏菜单配置中找不到名称为 ${
      //       this.activeSiderMenuRouteName
      //     } 的菜单！`
      //   )
      //   return []
      // }
      // const menuId = siderMenu.id
      // const _selectedKeys = findPathWithTree(menuId, this.siderMenuTree)
      // return _selectedKeys
    },
    onClickMenuItem(menu) {
      // this.selectedKeys = [key]
      // const menu = this.menuMap[key]
      // if (this.$route.name.indexOf(menu.url) > -1) {
      //   return
      // }
      this.$router.push({
        name: menu.url
      })
      // this.addfavor(key)
    },
    addfavor(id) {
      this.userService.addfavor(id).subscribe(this.onMenuChange)
    },
    delfavor(id) {
      this.userService.delfavor(id).subscribe(this.onMenuChange)
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
    },
    isfavor(id) {
      return lodashFind(this.favor, { id })
    }
  }
}
</script>
