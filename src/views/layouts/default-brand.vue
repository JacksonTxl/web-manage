<template>
  <a-layout class="layout-default-brand">
    <a-layout-sider class="layout-default-brand-sider">
      <div class="layout-default-brand-sider__brand">
        <div class="layout-default-brand-sider__logo">
          <i class="layout-default-brand-sider__certification st-icon-certified"></i>
        </div>
        <div class="layout-default-brand-sider__name">
          <span>STYD健身学院</span>
          <st-icon type="arrow-right"></st-icon>
        </div>
      </div>
      <div class="layout-default-brand-sider__scrollbox" v-scrollBar>
        <default-brand-sider-menu/>
      </div>
    </a-layout-sider>
    <a-layout class="layout-default-brand-body">
      <a-layout-header class="layout-default-brand-body__header">
        <div class="layout-default-brand-body__location">
          <h2>创建门店</h2>
          <span class="layout-default-brand-body__line"></span>
          <a-breadcrumb separator="-">
            <a-breadcrumb-item>
              <!-- <st-icon type="home"/> -->
              <router-link to="/brand/">
                <st-icon type="home" color="#fff"/>
              </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item v-for='b in breadcrumbs' :key="b.label">
              <router-link :to='b.route'>
                <span class="layout-default-brand-body__breadtext">{{b.label}}</span>
              </router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="layout-default-brand-body__personal">
          <!-- <a-badge dot>
            <st-icon type="bell" size="20px"/>
          </a-badge>-->
          <a-badge dot>
            <st-icon type="bell" size="20px" color="red"/>
          </a-badge>
          <a-dropdown :trigger="['click']" placement="bottomRight">
            <div class="layout-default-brand-body__avatar">
              <img src="~@/assets/img/avatar_default.png" width="32" height="32" alt="avatar">
            </div>
            <div slot="overlay" class="layout-default-brand-body__dropdown">
              <div class="layout-default-brand-body__username">
                <p class="layout-default-brand-body__name">Elaine</p>
                <p class="layout-default-brand-body__mobile">18101881916</p>
              </div>
              <a-menu>
                <a-menu-item class="layout-default-brand-body__options">
                  <st-icon type="inbox"></st-icon>
                  <span>账号安全</span>
                </a-menu-item>
                <a-menu-item class="layout-default-brand-body__options">
                  <modal-link tag="a" :to="{ name: 'brand-switch' }">
                    <st-icon type="inbox"></st-icon>
                    <span>切换品牌</span>
                  </modal-link>
                </a-menu-item>
                <a-menu-item class="layout-default-brand-body__options">
                  <st-icon type="inbox"></st-icon>
                  <span>中文 / English</span>
                </a-menu-item>
                <a-menu-divider/>
                <a-menu-item class="layout-default-brand-body__options">
                  <st-icon type="inbox"></st-icon>
                  <span>退出</span>
                </a-menu-item>
              </a-menu>
            </div>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="layout-default-brand-body__content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="layout-default-brand-body__footer">Copyright &#169; 2019 三体云智能科技有限公司</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import { LayoutBrandService } from '@/services/layouts/layout-brand.service'
import DefaultBrandSiderMenu from './default-brand-sider-menu'
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
  components: {
    DefaultBrandSiderMenu
  }
}
</script>
