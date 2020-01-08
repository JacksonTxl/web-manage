<template>
  <div :class="basic()">
    <st-t3>{{ title }}</st-t3>
    <div :class="basic('list')">
      <ul>
        <li
          v-for="(item, index) in salesTitle"
          :key="index"
          :class="
            index === 2
              ? 'list__title-three'
              : index === 1
              ? 'list__title-two'
              : ''
          "
        >
          <span>{{ item }}</span>
        </li>
      </ul>
      <template v-if="salesList.length">
        <ul v-for="(item, index) in salesList" :key="index">
          <li>
            <img v-if="index < 3" :src="imgIcon[index]" />
            <span class="list__sales-list-one-order" v-else>
              {{ index + 1 }}
            </span>
          </li>
          <li>
            <span class="list__sales-list-two-name">
              {{ nameFilter(item.product_name, nameLength) }}
            </span>
          </li>
          <li class="list__sales-list-three">
            <span class="list__sales-list-three-num">
              {{
                item.sale ? thousandBit(item.sale) : thousandBit(item.revenue)
              }}
            </span>
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
  computed: {
    imgIcon() {
      let iconArr = [
        this.IconOneRanking,
        this.IconTwoRanking,
        this.IconThreeRanking
      ]
      return iconArr
    }
  },
  methods: {
    nameFilter(value, nameLength) {
      return value && value.length > nameLength
        ? `${value.slice(0, nameLength)}...`
        : value
    },
    thousandBit(value) {
      let valueArr = (value + '').split('.')
      return `${valueArr[0].replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')}${
        valueArr[1] ? '.' + valueArr[1] : ''
      }`
    }
  }
}
</script>
