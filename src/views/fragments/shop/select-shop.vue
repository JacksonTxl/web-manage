<template>
  <div>
    <a-table :columns="shopTableColumns" :dataSource="list" :pagination="false" rowKey="shop_id">
      <template slot="operation" slot-scope="text, record">
      <div>
        <a @click="delShopTableRecord(record.key)">删除</a>
      </div>
    </template>
    </a-table>
    <modal-link tag="a" :to="{ name: 'shop-select', props: { checked: checkedShopIds }, on: {
      change: onSelectShopComplete } }">
      <st-button type="dashed" block class="mg-t8">添加</st-button>
    </modal-link>
  </div>
</template>
<script>
import { SelectShopService } from './select-shop.service'

const shopTableColumns = [{
  title: '省',
  dataIndex: 'province_name'
}, {
  title: '市',
  dataIndex: 'city_name'
}, {
  title: '区',
  dataIndex: 'district_name'
}, {
  title: '门店名称',
  dataIndex: 'shop_name'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

export default {
  name: 'SelectShop',
  serviceInject() {
    return {
      selectService: SelectShopService
    }
  },
  rxState() {
    return {
      loading: this.selectService.loading$,
      list: this.selectService.list$
    }
  },
  props: {
    shopIds: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      shopTableColumns,
      checkedShopIds: []
    }
  },
  created() {
    this.checkedShopIds = this.shopIds
    this.getShops(this.shopIds)
  },
  methods: {
    onSelectShopComplete(shopIds) {
      this.getShops(shopIds)
      this.checkedShopIds = shopIds
      this.$emit('change', shopIds)
    },
    getShops(shopIds = []) {
      if (!shopIds.length) {
        return
      }
      this.selectService.getShopBasic({
        shop_ids: shopIds
      }).subscribe()
    },
    delShopTableRecord(key) {
      const { list, checkedShopIds } = this
      list.forEach((item, index) => {
        if (item.key === key) {
          list.splice(index, 1)
        }
      })
      checkedShopIds.forEach((item, index) => {
        if (item === +key) {
          checkedShopIds.splice(index, 1)
        }
      })
      this.list = list
      this.checkedShopIds = checkedShopIds
      this.$emit('change', checkedShopIds)
    }
  }
}
</script>
