<template>
  <a-layout class="layout-default">
    <a-layout-sider>
      hello

    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <span class="header__title">
          创建门店
        </span>
        <div class="header__divider"></div>
        <a-breadcrumb class="header__breadcrumb"
          separator="-">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item href="">Application Center</a-breadcrumb-item>
          <a-breadcrumb-item href="">Application List</a-breadcrumb-item>
          <a-breadcrumb-item>An Application</a-breadcrumb-item>
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
