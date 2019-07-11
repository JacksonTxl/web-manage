<template>
  <div class="set-price">
    <div class="ta-c">
      <st-button
        v-if="priceModel === 2"
        type="dashed"
        block
        class="mg-t8"
        @click="addRecord"
      >
        添加教练等级定价
      </st-button>
    </div>
    <st-container
      v-for="(priceGradientRecord, key) in priceGradient"
      :key="key"
      class="mg-t24 set-price__price-container"
    >
      <a
        v-if="priceGradient.length > 1"
        href="javascript: void(0);"
        class="set-price__del"
        @click="delRecord(key)"
      >
        <st-icon type="delete" color="#3F66F6"></st-icon>
        <span class="mg-l4 color-text-light">删除</span>
      </a>
      <st-form labelWidth="70px" class="mg-t8">
        <!-- 选择教练等级 如果定价方式为教练分级定价时，显示选择教练-->
        <st-form-item label="教练等级" required v-if="priceModel === 2">
          <select-coach-level
            :value="priceGradientRecord.level_id"
            @change="(val) => onLevelChange(val, key)"
          >
          </select-coach-level>
        </st-form-item>
        <!-- 私教课程定价模式：教练平级定价；私教课程售卖模式：统一标价 -->
        <st-form-item label="售卖定价" required class="mg-b8"></st-form-item>
        <st-form-item class="set-price__record">
          <st-container>
            <st-form-table>
              <thead>
                <tr>
                  <th>购买节数</th>
                  <th>售卖价格范围</th>
                  <th>转让手续费</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="4">
                    <st-button
                      type="dashed"
                      block class="mg-t8"
                      @click="addPriceRecord(key)"
                    >
                      添加梯度
                    </st-button>
                  </td>
                </tr>
                <tr
                  v-for="(item, index) in priceGradientRecord.prices"
                  :key="index"
                >
                  <td>
                    <div>
                      <a-input-number
                        :min="0"
                        v-model="priceGradientRecord.prices[index].min_sale"
                      />
                      <span class="mg-l8">节及以上</span>
                    </div>
                  </td>
                  <td>
                    <!-- 教练谈单模式 价格为区间 -->
                    <div v-if="saleModel === 1">
                      <st-input-number
                        class="page-set-sell-price__input"
                        v-model="priceGradientRecord.prices[index].min_sell_price"
                        :float="true"
                      />
                      <span class="page-set-sell-price__label">元/节</span>~
                      <st-input-number
                        class="page-set-sell-price__input"
                        v-model="priceGradientRecord.prices[index].max_sell_price"
                        :float="true"
                      />
                      <span class="page-set-sell-price__label">元/节</span>
                    </div>
                    <!-- 统一标价模式 价格为固定值 -->
                    <div v-if="saleModel === 2">
                      <st-input-number
                        class="page-set-sell-price__input"
                        v-model="priceGradientRecord.prices[index].sell_price"
                        :float="true"
                      />
                      <span class="page-set-sell-price__label">元/节</span>
                    </div>
                  </td>
                  <td>
                    <st-input-number
                      style="width: 110px"
                      v-model="priceGradientRecord.prices[index].transfer_num"
                      :float="true"
                    >
                      <template slot="addonAfter">
                        <a-select
                          :defaultValue="1"
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
                  </td>
                  <td>
                    <st-table-actions>
                      <a @click="del(key, rowIndex)" class="mg-l8">删除</a>
                    </st-table-actions>
                  </td>
                </tr>
              </tbody>
            </st-form-table>
          </st-container>
        </st-form-item>
      </st-form>
    </st-container>
    <!-- <div>
      <button @click="check">check</button>
    </div> -->
  </div>
</template>
<script>
import { remove } from 'lodash-es'
import SelectCoachLevel from '@/views/fragments/coach/select-coach-level'
import { UserService } from '@/services/user.service'
import { SetPriceService } from './set-price.service'

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
      priceGradient: []
    }
  },
  created() {
    // 获取定价模式
    this.getSetting()
    this.initPriceGradient()
  },
  methods: {
    initPriceGradient() {
      this.priceGradient = this.value.length ? this.value : [{
        level_id: -1,
        prices: []
      }]
    },
    getSetting() {
      this.setPriceService.getSetting().subscribe()
    },
    onChange(e) {
      this.priceSetting = e.target.value
    },
    del(key, rowIndex) {
      this.priceGradient[key].prices.splice(rowIndex, 1)
      this.priceGradient = [...this.priceGradient]
    },
    addRecord() {
      const newRecord = {
        level_id: -1,
        single_sell: 0,
        single_price: '',
        prices: []
      }
      this.priceGradient.unshift(newRecord)
    },
    delRecord(key) {
      let { priceGradient } = this
      remove(priceGradient, (item, index) => {
        return index === key
      })
      this.priceGradient = [...priceGradient]
    },
    addPriceRecord(key) {
      const newRecord = {
        id: 0,
        priceGradient: '',
        price: '',
        serviceFee: '',
        transfer_unit: 1
      }
      if (!this.priceGradient[key].prices) {
        this.priceGradient[key].prices = []
      }
      this.priceGradient = [...this.priceGradient]
      this.priceGradient[key].prices.push(newRecord)
    },
    onLevelChange(val, key) {
      this.priceGradient[key].level_id = val
    },
    inputCheck() {
      const { priceGradient } = this
      let ret = true
      for (let i = 0; i < priceGradient.length; i++) {
        let retIn = false
        const prices = priceGradient[i].prices || []
        for (let j = 0; j < prices.length; j++) {
          const price = prices[j]
          for (let k in price) {
            // if (price[k] === undefined || price[k] === '') {
            //   retIn = true
            // }
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
        const prices = item.prices || []
        const pricesLen = prices.length
        prices.map((price, i) => {
          delete price.serviceFee
          delete price.priceGradient
          delete price.price
          if (this.saleModel === 1) {
            // 教练谈单模式，没有固定价格
            price.sell_price = 0
          }
          if (this.saleModel === 2) {
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
    },
    check() {
      const ret = this.inputCheck()
      console.log(ret, this.priceGradient)
    }
  }
}
</script>
