<template>
  <div style="padding:24px;background:#fff;min-height:100%;">
    <h2>styleguide</h2>
    <div>
      <router-link to='/styleguide/button'>Button(按钮)</router-link>
      <router-link class='mg-l8'
        to='/styleguide/icon'>Icon(图标)</router-link>
      <router-link class='mg-l8'
        to='/styleguide/form'>Form(表单类)</router-link>
      <router-link class='mg-l8'
        to='/styleguide/container'>Container(容器类)</router-link>
      <router-link class='mg-l8'
        to='/styleguide/table'>Table(表格)</router-link>
    </div>
    <router-view></router-view>

  </div>
</template>
