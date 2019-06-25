<template>
  <a-layout class="layout-default">
    <a-layout-sider class="layout-default-sider">
      <div class="layout-default-sider__brand">
        <div class="layout-default-sider__logo">
          <i class="layout-default-sider__certification st-icon-certified"></i>
        </div>
        <div class="layout-default-sider__name cursor-pointer" @click="switchShop">
          <span>STYD健身学院</span>
          <st-icon type="arrow-right"></st-icon>
        </div>
      </div>
      <div class="layout-default-sider__scrollbox" v-scrollBar>
        <default-sider-menu/>
      </div>
    </a-layout-sider>
    <a-layout class="layout-default-body">
      <a-layout-header class="layout-default-body__header">
        <div class="layout-default-body__location">
          <h2>创建门店</h2>
          <span class="layout-default-body__line"></span>
          <a-breadcrumb separator="-">
            <a-breadcrumb-item>
              <router-link to="/brand/">
                <st-icon type="home" class="layout-default-body__icon"/>
              </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item v-for='b in breadcrumbs' :key="b.label">
              <router-link :to='b.route'>
                <span class="layout-default-body__breadtext">{{b.label}}</span>
              </router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="layout-default-body__personal">
          <!-- <a-badge dot>
            <st-icon type="home" class="layout-default-body__icon"/>
          </a-badge>
          <a-badge>
            <st-icon type="home" class="layout-default-body__icon"/>
          </a-badge> -->
          <a-dropdown :trigger="['click']" placement="bottomRight">
            <div class="layout-default-body__avatar">
              <img src="~@/assets/img/avatar_default.png" width="32" height="32" alt="avatar">
            </div>
            <div slot="overlay" class="layout-default-body__dropdown">
              <div class="layout-default-body__username">
                <p class="layout-default-body__name">Elaine</p>
                <p class="layout-default-body__mobile">18101881916</p>
              </div>
              <a-menu>
                <a-menu-item class="layout-default-body__options">
                  <st-icon type="safety"></st-icon>
                  <span>账号安全</span>
                </a-menu-item>
                <a-menu-item class="layout-default-body__options">
                  <modal-link tag="a" :to="{ name: 'brand-switch' }">
                    <st-icon type="switch"></st-icon>
                    <span>切换品牌</span>
                  </modal-link>
                </a-menu-item>
                <a-menu-divider/>
                <a-menu-item  @click="onClickLogout" class="layout-default-body__options">
                  <st-icon type="logout"></st-icon>
                  <span>退出</span>
                </a-menu-item>
              </a-menu>
            </div>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="layout-default-body__content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="layout-default-body__footer">Copyright &#169; 2019 三体云智能科技有限公司</a-layout-footer>
    </a-layout>
    <switch-shop v-model="isShowSwitchShop"></switch-shop>
  </a-layout>
</template>
<script>
import { LayoutBrandService } from '@/services/layouts/layout-brand.service'
import DefaultSiderMenu from './default-sider-menu'
import SwitchShop from '@/views/fragments/shop/switch'
import Cookie from 'js-cookie'
export default {
  serviceInject() {
    return {
      layoutBrandSerivce: LayoutBrandService
    }
  },
  rxState() {
    return {
      breadcrumbs: this.layoutBrandSerivce.breadcrumbs$
    }
  },
  data() {
    return {
      isShowSwitchShop: false
    }
  },
  components: {
    DefaultSiderMenu,
    SwitchShop
  },
  methods: {
    switchShop() {
      this.isShowSwitchShop = true
    },
    onClickLogout() {
      Cookie.set('saas-token', '')
      location.reload()
    }
  }
}
</script>
