<template>
  <st-modal title="规格选择" @ok="onSubmit" v-model="show" width="540px">
    <div :class="basic()">
      <div :class="info()">
        <img :src="productData.product_images[0].image_url" alt="" />
        <div :class="info('content')">
          <span :class="info('price')">￥{{ productInfo.unit_price }}</span>
          <span :class="info('amount')">
            库存{{ productInfo.stock_amount }}件
          </span>
          <span :class="info('rule')">已选：{{ productInfo.rule_name }}</span>
        </div>
      </div>
      <div
        :class="basic('good-item')"
        v-for="(item, index) in this.productData.all_spec"
        :key="index"
      >
        <span :class="basic('label')">{{ item.spec_name }}</span>
        <a-radio-group
          :options="item.spec_item_arr"
          v-model="item.itemVal"
          @change="changeSku"
        />
      </div>
    </div>
  </st-modal>
</template>
<script>
import { cloneDeep } from 'lodash-es'
export default {
  name: 'modalStoreChooseSku',
  props: {
    productData: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      productInfo: {
        product_id: '', // 商品id
        product_name: '商品名', // 商品名称
        rule_name: '', // 规格信息
        unit_price: 0, // 单价
        stock_amount: 0, // 库存
        nums: 1,
        sku_id: '' // 规格id
      }, // 规格选择完的商品信息
      specItemId: [] // 规格值id
    }
  },
  bem: {
    basic: 'modals-choose-sku',
    info: 'good-message'
  },
  methods: {
    onSubmit() {
      this.$emit('success', this.productInfo)
      this.show = false
    },
    // 对后台返回的数据转换
    changeData() {
      this.productData.all_spec.forEach(element => {
        let items = cloneDeep(element.spec_item_arr)
        element.spec_item_arr = []
        items.forEach(val => {
          element.spec_item_arr.push({
            value: val.spec_item_id,
            label: val.spec_item_name
          })
        })
        element.itemVal = items[0].spec_item_id
        this.specItemId.push(element.itemVal)
      })
      this.productData.all_spec = cloneDeep(this.productData.all_spec)
      this.outPutProductInfo()
    },
    // 输出选择规格后对应的信息
    outPutProductInfo() {
      for (let i = 0; i < this.productData.product_sku.length; i++) {
        let values = this.productData.product_sku[i]
        let skuId1 = ''
        let skuInfo = ''
        values.spec_arr.forEach(val => {
          skuId1 = skuId1 + val.spec_item_id
          skuInfo = skuInfo + val.spec_item_name + ' '
        })
        let skuId2 = this.specItemId.join('')
        if (skuId1 === skuId2) {
          this.productInfo.stock_amount = values.stock_amount || 0
          this.productInfo.rule_name = skuInfo
          this.productInfo.unit_price = values.selling_price
          this.productInfo.sku_id = values.sku_id
          return
        }
      }
    },
    // 规格改变后获取对应数据
    changeSku() {
      this.specItemId = []
      this.productData.all_spec.forEach(item => {
        this.specItemId.push(item.itemVal)
      })
      this.outPutProductInfo()
    }
  },
  created() {
    console.log(this.productData)
    this.changeData()
  }
}
</script>
