<template>
  <div class="layout-default" :class="theme">
    <aside class="layout-default-sider">
      <!-- 门店维度下 -->
      <div class="layout-default-sider__shop" v-if="isInShop">
        <div class="layout-default-sider__shop-top">
          <div class="layout-default-sider__logo">
            <img
              width="100%"
              height="100%"
              :src="shop.logo | imgFilter({ w: 128, h: 128 })"
              alt="logo"
            />
            <!-- <i class="layout-default-sider__certification st-icon-certified"></i> -->
          </div>
          <div class="layout-default-sider__shop-brand-name">
            {{ brand.name }}
          </div>
        </div>
        <div
          class="layout-default-sider__name cursor-pointer"
          @click="switchShop"
        >
          <span>{{ shop.name }}</span>
          <st-icon
            type="arrow-right"
            class="layout-default-sider__arrow"
          ></st-icon>
        </div>
      </div>
      <!-- 品牌维度下 -->
      <div class="layout-default-sider__brand" v-else>
        <div class="layout-default-sider__logo">
          <img
            width="100%"
            height="100%"
            :src="brand.logo | imgFilter({ w: 96, h: 96 })"
            alt="logo"
          />
          <!-- <i class="layout-default-sider__certification st-icon-certified"></i> -->
        </div>
        <div
          class="layout-default-sider__name cursor-pointer"
          @click="switchShop"
        >
          <span>{{ brand.name }}</span>
          <st-icon
            type="arrow-right"
            class="layout-default-sider__arrow"
          ></st-icon>
        </div>
      </div>
      <div
        class="layout-default-sider__scrollbox"
        v-scrollBar
        @click="onClickSiderMenu"
      >
        <default-sider-menu @change="onSiderMenuChange" />
      </div>
    </aside>
    <header class="layout-default-body__header">
      <div class="layout-default-body__location">
        <template v-if="title">
          <h2>{{ title }}</h2>
          <span class="layout-default-body__line"></span>
        </template>
        <a-breadcrumb separator="-">
          <a-breadcrumb-item>
            <router-link to="/">
              <st-icon type="home" class="layout-default-body__icon" />
            </router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-for="b in breadCrumbs" :key="b.label">
            <router-link :to="b.route" v-if="b.label && b.route.name">
              <span class="layout-default-body__breadtext">{{ b.label }}</span>
            </router-link>
            <span v-if="!b.route.name" class="layout-default-body__breadtext">
              {{ b.label }}
            </span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="layout-default-body__personal">
        <!-- <a-badge dot>
          <st-icon type="home" class="layout-default-body__icon"/>
        </a-badge> -->
        <!-- <a-dropdown :trigger="['click']" placement="bottomRight">
          <div class="layout-default-body__top-item">
            <st-icon type="square" class="layout-default-body__icon"/>
          </div>
          <div slot="overlay" class="layout-default-body__fast-entry">
            <fast-entry/>
          </div>
        </a-dropdown> -->
        <a-dropdown :trigger="['click']" placement="bottomRight">
          <div class="layout-default-body__avatar">
            <img
              :src="user.avatar | imgFilter({ w: 64, h: 64 })"
              width="32"
              height="32"
              alt="avatar"
            />
          </div>
          <div slot="overlay" class="layout-default-body__dropdown">
            <div class="layout-default-body__username">
              <p class="layout-default-body__name">{{ user.name }}</p>
              <p class="layout-default-body__mobile">{{ user.mobile }}</p>
            </div>
            <a-menu>
              <!-- <a-menu-item class="layout-default-body__options">
                  <st-icon type="safety"></st-icon>
                  <span>账号安全</span>
              </a-menu-item>-->
              <!-- <a-menu-item class="layout-default-body__options">
                  <a v-modal-link="{ name: 'brand-switch' }">
                    <st-icon type="switch"></st-icon>
                    <span>切换品牌</span>
                  </a>
              </a-menu-item>-->
              <!-- <a-menu-divider/> -->
              <a-menu-item
                @click="onClickLogout"
                class="layout-default-body__options"
              >
                <st-icon type="logout"></st-icon>
                <span>退出</span>
              </a-menu-item>
            </a-menu>
          </div>
        </a-dropdown>
      </div>
    </header>
    <main class="layout-default-body">
      <article class="layout-default-body__content">
        <router-view></router-view>
      </article>
      <footer class="layout-default-body__footer">
        Copyright &#169; 2019 三体云智能科技有限公司
      </footer>
    </main>
    <switch-shop v-model="isShowSwitchShop"></switch-shop>
  </div>
</template>
<script>
import DefaultSiderMenu from './default#sider-menu'
import SwitchShop from '@/views/fragments/shop/switch'
import routes from '@/router/routes'
import { find } from 'lodash-es'
import { UserService } from '@/services/user.service'
import { TokenService } from '@/services/token.service'
import { TitleService } from '@/services/title.service'
// import FastEntry from './entry#/fast-entry'

export default {
  serviceInject() {
    return {
      userService: UserService,
      tokenService: TokenService,
      titleService: TitleService
    }
  },
  rxState() {
    return {
      user: this.userService.user$,
      brand: this.userService.brand$,
      shop: this.userService.shop$,
      theme: this.userService.theme$,
      title: this.titleService.title$
    }
  },
  data() {
    return {
      isShowSwitchShop: false,
      menuObj: {}
    }
  },
  computed: {
    breadCrumbs() {
      const menuBreadCrumb = this.getSiderMenuBreadCrumb()
      const parentBreadCrumb = this.getParentBreadCrumb()
      return [...menuBreadCrumb, ...parentBreadCrumb]
    },
    isInShop() {
      return this.shop.id
    }
  },
  methods: {
    switchShop() {
      this.isShowSwitchShop = !this.isShowSwitchShop
    },
    onClickLogout() {
      this.tokenService.REMOVE_TOKEN()
      location.href = '/account/login'
    },
    getParentBreadCrumb() {
      const parentId = this.$route.meta.parentId
      let parentRoute
      if (parentId) {
        parentRoute = this.$router.resolve({
          name: parentId
        }).resolved
      }
      if (parentRoute) {
        const name = parentRoute.name
        const title = parentRoute.meta.title
        return [
          {
            label: title,
            route: {
              name
            }
          }
        ]
      } else {
        return []
      }
    },
    getSiderMenuBreadCrumb() {
      const { selectedKey, currentSiderMenu } = this.menuObj
      if (selectedKey) {
        const menuBreadCrumb = []
        menuBreadCrumb.push({
          label: currentSiderMenu.name,
          route: {
            name: currentSiderMenu.url
          }
        })
        if (selectedKey) {
          const currentSubMenu = find(currentSiderMenu.children, subMenu => {
            return subMenu.id === selectedKey
          })
          if (currentSubMenu) {
            menuBreadCrumb.push({
              label: currentSubMenu.name,
              route: {
                name: currentSubMenu.url
              }
            })
          }
        }
        return menuBreadCrumb
      } else {
        return []
      }
    },
    onSiderMenuChange(menuObj) {
      this.menuObj = menuObj
    },
    onClickSiderMenu() {
      /**
       * 切换路由时关闭切换门店 drawer
       */
      this.isShowSwitchShop = false
    }
  },
  components: {
    DefaultSiderMenu,
    SwitchShop
    // FastEntry
  }
}
</script>
