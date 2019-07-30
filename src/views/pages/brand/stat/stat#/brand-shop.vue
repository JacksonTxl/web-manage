<template>
  <div :class="basic()">
    <a-select defaultValue="0" style="width: 106px" @change="handleChange" class="mg-l8">
      <a-select-option value="0">全部门店</a-select-option>
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
    handleChange(event) {
      this.$emit('change', event)
    }
  },
  components: {
  }
}
</script>
