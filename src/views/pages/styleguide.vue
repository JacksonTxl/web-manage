<template>
  <st-panel app>
    <div class="sg">
      <aside>
        <ul class="sg__sider">
          <li>
            <router-link to="/styleguide/basic">Basic(基础类)</router-link>
          </li>
          <li>
            <router-link to="/styleguide/form">Form(表单类)</router-link>
          </li>
          <li>
            <router-link to="/styleguide/container">Container(容器类)</router-link>
          </li>
          <li>
            <router-link to="/styleguide/table">Table(表格)</router-link>
          </li>
          <li>
            <router-link to="/styleguide/modal">Modal(模态窗类)</router-link>
          </li>
          <li>
            <router-link to="/styleguide/business">Business(业务组件)</router-link>
          </li>
          <li>
            <router-link to="/styleguide/oss">OSS上传service使用示例</router-link>
          </li>
          <li>
            <router-link to="/styleguide/plugins">plugins(插件)</router-link>
          </li>
          <li>
            <router-link to="/styleguide/slider">slider(滑动条)</router-link>
          </li>
        </ul>
      </aside>
      <main class="sg__main">
        <router-view></router-view>
      </main>
    </div>
  </st-panel>
</template>
