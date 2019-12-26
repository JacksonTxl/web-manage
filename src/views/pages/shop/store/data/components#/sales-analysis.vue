<template>
  <div :class="basic()">
    <st-t3>{{ title }}</st-t3>
    <div :class="basic('list')">
      <ul>
        <li v-for="(item, index) in salesTitle" :key="index">
          {{ item }}
        </li>
      </ul>
      <template v-if="salesList.length">
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
          <li>
            {{ nameFilter(item.product_name, nameLength) }}
          </li>
          <li>
            {{
              item.sale
                ? (item.sale + '').replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
                : (item.revenue + '').replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
            }}
          </li>
        </ul>
      </template>
      <template v-else>
        <st-no-data></st-no-data>
      </template>
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
    },
    nameLength: {
      type: [String, Number],
      default: 4
    }
  },
  data() {
    return {
      IconOneRanking,
      IconTwoRanking,
      IconThreeRanking
    }
  },

  methods: {
    nameFilter(value, nameLength) {
      return value.length > nameLength
        ? `${value.slice(0, nameLength)}...`
        : value
    }
  }
}
</script>
