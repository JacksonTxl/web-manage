<template>
  <oa-modal title="上课提成" v-model="show" :footer="null">
    <a-row :gutter="8">
        <a-col :lg="12">上课节数：33节</a-col>
        <a-col :lg="12">课时费：159/节</a-col>
    </a-row>
    <a-row :gutter="8" class="mg-t16 mg-b24">
        <a-col :lg="24">上课提成：3323元</a-col>
    </a-row>
    <a-row :gutter="8" >
        <a-col :lg="24">
            <st-table :columns="classColumns" :dataSource="list" :pagination="pagination" @change="pageChange" :scroll="{x: 800,y:400}"/>
        </a-col>
    </a-row>
    <a-row :gutter="8" >
        <a-col :lg="24" style="text-align:right;">
           <st-button type="primary"  @click="onExportList" :disabled="list.length > 0 ? false: true">批量导出</st-button>
        </a-col>
    </a-row>
  </oa-modal>
</template>

<script>
import { classColumns } from './columns'
export default {
  data() {
    return {
      show: false,
      classColumns,
      list: [{
        q: '超人会飞课',
        w: '2019-04-03 18:56',
        e: '2019-04-03 18:56',
        r: 'XXX'
      }, {
        q: '超人会飞课',
        w: '2019-04-03 18:56',
        e: '2019-04-03 18:56',
        r: 'XXX'
      }, {
        q: '超人会飞课',
        w: '2019-04-03 18:56',
        e: '2019-04-03 18:56',
        r: 'XXX'
      }, {
        q: '超人会飞课',
        w: '2019-04-03 18:56',
        e: '2019-04-03 18:56',
        r: 'XXX'
      }, {
        q: '超人会飞课',
        w: '2019-04-03 18:56',
        e: '2019-04-03 18:56',
        r: 'XXX'
      }, {
        q: '超人会飞课',
        w: '2019-04-03 18:56',
        e: '2019-04-03 18:56',
        r: 'XXX'
      }, {
        q: '超人会飞课',
        w: '2019-04-03 18:56',
        e: '2019-04-03 18:56',
        r: 'XXX'
      }, {
        q: '超人会飞课',
        w: '2019-04-03 18:56',
        e: '2019-04-03 18:56',
        r: 'XXX'
      }, {
        q: '超人会飞课',
        w: '2019-04-03 18:56',
        e: '2019-04-03 18:56',
        r: 'XXX'
      }, {
        q: '超人会飞课',
        w: '2019-04-03 18:56',
        e: '2019-04-03 18:56',
        r: 'XXX'
      }, {
        q: '超人会飞课',
        w: '2019-04-03 18:56',
        e: '2019-04-03 18:56',
        r: 'XXX'
      }, {
        q: '超人会飞课',
        w: '2019-04-03 18:56',
        e: '2019-04-03 18:56',
        r: 'XXX'
      }],
      pagination: {
        defaultPageSize: 10
      }
    }
  },
  methods: {
    onExportList() {
      console.log('导出所有')
    },
    pageChange(pagination) {
      console.log(pagination)
    }
  }
}
</script>
