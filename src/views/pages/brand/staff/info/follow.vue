<template>
    <div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="16">
          <a-select style="width: 160px;margin-left:12px" class="mg-r8" :defaultValue="-1" placeholder="请选择门店">
            <a-select-option :value="1">门店1</a-select-option>
            <a-select-option :value="3">门店2</a-select-option>
            <a-select-option :value="2">门店3</a-select-option>
            <a-select-option :value="-1">全部</a-select-option>
          </a-select>
          <a-range-picker @change="onChooseDate" format="YYYY-MM-DD"/>
        </a-col>
        <a-col :lg="2"></a-col>
        <a-col :lg="6">
          <st-input-search placeholder="请输入用户姓名进行查询" @search="searchCourse"/>
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="followColumns"
          :dataSource="list"
          :scroll="{ x: 1750}"
          @change="pageChange"
          :pagination="pagination"
        >
          <template slot="action" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="onCacelAppointment(record)">取消预约</a>
            <a href="javascript:;" @click="onSign(record)">签到</a>
          </template>
        </st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { followColumns } from './columns'
export default {
  data() {
    return {
      followColumns,
      pagination: {},
      list: [{
        follow_time: '2019/09/06 15:00',
        follow_shop: '门店A',
        follow_member: '超人',
        follow_way: '实际到访',
        follow_result: '结果很好',
        follow_note: '用户身型消瘦，以增肌需求为主，无健身基础，工作地点在我们健身房附近，距离近'
      }]
    }
  },
  mounted() {

  },
  methods: {
    onChooseDate(e) {
      console.log('选择到的日期', e)
    },
    searchCourse(e) {
      console.log('跟进查询', e)
    },
    pageChange(a, b, c) {
      console.log('pagechange', a, b, c)
    }
  }
}
</script>

<style>

</style>
