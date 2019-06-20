<template>
  <a-select
    :mode="mode"
    allowClear
    :placeholder="placeholder||'全部门店'"
    :value="value"
    @change="onChange">
    <a-select-option :value="shop.id" v-for="shop in shopOptions" :key="shop.id">{{shop.shop_name}}</a-select-option>
  </a-select>
</template>

<script>
import { StaffApi } from '../../api/v1/staff'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  name: 'ShopSelect',
  data() {
    return {
      shopOptions: []
    }
  },
  serviceInject() {
    return {
      staffApi: StaffApi
    }
  },
  props: {
    mode: {
      type: String
    },
    placeholder: {
      type: String
    },
    useType: {
      type: String
    },
    value: {
      type: [Number, String, Array]
    }
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    },
    getShopList() {
      this.staffApi.getShopList().subscribe(res => {
        const defaultOption = this.useType === 'form' ? {} : { id: -1, shop_name: ' 全部' }
        this.shopOptions = [defaultOption, ...res.shops]
      })
    }
  },
  created() {
    this.getShopList()
  }
}
</script>
