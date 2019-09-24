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
        <component
          v-for="demo in demos"
          :key="demo.id"
          :id="demo.id"
          :is="'demo-' + demo.id"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import demoComponents from './component#/index'
console.log(demoComponents)
export default {
  components: demoComponents,
  computed: {
    demos() {
      return [
        { id: 'alert', title: '提示' },
        { id: 'title', title: '标题' },
        { id: 'button', title: '按钮' },
        { id: 'switch', title: '开关' },
        { id: 'icon', title: '图标' },
        { id: 'hr', title: '分割线' },
        { id: 'input-number', title: '数字输入' },
        { id: 'input-search', title: '搜索框' },
        { id: 'checkbox-button', title: '复选按钮组' },
        { id: 'recent-radio-group', title: '报表raido组' },
        { id: 'range-picker', title: '时间范围选择' },
        { id: 'more-dropdown', title: '更多' },
        { id: 'modal', title: '模态窗' },
        { id: 'help-popover', title: '帮助气泡' },
        { id: 'tag', title: '标签' },
        { id: 'search-panel', title: '查询面板' },
        { id: 'no-data', title: '默认占位图' },
        { id: 'overflow-text', title: '超限内容容器' },
        { id: 'initials-tag', title: '首字母标签' },
        { id: 'region-cascader', title: '城市选择' },
        { id: 'container', title: '容器' },
        { id: 'panel', title: '应用面板' },
        { id: 'info', title: '信息展示' },
        { id: 'info-action', title: '信息操作' },
        { id: 'popconfirm', title: '删除确认' },
        { id: 'form', title: '表单' },
        { id: 'table-actions', title: '表格操作' },
        { id: 'table', title: '数据表格' },
        { id: 'form-table', title: '纯样式表格' },
        { id: 'pagination', title: '分页' },
        { id: 'page-route-nav', title: '页面路由导航' },
        { id: 'textarea', title: '文本域' }
      ]
    }
  }
}
</script>
