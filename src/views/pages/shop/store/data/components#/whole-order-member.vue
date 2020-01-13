<template>
  <div>
    <brand-user-avg-bar
      v-if="wholeNavcom === 'brand-user-avg-bar'"
      :unit="wholeNav[wholenavIndex].unit"
      :data="orderMember(storeBoard, 0, orderMemberFlag)"
      :name="filterOrderMemberTitle()"
      style="width: 100%;"
      :total="Number(wholeNav[wholenavIndex].num)"
      :height="Number(325)"
      :colors="colors"
    ></brand-user-avg-bar>
    <shop-store-data-ring
      v-else
      :unit="wholeNav[wholenavIndex].unit"
      :data="orderMember(storeBoard, 0, orderMemberFlag)"
      :name="filterOrderMemberTitle()"
      style="width: 100%;"
      :total="Number(wholeNav[wholenavIndex].num)"
      :height="Number(332)"
      :colors="colors"
    ></shop-store-data-ring>
  </div>
</template>
<script>
import ShopStoreDataRing from '@/views/biz-components/stat/shop-store-data-ring'
import BrandUserAvgBar from '@/views/biz-components/stat/shop-store-data-avg-bar'
import { TYPE } from '../../../../../../constants/marketing/plugin'
import { defaults } from 'lodash-es'
export default {
  props: {
    colors: {
      type: Array,
      default: () => ['#4679F9', '#894BFF']
    },
    wholeNav: {
      type: [Object, Array],
      default: () => {}
    },
    wholenavIndex: {
      type: Number,
      default: 0
    },
    orderMemberFlag: {
      type: String,
      default: 'order'
    },
    storeBoard: {
      type: Object
    },
    wholeNavcom: {
      type: String
    },
    fieldNav: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ShopStoreDataRing,
    BrandUserAvgBar
  },
  methods: {
    // 整体看板订单/会员
    orderMember(value, flag, that) {
      let filterOrderMemberData = [
        value,
        this.fieldNav,
        this.wholenavIndex,
        that,
        'value'
      ]
      return this.filterOrderMember(...filterOrderMemberData)
    },
    filterOrderMember(value, fieldNav, wholenavIndex, that, type) {
      if (!Array.isArray(value[fieldNav[wholenavIndex]].source)) {
        return value[fieldNav[wholenavIndex]].source[that].map(item => {
          return {
            name: item.type,
            value: Number(item[type])
          }
        })
      } else {
        return []
      }
    },
    // 订单来源/会员身份标题
    filterOrderMemberTitle() {
      let title = ['营收金额(元)', '订单数(单)']
      if (
        title.find(item => item === this.wholeNav[this.wholenavIndex].title)
      ) {
        if (this.wholeNav[this.wholenavIndex].title === title[0]) {
          return '总营收'
        } else {
          return '订单数'
        }
      }
    }
  }
}
</script>
