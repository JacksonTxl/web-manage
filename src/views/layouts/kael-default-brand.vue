<template>
  <a-layout class="layout-default-brand">
    <a-layout-sider class="layout-default-brand-sider">
      <div class="layout-default-brand-sider__brand">
        <div class="layout-default-brand-sider__logo">
          <i></i>
        </div>
        <div class="layout-default-brand-sider__name">
          <span>STYD健身学院</span>
          <i></i>
        </div>
      </div>
      <div class="layout-default-brand-sider__often">
        <h2 class="layout-default-brand-sider__often-title">常用</h2>
        <ul class="layout-default-brand-sider__often-list">
          <li class="layout-default-brand-sider__often-item layout-default-brand-sider__often-item--active">
            <i></i>
            <span>营销插件</span>
          </li>
          <li class="layout-default-brand-sider__often-item">
            <i></i>
            <span>活动列表</span>
          </li>
        </ul>
      </div>
      <a-menu class="layout-default-brand-sider___menu" theme="dark" mode="inline">
        <a-menu-item key="sub1">
          <span><a-icon type="file" /><span>首页</span></span>
        </a-menu-item>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="file" /><span>营销中心</span></span>
          <a-menu-item key="1">Option 1</a-menu-item>
          <a-menu-item key="2">Option 2</a-menu-item>
          <a-menu-item key="3">Option 3</a-menu-item>
          <a-menu-item key="4">Option 4</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="file" /><span>营销中心1</span></span>
          <a-menu-item key="11">Option 1</a-menu-item>
          <a-menu-item key="22">Option 2</a-menu-item>
          <a-menu-item key="33">Option 3</a-menu-item>
          <a-menu-item key="44">Option 4</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout class="layout-default-brand-body">
      <a-layout-header class="layout-default-brand-body__header">
        header
      </a-layout-header>
      <a-layout-content class="layout-default-brand-body__content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="layout-default-brand-body__footer">
        Styd ©2019 Created
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
