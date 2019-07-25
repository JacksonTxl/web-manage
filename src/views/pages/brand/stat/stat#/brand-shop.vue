<template>
  <div :class="basic()">
    <!-- <a-radio-group @change="onChange" v-model="value">
      <a-radio-button value="brand">品牌</a-radio-button>
      <a-radio-button value="shop">门店</a-radio-button>
    </a-radio-group> -->
    <a-select defaultValue="-1" style="width: 106px" @change="handleChange" class="mg-l8">
      <a-select-option value="-1">全部门店</a-select-option>
      <a-select-option v-for="(item, index) in shopList" :value="item.shop_id" :key="index">{{item.shop_name}}</a-select-option>
    </a-select>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
export default {
  name: 'StatisticsBrandShop',
  bem: {
    basic: 'brand-statistics-brand-shop'
  },
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      shopList: this.userService.shopList$
    }
  },
  data() {
    return {
      value: 'brand'
    }
  },
  methods: {
    recentChange(query) {
      this.$emit('change', query)
    },
    onChange(event) {
      this.$emit('change', event)
    },
    handleChange(event) {
      this.$emit('change', event)
    }
  },
  components: {
  }
}
</script>
