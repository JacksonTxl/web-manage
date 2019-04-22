<template>
  <div>
    <h2>Class 全局样式类</h2>
    <section id="vars" class="sg-section">
      <h4>vars 颜色定义</h4>
      <st-container type="1">
        <div class="sg-box sg-box--primary">@primary-color 主要</div>
        <div class="sg-box sg-box--warning">@warning-color</div>
        <div class="sg-box sg-box--success">@success-color</div>
        <div class="sg-box sg-box--error">@error-color</div>
        <div class="sg-box sg-box--border">@border-color 边框</div>
        <div class="sg-box sg-box--title">@title 标题</div>
        <div class="sg-box sg-box--text">@text 文字</div>
        <div class="sg-box sg-box--text-light">@text-light 淡色文字</div>
        <div class="sg-box sg-box--divider color-title">@divider 分割线</div>
      </st-container>
    </section>

    <section id="color" class="sg-section">
      <h4>color 颜色类</h4>
      <st-container type="1">
        <span class="color-title">.color-title</span>
        <span class="color-text mg-l16">.color-text</span>
        <span class="color-text-light mg-l16">.color-text-light</span>
        <div class="sg-box bordered color-title">.bordered</div>
      </st-container>
    </section>

    <section id="helpers" class="sg-section">
      <h4>helpers 辅助类</h4>
      <st-container type="1">
        <p>
          <span>.ta-l (text-align: left)</span>
          <span class="mg-l16">.ta-c (text-align: center)</span>
          <span class="mg-l16">.ta-r (text-align: right)</span>
          <span class="mg-l16">.fl-r (float: right)</span>
        </p>
        <p>
          <span class="cursor-pointer">cursor-pointer</span>
        </p>
        <p>
          <span class="full-width" style="background: #ccc">.full-width(this is a inline element)</span>
        </p>
        <p>
          <span class="tablefix" href="#">.tablefix 修复ant-design表格组件的样式问题，放置于a-table父级容器即可</span>
        </p>
      </st-container>
    </section>

    <section id='components' class="sg-section">
      <h4>components 组件型全局类样式 命名空间为.st</h4>
      <st-container type="1">
        <p>
          <a class="st-link-secondary" href="#">.st-link-secondary 次级链接效果</a>
        </p>
        <p>
          .st-preview-item 悬浮放大效果
          <span class="st-preview-item" v-viewer>
            <img
              :src="'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg' | imgFilter({ w: 100, h: 56 })"
              :data-src="'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg' | imgFilter({ w: 1000 })"
            >
          </span>
        </p>
      </st-container>
    </section>
  </div>
</template>

<script>
import { imgFilter } from '@/filters/resource.filters'
export default {
  filters: {
    imgFilter
  }
}
</script>
