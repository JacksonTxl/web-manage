<template>
  <div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="16">
          <a-select style="width: 160px;margin-left:12px" :defaultValue="-1" placeholder="请选择门店">
            <a-select-option :value="1">门店1</a-select-option>
            <a-select-option :value="3">门店2</a-select-option>
            <a-select-option :value="2">门店3</a-select-option>
            <a-select-option :value="-1">全部</a-select-option>
          </a-select>
          <a-select style="width: 160px;margin-left:12px" :defaultValue="-1" placeholder="请选择预约状态">
            <a-select-option :value="-1">全部订单状态</a-select-option>
            <a-select-option :value="1">预约失败</a-select-option>
            <a-select-option :value="3">候补中</a-select-option>
            <a-select-option :value="2">预约成功</a-select-option>
            <a-select-option :value="4">取消预约</a-select-option>
          </a-select>
        </a-col>
        <a-col :lg="2"></a-col>
        <a-col :lg="6">
          <st-input-search placeholder="请输入会员名姓名、手机号进行查询" @search="searchCourse"/>
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="soldColums"
          :dataSource="soldInfo.list"
          :scroll="{ x: 1750}"
          @change="pageChange"
          :pagination="pagination"
        ></st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { soldColums } from './columns'
import { SoldService } from './sold.service'
export default {
  serviceInject() {
    return {
      soldservice: SoldService
    }
  },
  rxState() {
    return {
      soldInfo: this.soldservice.soldInfo$
    }
  },
  data() {
    return {
      soldColums,
      pagination: {
        pageSize: 20,
        current: 1
      },
      id: ''
    }
  },
  mounted() {
    this.id = this.$route.meta.query.id
    this.pagination.total = this.soldInfo.page.total_counts
  },
  methods: {
    searchCourse(e) {},
    pageChange(a, b, c) {
      console.log(a, b, c)
    }
  }
}
</script>
