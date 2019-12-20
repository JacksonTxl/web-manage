<template>
  <st-modal title="规格选择" @ok="onSubmit" v-model="show" width="540px">
    <div :class="basic()">
      <div class="good-message">
        <img
          src="https://img.cdn.xinchanedu.com/uploadImg/aix/2019/Aug/1565149862022.jpg"
          alt=""
        />
        <div>
          <span>￥200</span>
          <span>库存{{ productInfo.stock_amount }}件</span>
          <span>已选：</span>
        </div>
      </div>
      <div class="good-item" v-for="(item, index) in allSpec" :key="index">
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
  data() {
    return {
      show: false,
      value1: 'Apple',
      plainOptions: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' }
      ],
      productInfo: {
        stock_amount: 0
      },
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
      ],
      specItemId: [],
      allSpecInfo: [
        {
          spec_arr: [
            {
              spec_id: 1,
              spec_name: '',
              spec_item_id: 11,
              spec_item_name: ''
            },
            {
              spec_id: 1,
              spec_name: '',
              spec_item_id: 21,
              spec_item_name: ''
            }
          ],
          stock_amount: 10
        },
        {
          spec_arr: [
            {
              spec_id: 1,
              spec_name: '',
              spec_item_id: 11,
              spec_item_name: ''
            },
            {
              spec_id: 1,
              spec_name: '',
              spec_item_id: 22,
              spec_item_name: ''
            }
          ],
          stock_amount: 20
        }
      ],
      allSpecs: ''
    }
  },
  bem: {
    basic: 'modals-choose-sku'
  },
  methods: {
    onSubmit() {
      this.$emit('success', {
        product_id: 1,
        product_name: '商品名',
        sku: '卡其色 M 108-120斤',
        count: 1,
        price: 30.9
      })
      this.show = false
    },
    changeData() {
      this.allSpec.forEach(element => {
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
      this.allSpec = JSON.parse(JSON.stringify(this.allSpec))
      this.outPutProductInfo()
    },
    outPutProductInfo() {
      for (let i = 0; i < this.allSpecInfo.length; i++) {
        let values = this.allSpecInfo[i]
        let skuId1 = ''
        values.spec_arr.forEach(val => {
          skuId1 = skuId1 + val.spec_item_id
        })
        let skuId2 = this.specItemId.join('')
        if (skuId1 === skuId2) {
          this.productInfo.stock_amount = values.stock_amount
          return
        }
      }
    },
    changeSku() {
      this.specItemId = []
      this.allSpec.forEach(item => {
        this.specItemId.push(item.itemVal)
      })
      this.outPutProductInfo()
    }
  },
  created() {
    this.changeData()
  }
}
</script>
