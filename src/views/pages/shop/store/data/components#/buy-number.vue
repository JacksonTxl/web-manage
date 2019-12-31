<template>
  <div :class="basic()">
    <a-row>
      <a-col :span="8">
        <div :class="basic('left')">
          <sales-analysis
            :title="titleLeft[flag - 0]"
            nameLength="4"
            :salesTitle="['排名', '用户', flag ? '购买数(次)' : '消费金额(元)']"
            :salesList="data.top_rank | filterDataTOP5"
          ></sales-analysis>
        </div>
      </a-col>
      <a-col :span="16">
        <div :class="basic('right')">
          <st-t3>{{ titleRight[flag - 0] }}</st-t3>
          <div class="radio-group">
            <a-radio-group @change="onChange" v-model="value">
              <a-radio :value="1">客户数</a-radio>
              <a-radio :value="2">支付金额</a-radio>
            </a-radio-group>
          </div>
          <shop-entry-bar
            :data="filterBuyNumInfo"
            :uitl="value === 2 ? '元' : '次'"
          ></shop-entry-bar>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import SalesAnalysis from './sales-analysis'
import ShopEntryBar from '@/views/biz-components/stat/shop-entry-bar'

export default {
  bem: {
    basic: 'shop-store-data-buy-number'
  },
  components: {
    SalesAnalysis,
    ShopEntryBar
  },
  props: {
    flag: {
      type: Boolean
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  filters: {
    filterDataTOP5(value) {
      return value.map(item => {
        return {
          product_name: item.member_name,
          sale: item.sum
        }
      })
    }
  },
  data() {
    return {
      titleRight: ['消费金额分布图', '购买次数分布图'],
      titleLeft: ['消费金额TOP5', '购买次数TOP5'],
      filterBuyNumInfo: [],
      value: 1
    }
  },
  created() {
    this.onChange()
  },
  methods: {
    onChange(e) {
      this.filterBuyNum(this.value)
    },
    filterBuyNum(value) {
      if (value === 1) {
        this.filterBuyNumInfo = this.data.top_scatter.slice(0, 5).map(item => {
          return {
            name: item.scatter_type,
            value: item.sum
          }
        })
      } else {
        this.filterBuyNumInfo = this.data.top_scatter.slice(5, 10).map(item => {
          return {
            name: item.scatter_type,
            value: item.sum
          }
        })
      }
    }
  }
}
</script>
