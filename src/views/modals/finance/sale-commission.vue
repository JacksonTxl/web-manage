<template>
  <st-modal title="销售提成" v-model="show" :footer="null">
    <a-row :gutter="8">
        <a-col :lg="12">销售业绩：335元</a-col>
        <a-col :lg="12">提成比例：20%</a-col>
    </a-row>
    <a-row :gutter="8" class="mg-t16 mg-b24">
        <a-col :lg="24">销售提成：4322元</a-col>
    </a-row>
    <a-row :gutter="8" >
        <a-col :lg="24">
            <st-table :columns="saleColumns" :dataSource="list" :pagination="pagination" @change="pageChange" />
        </a-col>
    </a-row>
    <a-row :gutter="8" >
        <a-col :lg="24" style="text-align:right;">
           <st-button type="primary"  @click="onExportList" :disabled="list.length > 0 ? false: true">批量导出</st-button>
        </a-col>
    </a-row>
  </st-modal>
</template>

<script>
import { saleColumns } from './columns'
export default {
  data() {
    return {
      show: false,
      list: [{
        q: '2019-04-03 18:56',
        w: '2019-04-03 18:56',
        e: 'xxx',
        r: 'xxx',
        t: 1233,
        y: 2323,
        u: 123
      }],
      saleColumns,
      pagination: {
        defaultPageSize: 10
      }
    }
  },
  methods: {
    pageChange(pagination) {

    },
    onExportList() {

    }

  }
}
</script>
