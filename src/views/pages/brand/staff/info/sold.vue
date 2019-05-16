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
          :dataSource="list"
          :scroll="{ x: 1750}"
          @change="pageChange"
          :pagination="pagination"
        >
        </st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { soldColums } from './columns'
export default {
  data() {
    return {
      soldColums,
      pagination: {},
      list: [{
        order_num: '5465456456',
        sold_shop: '门店A',
        shop_name: '商品名称 规格名',
        shop_type: '会籍期限卡',
        order_status: '创建',
        pay_status: '部分支付',
        user_name: '超人',
        phone: '156****7701',
        order_time: '2019-01-22 14:55:34',
        resul_time: '2019-01-22 14:55'
      }]
    }
  },
  mounted() {

  },
  methods: {
    searchCourse(e) {

    },
    pageChange(a, b, c) {
      console.log(a, b, c)
    }
  }
}
</script>
