<template>
  <st-panel app>
    <div class="sg">
      <a-back-top />
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
              <a-anchor-link href="#switch" title="switch 开关"></a-anchor-link>
              <a-anchor-link href="#icon" title="icon 图标"></a-anchor-link>
              <a-anchor-link href="#hr" title="hr 分割线"></a-anchor-link>
              <a-anchor-link href="#checkbox-button" title="checkbox-button 复选按钮组"></a-anchor-link>
              <a-anchor-link href="#checkbox-facility" title="checkbox-facility 复选设施"></a-anchor-link>
              <a-anchor-link href="#more-dropdown" title="more-dropdown 更多"></a-anchor-link>
              <a-anchor-link href="#modal" title="modal 模态窗"></a-anchor-link>
              <a-anchor-link href="#help-popover" title="help-popover 帮助气泡"></a-anchor-link>
              <a-anchor-link href="#help-tooltip" title="help-tooltip 帮助tooltip"></a-anchor-link>
              <a-anchor-link href="#tag" title="tag 标签"></a-anchor-link>
              <a-anchor-link href="#initials-tag" title="initials tag 标签(首字母)"></a-anchor-link>
              <a-anchor-link href="#region-cascader" title="region-cascader 地址选择"></a-anchor-link>
              <a-anchor-link href="#container" title="container 容器"></a-anchor-link>
              <a-anchor-link href="#panel" title="panel 应用面板"></a-anchor-link>
              <a-anchor-link href="#image-upload" title="image-upload 图片上传"></a-anchor-link>
              <a-anchor-link href="#info" title="info 信息展示"></a-anchor-link>
              <a-anchor-link href="#form" title="form 表单"></a-anchor-link>
              <a-anchor-link href="#table" title="table 数据表格"></a-anchor-link>
              <a-anchor-link href="#form-table" title="form-table 纯样式表格"></a-anchor-link>
              <a-anchor-link href="#shop-hour-picker" title="shop-hour-picker 门店时间"></a-anchor-link>
              <a-anchor-link href="#pagination" title="pagination 分页"/>
              <a-anchor-link href="#page-route-nav" title="page route nav页面导航"/>
              <a-anchor-link href="#textarea" title="textarea"/>
              <a-anchor-link href="#hour-picker" title="hourpicker 多时间段选择"/>
            </a-anchor>
          </li>
          <li>
            <router-link to="/styleguide/service">Servie(服务)</router-link>
          </li>
          <li>
            <router-link to="/styleguide/plugin">Plugin(插件)</router-link>
          </li>
          <li>
            <router-link to="/styleguide/function">Function(函数)</router-link>
          </li>
          <li>
            <router-link to="/styleguide/chart">Chart(图表)</router-link>
          </li>
        </ul>
      </aside>
      <main class="sg__main">
        <router-view></router-view>
      </main>
    </div>
  </st-panel>
</template>
