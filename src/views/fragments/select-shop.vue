<template>
  <div>
    <a-table :columns="shopTableColumns" :dataSource="shopTableData" :pagination="false">
      <template slot="operation" slot-scope="text, record">
      <div>
        <a @click="delShopTableRecord(record.key)">删除</a>
      </div>
    </template>
    </a-table>
    <modal-link tag="a" :to="{ name: 'shop-select', props: { checked: checkedShopIds }, on: {
      complete: onSelectShopComplete } }">
      <st-button type="dashed" block class="mg-t8">添加</st-button>
    </modal-link>
  </div>
</template>
<script>
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
      shopTableData: [],
      checkedShopIds: []
    }
  },
  created() {
    this.checkedShopIds = this.shopIds
    const shopTableData = this.getShops(this.shopIds)
    this.shopTableData = shopTableData
  },
  methods: {
    onSelectShopComplete(shopIds) {
      const shopTableData = this.getShops(shopIds)
      this.shopTableData = shopTableData
      this.checkedShopIds = shopIds
      this.$emit('onComplete', shopIds)
    },
    getShops(shopIds = []) {
      const data = {
        '1': {
          'key': '1',
          'province_name': '江苏省',
          'city_name': '苏州市',
          'district_name': '姑苏区',
          'shop_name': '场馆A'
        },
        '2': {
          'key': '2',
          'province_name': '江苏省',
          'city_name': '苏州市',
          'district_name': '姑苏区',
          'shop_name': '场馆B'
        },
        '7': {
          'key': '7',
          'province_name': '上海市',
          'city_name': '上海市',
          'district_name': '徐汇区',
          'shop_name': '测试店铺'
        }
      }
      const ret = []
      shopIds.forEach(item => {
        if (data[item]) {
          ret.push(data[item])
        }
      })
      return ret
    },
    delShopTableRecord(key) {
      const { shopTableData, checkedShopIds } = this
      shopTableData.forEach((item, index) => {
        if (item.key === key) {
          shopTableData.splice(index, 1)
        }
      })
      checkedShopIds.forEach((item, index) => {
        if (item === +key) {
          checkedShopIds.splice(index, 1)
        }
      })
      this.shopTableData = shopTableData
      this.checkedShopIds = checkedShopIds
    }
  }
}
</script>
