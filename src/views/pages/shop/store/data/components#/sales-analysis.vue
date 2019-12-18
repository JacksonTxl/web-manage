<template>
  <div :class="basic()">
    <st-t3>{{ title }}</st-t3>
    <div :class="basic('list')">
      <ul>
        <li v-for="(item, index) in salesTitle" :key="index">
          {{ item }}
        </li>
      </ul>
      <ul v-for="(item, index) in salesList" :key="index">
        <li>
          <img
            v-if="index < 3"
            :src="
              index
                ? index === 1
                  ? IconTwoRanking
                  : IconThreeRanking
                : IconOneRanking
            "
          />
          <span style="margin-left:12px" v-else>{{ index + 1 }}</span>
        </li>
        <li>{{ item.product_name }}</li>
        <li>{{ item.sale ? item.sale : item.revenue }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import IconOneRanking from '@/assets/img/shop/store/data/icon-one-ranking.png'
import IconTwoRanking from '@/assets/img/shop/store/data/icon-two-ranking.png'
import IconThreeRanking from '@/assets/img/shop/store/data/icon-three-ranking.png'
export default {
  bem: {
    basic: 'shop-store-data-sales-analysis'
  },
  props: {
    title: {
      type: String,
      default: '销量TOP5'
    },
    salesTitle: {
      type: Array,
      default: () => {
        return []
      }
    },
    salesList: {
      type: [Array, Object],
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      IconOneRanking,
      IconTwoRanking,
      IconThreeRanking
    }
  }
}
</script>
