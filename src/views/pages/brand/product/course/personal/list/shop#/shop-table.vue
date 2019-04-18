<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="id"
      :alertSelection="{onReset: start}"
      :columns="columns"
      :dataSource="personalCourseList"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :scroll="{ x: 1300}"
      @change="onChange"
    >
      <div slot="action">
        <modal-link tag="a" :to="{name:'test'}">查看</modal-link>
      </div>
    </st-table>

</div>

</template>

<script>
import { columns } from './shop.config'
export default {
  name: 'ShopSaleListTable',
  data() {
    return {
      columns,
      selectedRowKeys: []
    }
  },
  props: {
    personalCourseList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    start() {
      this.selectedRowKeys = []
    },
    onChange() {

    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style scoped>

</style>
