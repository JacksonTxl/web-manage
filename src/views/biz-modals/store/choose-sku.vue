<template>
  <st-modal title="规格选择" @ok="onSubmit" v-model="show" width="540px">
    <div :class="basic()">
      <div class="good-message">
        <img
          src="https://img.cdn.xinchanedu.com/uploadImg/aix/2019/Aug/1565149862022.jpg"
          alt=""
        />
        <div>
          <span>￥{{ productInfo.unit_price }}</span>
          <span>库存{{ productInfo.stock_amount }}件</span>
          <span>已选：{{ productInfo.rule_name }}</span>
        </div>
      </div>
      <div
        class="good-item"
        v-for="(item, index) in this.productData.all_spec"
        :key="index"
      >
        <span class="item-label">{{ item.spec_name }}</span>
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
      value1: 'Apple',
      productInfo: {
        product_id: 1, // 商品id
        product_name: '商品名', // 商品名称
        rule_name: '', // 规格信息
        unit_price: 0, // 单价
        stock_amount: 0, // 库存
        nums: 1,
        sku_id: '' // 规格id
      }, // 规格选择完的商品信息
      allSpec: [
        {
          spec_id: 1,
          spec_name: '颜色',
          spec_item_arr: [
            {
              spec_item_id: 11,
              spec_item_name: '红色'
            },
            {
              spec_item_id: 12,
              spec_item_name: '蓝色'
            },
            {
              spec_item_id: 13,
              spec_item_name: '黄色'
            }
          ]
        },
        {
          spec_id: 2,
          spec_name: '内存',
          spec_item_arr: [
            {
              spec_item_id: 21,
              spec_item_name: '16G'
            },
            {
              spec_item_id: 22,
              spec_item_name: '32G'
            },
            {
              spec_item_id: 23,
              spec_item_name: '64G'
            }
          ]
        }
      ], // 规格信息
      specItemId: [], // 规格值id
      allSpecInfo: [
        {
          spec_arr: [
            {
              spec_id: 1,
              spec_name: '颜色',
              spec_item_id: 11,
              spec_item_name: '红色'
            },
            {
              spec_id: 2,
              spec_name: '内存',
              spec_item_id: 21,
              spec_item_name: '16G'
            }
          ],
          stock_amount: 10,
          market_price: 21,
          selling_price: 30,
          sku_id: 111
        },
        {
          spec_arr: [
            {
              spec_id: 1,
              spec_name: '颜色',
              spec_item_id: 11,
              spec_item_name: '红色'
            },
            {
              spec_id: 2,
              spec_name: '内存',
              spec_item_id: 22,
              spec_item_name: '32G'
            }
          ],
          stock_amount: 20,
          market_price: 21,
          selling_price: 380,
          sku_id: 112
        },
        {
          spec_arr: [
            {
              spec_id: 1,
              spec_name: '颜色',
              spec_item_id: 11,
              spec_item_name: '红色'
            },
            {
              spec_id: 2,
              spec_name: '内存',
              spec_item_id: 23,
              spec_item_name: '64G'
            }
          ],
          stock_amount: 30,
          market_price: 61,
          selling_price: 230,
          sku_id: 113
        }
      ] // 规格内容信息
    }
  },
  bem: {
    basic: 'modals-choose-sku'
  },
  methods: {
    onSubmit() {
      this.$emit('success', this.productInfo)
      this.show = false
    },
    // 对后台返回的数据转换
    changeData() {
      this.productData.all_spec.forEach(element => {
        let items = JSON.parse(JSON.stringify(element.spec_item_arr))
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
      this.productData.all_spec = JSON.parse(
        JSON.stringify(this.productData.all_spec)
      )
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
          this.productInfo.stock_amount = values.stock_amount
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
    // this.allSpec = this.data.all_spec
    // this.allSpecInfo = this.data.product_sku
    console.log(this.productData)
    console.log(this.productData.product_sku)
    this.changeData()
  }
}
</script>
