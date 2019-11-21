<template>
  <div>
    <h2>Component 组件类（全局引入）命名空间st-</h2>
    <p>
      组件具体的使用方式还是需要查看@/views/components/*.vue
      对应文件查看最新的api，这里只是列举常用选项
    </p>
    <div class="sg">
      <div class="sg__sider">
        <a-anchor :offsetTop="160">
          <a-anchor-link
            v-for="demo in demos"
            :key="demo.id"
            :href="'#' + demo.id"
            :title="demo.id + ' ' + demo.title"
          ></a-anchor-link>
        </a-anchor>
      </div>
      <div class="sg__main">
        <section
          class="sg-section"
          v-for="demo in demos"
          :key="demo.id"
          :id="demo.id"
        >
          <h3>
            {{ demo.id }} {{ demo.title }}
            <a @click="onShowCode(demo)">查看代码</a>
          </h3>

          <component :is="'demo-' + demo.id"></component>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import demoComponents from './component#/index'
console.log(demoComponents)
export default {
  components: demoComponents,
  methods: {
    onShowCode(demo) {
      let id = demo.id.replace('st-', '')
      fetch(`/_editor?file=src/views/pages/styleguide/component%23/${id}.vue`)
    }
  },
  computed: {
    demos() {
      return [
        { id: 'st-title', title: '标题' },
        { id: 'st-button', title: '按钮' },
        { id: 'st-switch', title: '开关' },
        { id: 'st-icon', title: '图标' },
        { id: 'st-hr', title: '分割线' },
        { id: 'st-input-number', title: '数字输入' },
        { id: 'st-input-search', title: '搜索框' },
        { id: 'st-panel', title: '应用面板' },
        { id: 'st-panel-layout', title: '应用面板' },
        { id: 'st-search-panel', title: '查询面板' },
        { id: 'st-alert', title: '提示' },
        { id: 'st-checkbox-button', title: '复选按钮组' },
        { id: 'st-recent-radio-group', title: '报表raido组' },
        { id: 'st-btn-actions', title: '按钮操作组' },
        { id: 'st-image-upload', title: '图片上传' },
        { id: 'st-range-picker', title: '时间范围选择' },
        { id: 'st-more-dropdown', title: '更多' },
        { id: 'st-modal', title: '模态窗' },
        { id: 'st-help-popover', title: '帮助气泡' },
        { id: 'st-tag', title: '标签' },
        { id: 'st-text', title: '状态文本' },
        { id: 'st-pop-container', title: '带小三角容器' },
        { id: 'st-plugin-form-title', title: '插件标题' },
        { id: 'st-no-data', title: '默认占位图' },
        { id: 'st-overflow-text', title: '超限内容容器' },
        { id: 'st-initials-tag', title: '首字母标签' },
        { id: 'st-region-cascader', title: '城市选择' },
        { id: 'st-container', title: '容器' },
        { id: 'st-info', title: '信息展示' },
        { id: 'st-info-action', title: '信息操作' },
        { id: 'st-popconfirm', title: '删除确认' },
        { id: 'st-form', title: '表单' },
        { id: 'st-table-actions', title: '表格操作' },
        { id: 'st-table', title: '数据表格' },
        { id: 'st-form-table', title: '纯样式表格' },
        { id: 'st-pagination', title: '分页' },
        { id: 'st-page-route-nav', title: '页面路由导航' },
        { id: 'st-image', title: '图片' },
        { id: 'st-mina-panel', title: '小程序设置预览布局' },
        { id: 'st-textarea', title: '文本域' }
      ]
    }
  }
}
</script>
