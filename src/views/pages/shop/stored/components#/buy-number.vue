<template>
  <div :class="basic()">
    <div :class="basic('left')">
      <sales-analysis
        title="购买次数TOP5"
        :salesList="salesList"
      ></sales-analysis>
    </div>
    <div :class="basic('right')">
      <st-t3>{{ title }}</st-t3>
      <div class="radio-group">
        <a-radio-group @change="onChange" v-model="value">
          <a-radio :value="1">客户数</a-radio>
          <a-radio :value="2">支付金额</a-radio>
        </a-radio-group>
      </div>
      <shop-entry-bar
        v-if="inoutTime.length"
        :data="value === 1 ? inoutTime : inoutTimes"
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
      title: '购买次数分布图',
      value: 1,
      inoutTime: [
        { name: '购买1次', value: 128 },
        { name: '购买2次', value: 132 },
        { name: '购买3次', value: 132 },
        { name: '购买4次', value: 132 },
        { name: '购买5次及以上', value: 132 }
      ],
      inoutTimes: [
        { name: '0~50元', value: 128 },
        { name: '50~100元', value: 132 },
        { name: '100~500元', value: 132 },
        { name: '505~1000元', value: 132 },
        { name: '1000元以上', value: 132 }
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
      if (this.value === 1) {
        this.title = '购买次数分布图'
      } else {
        this.title = '消费金额分布图'
      }
    }
  }
}
</script>
