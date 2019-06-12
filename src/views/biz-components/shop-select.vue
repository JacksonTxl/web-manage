<template>
  <a-select
    allowClear
    placeholder="全部门店"
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
    value: {
      type: [Number, String]
    }
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    },
    getShopList() {
      this.staffApi.getShopList().subscribe(res => {
        this.shopOptions = [{ id: -1, shop_name: ' 全部' }, ...res.shops]
      })
    }
  },
  created() {
    this.getShopList()
  }
}
</script>
