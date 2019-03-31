<template>
  <st-panel app>

    <h1>Styleguide</h1>
    <div>
      <router-link to="/styleguide/basic">Basic(基础类)</router-link>
      <router-link class="mg-l8"
        to="/styleguide/form">Form(表单类)</router-link>
      <router-link class="mg-l8"
        to="/styleguide/container">Container(容器类)</router-link>
      <router-link class="mg-l8"
        to="/styleguide/table">Table(表格)</router-link>
      <router-link class="mg-l8"
        to="/styleguide/business">Business(业务组件)</router-link>
      <router-link class="mg-l8"
        to="/styleguide/viewer">v-viewer(图片预览)</router-link>
    </div>
    <st-hr></st-hr>
    <router-view></router-view>

  </st-panel>
</template>
