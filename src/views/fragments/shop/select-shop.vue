<template>
  <div>
    <st-table
      :columns="shopTableColumns"
      :dataSource="list"
      :pagination="false"
      rowKey="shop_id"
      :scroll="{ y: 270 }"
    >
      <template slot="operation" slot-scope="text, record">
      <div>
        <a @click="delShopTableRecord(record.shop_id)">删除</a>
      </div>
    </template>
    </st-table>
    <a v-modal-link="{
      name: 'shop-select',
      props: {
        checked: checkedShopIds
      },
      on: {
        change: onSelectShopComplete
      }
    }">
      <st-button type="dashed" block class="mg-t8">添加</st-button>
    </a>
  </div>
</template>
<script>
import { SelectShopService } from './select-shop.service'
import { keys } from 'lodash-es'

const shopTableColumns = [{
  title: '省',
  dataIndex: 'province'
}, {
  title: '市',
  dataIndex: 'city'
}, {
  title: '区',
  dataIndex: 'district'
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
      loading: this.selectService.loading$
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
      checkedShopIds: [],
      list: []
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
      }).subscribe(res => {
        this.list = res.shops
      })
    },
    delShopTableRecord(shopId) {
      const { list, checkedShopIds } = this
      list.forEach((item, index) => {
        if (item.shop_id === shopId) {
          list.splice(index, 1)
        }
      })
      checkedShopIds.forEach((item, index) => {
        if (item === +shopId) {
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
