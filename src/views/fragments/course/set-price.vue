<template>
  <div>
    <a-row :gutter="8" v-for="(priceGradientRecord, key) in priceGradient" :key="key">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form>
          <!-- 选择教练等级 如果定价方式为教练分级定价时，显示选择教练-->
          <st-form-item label="教练等级" required v-if="priceModel === 2">
            <select-coach-level
              :value="priceGradientRecord.level_id"
              @change="(val) => onLevelChange(val, key)"
            >
            </select-coach-level>
          </st-form-item>
          <!-- 单节售卖 -->
          <st-form-item label="单节售卖">
            <a-checkbox
              :checked="!!priceGradientRecord.single_sell"
              @change="(val) => onSingleSellChange(val, key)"
            >
              支持单节课购买
            </a-checkbox>
            <template v-if="priceGradientRecord.single_sell">
              <a-input-number v-model="priceGradientRecord.single_price"></a-input-number>
               <span class="mg-l8">元/节</span>
            </template>
          </st-form-item>
          <!-- 私教课程定价模式：教练平级定价；私教课程售卖模式：统一标价 -->
          <st-form-item label="售卖定价" required>
            <st-container>
              <a-table :columns="tableColumns" :dataSource="priceGradientRecord.prices"
                :pagination="false" :rowKey="(record, index) => index">
                <!-- 售卖梯度 -->
                <template slot="priceGradient" slot-scope="text, record, index">
                  <div>
                    <a-input-number :min="0" v-model="priceGradientRecord.prices[index].min_sale"></a-input-number>
                    <span class="mg-l8">节及以上</span>
                  </div>
                </template>
                <!-- 售卖价格范围 -->
                <template slot="price" slot-scope="text, record, index">
                  <div key="price">
                    <!-- 教练谈单模式 价格为区间 -->
                    <div v-if="saleModel === 1">
                      <a-input-number :min="0" class="page-set-sell-price__input"
                        v-model="priceGradientRecord.prices[index].min_sell_price"/>
                      <span class="page-set-sell-price__label">元/节</span>~
                      <a-input-number :min="0" class="page-set-sell-price__input"
                        v-model="priceGradientRecord.prices[index].max_sell_price"/>
                      <span class="page-set-sell-price__label">元/节</span>
                    </div>
                    <!-- 统一标价模式 价格为固定值 -->
                    <div v-if="saleModel === 2">
                      <a-input-number :min="0"  class="page-set-sell-price__input"
                        v-model="priceGradientRecord.prices[index].sell_price"/>
                      <span class="page-set-sell-price__label">元/节</span>
                    </div>
                  </div>
                </template>
                <!-- 转让手续费 -->
                <template slot="serviceFee" slot-scope="text, record, index">
                  <st-input-number
                    style="width: 110px"
                    v-model="priceGradientRecord.prices[index].transfer_num"
                    :float="true"
                  >
                    <template slot="addonAfter">
                      <a-select :defaultValue="1"
                        class="st-form-item-unit"
                        v-model="priceGradientRecord.prices[index].transfer_unit"
                      >
                        <a-select-option
                          v-for="(item, index) in personalCourseEnums.transfer_unit.value"
                          :key="index"
                          :value="+index"
                        >
                          {{item}}
                        </a-select-option>
                      </a-select>
                    </template>
                  </st-input-number>
                </template>
                <!-- 操作 -->
                <template slot="action" slot-scope="text, record, rowIndex">
                  <a @click="del(key, rowIndex)" class="mg-l8">删除</a>
                </template>
              </a-table>
              <st-button type="dashed" block class="mg-t8" @click="addPriceRecord(key)">添加梯度</st-button>
            </st-container>
          </st-form-item>
        </st-form>
      </a-col>
    </a-row>
    <div class="ta-c">
        <st-button @click="addRecord">添加教练等级定价</st-button>
      </div>
  </div>
</template>
<script>
import { remove } from 'lodash-es'
import SelectCoachLevel from '@/views/fragments/coach/select-coach-level'
import { UserService } from '@/services/user.service'
import { SetPriceService } from './set-price.service'

