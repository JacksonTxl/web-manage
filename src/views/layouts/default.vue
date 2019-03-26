<template>
  <a-layout class="layout-default">
    <a-layout-sider>
      <div class="sider">
        <div class="brand-box">
          <div class="brand-box__logo">
            <img class="brand-box__logo-img"
              src="~@/assets/img/logo.png"
              alt="brand-logo">
            <img class='brand-box__badge-img'
              src='~@/assets/img/brand_badge.png'
              alt="brand-badge">
          </div>
        </div>

      </div>

    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <span class="header__title">
          创建门店
        </span>
        <div class="header__divider"></div>
        <a-breadcrumb class="header__breadcrumb"
          separator="-">
          <a-breadcrumb-item href>
            <router-link to='/'>
              <st-icon type='home'></st-icon>
            </router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item href>
            <router-link to='/'>首页</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item href>
            <router-link to='/shop/add'>创建门店</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </a-layout-header>
      <a-layout-content>
        <div class="content">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer>
        Styd ©2019 Created
      </a-layout-footer>

    </a-layout>

  </a-layout>
</template>
