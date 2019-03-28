<template>
  <a-layout class="layout-default-brand">
    <a-layout-sider class="layout-default-brand-sider">
      <div class="layout-default-brand-sider__brand">
        <div class="layout-default-brand-sider__logo">
          <i></i>
        </div>
        <div class="layout-default-brand-sider__name">
          <span>STYD健身学院</span>
          <st-icon type="arrow-right"></st-icon>
        </div>
      </div>
      <div class="layout-default-brand-sider__scrollbox">
        <div class="layout-default-brand-sider__often">
          <h2 class="layout-default-brand-sider__often-title">常用</h2>
          <ul class="layout-default-brand-sider__often-list">
            <li
              class="layout-default-brand-sider__often-item layout-default-brand-sider__often-item--active"
            >
              <i></i>
              <span>营销插件</span>
            </li>
            <li class="layout-default-brand-sider__often-item">
              <i></i>
              <span>活动列表</span>
            </li>
          </ul>
        </div>
        <!-- <a-menu
          class="layout-default-brand-sider__menu"
          :openKeys="openKeys"
          @openChange="onOpenChange"
          theme="dark"
          mode="inline"
        > -->
        <a-menu
          class="layout-default-brand-sider__menu"
          :openKeys="openKeys"
          @openChange="onOpenChange"
          theme="light"
          mode="inline"
        >
          <a-menu-item key="item1">
            <span>
              <a-icon type="file"/>
              <span>首页</span>
            </span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="file"/>
              <span>营销中心</span>
            </span>
            <a-menu-item key="item2">Option 1</a-menu-item>
            <a-menu-item key="item3">Option 2</a-menu-item>
            <a-menu-item key="item4">Option 3</a-menu-item>
            <a-menu-item key="item5">Option 4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="file"/>
              <span>营销中心1</span>
            </span>
            <a-menu-item key="item6">Option 1</a-menu-item>
            <a-menu-item key="item7">Option 2</a-menu-item>
            <a-menu-item key="item8">Option 3</a-menu-item>
            <a-menu-item key="item9">Option 4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="file"/>
              <span>营销中心1</span>
            </span>
            <a-menu-item key="item10">Option 1</a-menu-item>
            <a-menu-item key="item11">Option 2</a-menu-item>
            <a-menu-item key="item12">Option 3</a-menu-item>
            <a-menu-item key="item13">Option 4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title">
              <a-icon type="file"/>
              <span>营销中心1</span>
            </span>
            <a-menu-item key="item15">Option 1</a-menu-item>
            <a-menu-item key="item16">Option 2</a-menu-item>
            <a-menu-item key="item17">Option 3</a-menu-item>
            <a-menu-item key="item18">Option 4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub5">
            <span slot="title">
              <a-icon type="file"/>
              <span>营销中心1</span>
            </span>
            <a-menu-item key="item19">Option 1</a-menu-item>
            <a-menu-item key="item20">Option 2</a-menu-item>
            <a-menu-item key="item21">Option 3</a-menu-item>
            <a-menu-item key="item22">Option 4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub6">
            <span slot="title">
              <a-icon type="file"/>
              <span>营销中心1</span>
            </span>
            <a-menu-item key="item23">Option 1</a-menu-item>
            <a-menu-item key="item24">Option 2</a-menu-item>
            <a-menu-item key="item25">Option 3</a-menu-item>
            <a-menu-item key="item26">Option 4</a-menu-item>
          </a-sub-menu>
        </a-menu>
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
              <st-icon type="home" color="#fff"/>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <span class="layout-default-brand-body__breadtext">首页</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <span class="layout-default-brand-body__breadtext">创建门店</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="layout-default-brand-body__personal">
          <!-- <a-badge dot>
            <st-icon type="bell" size="20px"/>
          </a-badge> -->
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
                  <st-icon type="inbox"></st-icon>
                  <span>切换品牌</span>
                </a-menu-item>
                <a-menu-item class="layout-default-brand-body__options">
                  <st-icon type="inbox"></st-icon>
                  <span>中文 / English</span>
                </a-menu-item>
                <a-menu-divider />
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
export default {
  data() {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'],
      openKeys: ['sub1']
    }
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      )
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
  }
}
</script>