const tableColumns = [{
  title: '购买节数',
  dataIndex: 'priceGradient',
  scopedSlots: { customRender: 'priceGradient' }
}, {
  title: '售卖价格范围',
  dataIndex: 'price',
  scopedSlots: { customRender: 'price' }
}, {
  title: '转让手续费',
  dataIndex: 'serviceFee',
  scopedSlots: { customRender: 'serviceFee' }
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  name: 'SetPrice',
  serviceInject() {
    return {
      userService: UserService,
      setPriceService: SetPriceService
    }
  },
  rxState() {
    return {
      resData: this.setPriceService.resData$,
      personalCourseEnums: this.userService.personalCourseEnums$
    }
  },
  components: {
    SelectCoachLevel
  },
  computed: {
    /**
     *私教课程定价模式 1、教练谈单 2、统一标价
     */
    saleModel() {
      return this.resData.sale_model
    },
    /**
     *定价模式 1、教练统一定价 2、教练分级定价
     */
    priceModel() {
      return this.resData.price_model
    }
  },
  watch: {
    priceGradient: {
      handler(val) {
        this.$emit('change', this.priceGradientFilter(val))
      },
      deep: true
    },
    value: {
      handler(val) {
        this.priceGradient = val
      },
      deep: true
    }
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      sellTypeOptions: [{
        label: '线下售卖',
        value: 1
      }, {
        label: '用户端售卖',
        value: 2
      }],
      tableColumns,
      tableData: [],
      priceGradient: []
    }
  },
  created() {
    // 获取定价模式
    this.getSetting()
    this.priceGradient = this.value
  },
  methods: {
    getSetting() {
      this.setPriceService.getSetting().subscribe()
    },
    onChange(e) {
      this.priceSetting = e.target.value
    },
    del(key, rowIndex) {
      this.priceGradient[key].prices.splice(rowIndex, 1)
      console.log('del', this.priceGradient, rowIndex)
    },
    addRecord() {
      const newRecord = {
        level_id: 0,
        single_sell: 0,
        single_price: '',
        prices: []
      }
      this.priceGradient.push(newRecord)
      console.log(this.priceGradient)
    },
    addPriceRecord(key) {
      const newRecord = {
        priceGradient: '',
        price: '',
        serviceFee: '',
        id: 0
      }
      this.priceGradient[key].prices.push(newRecord)
    },
    onLevelChange(val, key) {
      this.priceGradient[key].level_id = val
    },
    onSingleSellChange(e, key) {
      this.priceGradient[key].single_sell = +!this.priceGradient[key].single_sell
    },
    inputCheck(priceGradient) {
      let ret = true
      for (let i = 0; i < priceGradient.length; i++) {
        let retIn = false
        for (let j in priceGradient[i]) {
          if (priceGradient[i][j] === undefined || priceGradient[i][j] === '') {
            retIn = true
          }
        }
        if (retIn) {
          ret = false
          this.messageService.error({
            content: `第${i + 1}行课程定价输入有误`
          })
          break
        }
      }
      return ret
    },
    priceGradientFilter(priceGradient) {
      const DEFAULT_MAX_NUM = 10000
      priceGradient.map((item, index) => {
        const prices = item.prices
        const pricesLen = prices.length
        prices.map((price, i) => {
          delete price.serviceFee
          delete price.priceGradient
          delete price.price
          if (this.saleModel === 1) {
            // 教练谈单模式，没有固定价格
            price.sell_price = 0
          } else {
            // 统一标价模式下，没有价格梯度，传0
            price.min_sell_price = 0
            price.max_sell_price = 0
          }
          if (pricesLen === 1) {
            prices[0].max_sale = DEFAULT_MAX_NUM
          }
          if (i > 0) {
            prices[i - 1].max_sale = price.min_sale - 1
            if (i === pricesLen - 1) {
              price.max_sale = DEFAULT_MAX_NUM
            }
          }
          return price
        })
        return item
      })
      return priceGradient
    }
  }
}
</script>
