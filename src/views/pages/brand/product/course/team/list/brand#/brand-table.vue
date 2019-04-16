<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="id"
      :columns="columns"
      :dataSource="teamCourseList"
      :scroll="{ x: 1300}"
      @change="onChange"
    >
    <a-rate slot="strength_level" slot-scope="strength_level" :defaultValue="strength_level" disabled />
      <div slot="action" slot-scope="record">
        <modal-link tag="a" :to="{name:'test'}">打开</modal-link>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确认删除该权限么?" @confirm="onDelete(record.id)">
          <a>删除</a>
        </a-popconfirm>
        <st-more-dropdown style="margin-left: 12px;">
          <a-menu-item>转让</a-menu-item>
          <a-menu-item>出售</a-menu-item>
          <a-menu-item>你好</a-menu-item>
        </st-more-dropdown>
      </div>
    </st-table>

</div>

</template>

<script>
import { columns } from './brand.config'
export default {
  name: 'TeamTableBrand',
  data() {
    return {
      columns,
      selectedRowKeys: []
    }
  },
  props: {
    teamCourseList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChange() {

    }
  }
}
</script>

<style scoped>

</style>
