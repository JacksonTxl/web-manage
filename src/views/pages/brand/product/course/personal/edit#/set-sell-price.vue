<template>
  <st-form :form="form" class="page-set-sell-price" labelWidth="100px">
    <a-row :gutter="8">
      <a-col :lg="10" :offset="1">
        <!-- 课程名称 -->
        <st-form-item label="私教课程">
          <a-input placeholder="课程名称" disabled v-decorator="ruleConfig.courseName"/>
        </st-form-item>
        <!-- 售卖渠道 -->
        <st-form-item label="售卖渠道">
          <a-checkbox-group :options="sellTypeOptions" v-decorator="ruleConfig.sellType">
            <a-checkbox v-for="(item, index) in personalCourseEnums.sell_type.value" :key="index" :value="index">
              {{item}}
            </a-checkbox>
          </a-checkbox-group>
        </st-form-item>
        <!-- 课程有效期 -->
        <st-form-item label="课有效期">
          <a-input-number :min="0" v-decorator="ruleConfig.effectiveUnit">
            <div slot="addonAfter" class="st-form-item-unit">天/节</div>
          </a-input-number>
        </st-form-item>
        <!-- 定价权限 -->
        <st-form-item label="定价权限" required>
          <a-radio-group @change="onChange" v-decorator="ruleConfig.priceSetting">
            <a-radio :value="1">品牌统一定价</a-radio>
            <a-radio :value="2">售卖场馆自主定价</a-radio>
          </a-radio-group>
        </st-form-item>
      </a-col>
    </a-row>
     <section v-if="isShowUnitSet">
      <a-row :gutter="8" v-for="(priceGradientRecord, key) in priceGradient" :key="key">
        <a-col :lg="22" :xs="22" :offset="1">
          <!-- 选择教练等级 如果定价方式为教练分级定价时，显示选择教练-->
          <st-form-item label="教练等级" required v-if="priceModel === 2">
            <select-coach-level :value="priceGradientRecord.level_id" @change="(val) => onLevelChange(val, key)"></select-coach-level>
          </st-form-item>
          <!-- 单节售卖 -->
          <st-form-item label="单节售卖">
            <a-checkbox :checked="!!priceGradientRecord.is_single_sell"
              @change="(val) => onSingleSellChange(val, key)">支持单节课购买</a-checkbox>
            <a-input-number v-model="priceGradientRecord.single_price"></a-input-number>
            <span class="mg-l8">元/节</span>
          </st-form-item>
          <!-- 私教课程定价模式：教练平级定价；私教课程售卖模式：统一标价 -->
          <st-form-item label="售卖定价" required>
            <st-container>
              <a-table :columns="tableColumns" :dataSource="priceGradientRecord.prices"
                :pagination="false" :rowKey="record => record.id">
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
                      <a-input-number :min="0" class="page-set-sell-price__input" v-model="priceGradientRecord.prices[index].min_sell_price"/>
                      <span class="page-set-sell-price__label">元/节</span>~
                      <a-input-number :min="0" class="page-set-sell-price__input" v-model="priceGradientRecord.prices[index].max_sell_price"/>
                      <span class="page-set-sell-price__label">元/节</span>
                    </div>
                    <!-- 统一标价模式 价格为固定值 -->
                    <div v-if="saleModel === 2">
                      <a-input-number :min="0"  class="page-set-sell-price__input" v-model="priceGradientRecord.prices[index].sell_price"/>
                      <span class="page-set-sell-price__label">元/节</span>
                    </div>
                  </div>
                </template>
                <!-- 转让手续费 -->
                <template slot="serviceFee" slot-scope="text, record, index">
                  <a-select placeholder="请选择" :defaultValue="priceGradientRecord.prices[index].transfer_unit"
                    class="page-set-sell-price__select" v-model="priceGradientRecord.prices[index].transfer_unit">
                    <a-select-option v-for="(item, index) in personalCourseEnums.transfer_type.value"
                      :key="index" :value="+index">{{item}}
                    </a-select-option>
                  </a-select>
                  <a-input-number :min="0"  class="page-set-sell-price__input mg-l8"
                    v-model="priceGradientRecord.prices[index].transfer_num" />
                  <span class="page-set-sell-price__label">
                    {{priceGradientRecord.prices[index].transfer_unit === 1 ? '%' : '元'}}
                  </span>
                </template>
                <!-- 操作 -->
                <template slot="action" slot-scope="text, record">
                  <a @click="del(record.key)" class="mg-l8">删除</a>
                </template>
              </a-table>
              <st-button type="dashed" block class="mg-t8" @click="addPriceRecord(key)">添加梯度</st-button>
            </st-container>
          </st-form-item>
        </a-col>
      </a-row>

      <div class="ta-c">
        <st-button @click="addRecord">添加教练等级定价</st-button>
      </div>
    </section>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.setPrice">完成</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { AddService } from '../add.service'
import { MessageService } from '@/services/message.service'
import { RouteService } from '@/services/route.service'
import { UserService } from '@/services/user.service'
import { remove } from 'lodash-es'
import SelectCoachLevel from '@/views/fragments/coach/select-coach-level'
import { RuleConfig } from '@/constants/course/rule'

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
  name: 'SetSellPrice',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      userService: UserService,
      routeService: RouteService,
      ruleConfig: RuleConfig
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.addService.loading$,
      personalCourseEnums: user.personalCourseEnums$,
      query: this.routeService.query$
    }
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      priceSetting: 1,
      sellTypeOptions: [{
        label: '线下售卖',
        value: 1
      }, {
        label: '用户端售卖',
        value: 2
      }],
      tableColumns,
      tableData: [],
      priceGradient: [],
      saleModel: 0,
      priceModel: 0
    }
  },
  components: {
    SelectCoachLevel
  },
  created() {
    this.getSetting()
  },
  computed: {
    isShowUnitSet() {
      return this.priceSetting === 1
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setFieldsValue()
    })
  },
  methods: {
    save(e) {
      e.preventDefault()
      const priceGradient = this.getPriceGradient()
      console.log('price_gradient', priceGradient)
      this.form.validateFields().then(() => {
        const data = this.getData()
        console.log('step 3 data', data)
        if (!this.inputCheck(priceGradient)) {
          return
        }
        data.price_gradient = priceGradient
        this.addService.setPrice(data).subscribe(() => {
          this.messageService.success({
            content: '提交成功'
          })
        })
      })
    },
    onChange(e) {
      this.priceSetting = e.target.value
    },
    del(key) {
      const newTableData = [...this.tableData]
      const target = newTableData.filter(item => key === item.key)[0]
      if (target) {
        remove(newTableData, target)
        this.tableData = newTableData
      }
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
      this.priceGradient[key].single_sell = e.target.value
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
    setFieldsValue() {
      const info = this.info
      this.form.setFieldsValue({
        course_name: info.course_name,
        price_setting: info.price_setting,
        sell_type: info.sell_type,
        effective_unit: info.effective_unit
      })
      console.log('set', info.price_gradient)
      this.priceSetting = info.price_setting
      this.priceGradient = info.price_gradient
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.course_id = +this.query.id
      data.price_gradient = this.priceGradientFilter()
      return data
    },
    getSetting() {
      this.addService.getSetting().subscribe(res => {
        this.saleModel = res.sale_model
        this.priceModel = res.price_model
      })
    },
    priceGradientFilter() {
      const priceGradient = [...this.priceGradient]
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
