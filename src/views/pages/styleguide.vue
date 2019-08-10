<template>
  <st-panel app>
    <div class="sg">
      <div class="sg__hd">
        <router-link :to="{ name: 'styleguide-class' }">
          Class(全局样式类)
        </router-link>
        <router-link class="mg-l8" :to="{ name: 'styleguide-component' }">
          Component(组件)
        </router-link>
        <router-link class="mg-l8" to="/styleguide/biz-component">
          业务组件biz-components
        </router-link>
        <router-link class="mg-l8" to="/styleguide/service">
          Servie(服务)
        </router-link>
        <router-link class="mg-l8" to="/styleguide/plugin">
          Plugin(插件)
        </router-link>
        <router-link class="mg-l8" to="/styleguide/function">
          Function(函数)
        </router-link>
        <router-link class="mg-l8" to="/styleguide/chart">
          Chart(图表)
        </router-link>
      </div>
      <div class="sg__bd">
        <a-back-top />
        <router-view></router-view>
      </div>
    </div>
  </st-panel>
</template>
