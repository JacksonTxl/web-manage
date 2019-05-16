<template>
  <div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="18"></a-col>
        <a-col :lg="6">
          <st-input-search placeholder="请输入会员名姓名、手机号进行查询" @search="searchCourse"/>
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="memberColums"
          :dataSource="list"
          :scroll="{ x: 1750}"
          @change="pageChange"
          :pagination="pagination"
        ></st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { memberColums } from './columns'
export default {
  data() {
    return {
      memberColums,
      pagination: {},
      list: [{
        q: '腹肌撕裂训练',
        w: '拉伸',
        e: '超人',
        r: '13800000009',
        t: '有效',
        y: 60,
        u: 20,
        i: '2019-01-22 14:55',
        o: '2019-01-22 14:55'
      }]
    }
  },
  mounted() {

  },
  methods: {
    searchCourse(e) {

    },
    pageChange() {

    }

  }
}
</script>
