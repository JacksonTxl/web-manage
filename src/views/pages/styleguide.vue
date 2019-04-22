<template>
  <st-panel app>
    <div class="sg">
      <aside>
        <ul class="sg__sider">
          <li>
            <router-link to="/styleguide/class">Class(全局样式类)</router-link>
            <a-anchor :offsetTop="100" v-if="$route.name==='styleguide-class'">
              <a-anchor-link href="#vars" title="vars 颜色定义"></a-anchor-link>
              <a-anchor-link href="#color" title="color 颜色"></a-anchor-link>
              <a-anchor-link href="#helpers" title="helpers 辅助类"></a-anchor-link>
              <a-anchor-link href="#components" title="components 组件类"></a-anchor-link>
            </a-anchor>
          </li>
          <li>
            <router-link to="/styleguide/component">Component(组件)</router-link>
            <a-anchor :offsetTop="112" v-if="$route.name==='styleguide-component'">
              <a-anchor-link href="#title" title="title 标题"></a-anchor-link>
              <a-anchor-link href="#button" title="button 按钮"></a-anchor-link>
              <a-anchor-link href="#icon" title="icon 图标"></a-anchor-link>
              <a-anchor-link href="#panel" title="panel 应用面板"></a-anchor-link>
              <a-anchor-link href="#btn" title="btn 按钮"></a-anchor-link>
              <a-anchor-link href="#btn" title="btn 按钮"></a-anchor-link>
              <a-anchor-link href="#btn" title="btn 按钮"></a-anchor-link>
              <a-anchor-link href="#btn" title="btn 按钮"></a-anchor-link>
            </a-anchor>
          </li>
          <li>
            <router-link to="/styleguide/template">Template(模版)</router-link>
          </li>
          <li>
            <router-link to="/styleguide/service">Servie(服务)</router-link>
          </li>
          <li>
            <router-link to="/styleguide/plugin">Plugin(插件)</router-link>
          </li>
        </ul>
      </aside>
      <main class="sg__main">
        <router-view></router-view>
      </main>
    </div>
  </st-panel>
</template>
