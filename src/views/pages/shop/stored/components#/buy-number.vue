<template>
  <div :class="basic()">
    <div :class="basic('left')">
      <sales-analysis
        title="购买次数TOP5"
        :salesList="salesList"
      ></sales-analysis>
    </div>
    <div :class="basic('right')">
      <st-t3>购买次数分布图</st-t3>
      <div class="radio-group">
        <a-radio-group @change="onChange" v-model="value">
          <a-radio :value="1">客户数</a-radio>
          <a-radio :value="2">支付金额</a-radio>
        </a-radio-group>
      </div>
      <shop-entry-bar
        v-if="inoutTime.length"
        :data="inoutTime"
      ></shop-entry-bar>
    </div>
  </div>
</template>
<script>
import SalesAnalysis from './sales-analysis'
import ShopEntryBar from '@/views/biz-components/stat/shop-entry-bar'

export default {
  bem: {
    basic: 'shop-stored-data-buy-number'
  },
  components: {
    SalesAnalysis,
    ShopEntryBar
  },
  data() {
    return {
      value: 1,
      inoutTime: [
        { name: '08:00之前', value: 128 },
        { name: '08:00-12:00', value: 132 },
        { name: '08:00-12:002', value: 132 },
        { name: '08:00-12:003', value: 132 },
        { name: '08:00-12:004', value: 132 }
      ],
      salesList: {
        title: ['排名', '用户', '购买数(次)'],
        data: [
          {
            name: '王颖',
            age: 18,
            sex: '女'
          },
          {
            name: '崔庆',
            age: 18,
            sex: '男'
          },
          {
            name: '崔庆',
            age: 18,
            sex: '男'
          },
          {
            name: '崔庆',
            age: 18,
            sex: '男'
          },
          {
            name: 1,
            age: 1,
            sex: 1
          }
        ]
      }
    }
  },
  methods: {
    onChange() {
      console.log(this.value)
    }
  }
}
</script>
