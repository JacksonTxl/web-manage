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
          <a-checkbox-group :options="saleTypeOptions" @change="onSaleTypeChange" v-decorator="ruleConfig.saleType">
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
            <a-radio :value="1">售卖场馆自主定价</a-radio>
            <a-radio :value="2">品牌统一定价</a-radio>
          </a-radio-group>
        </st-form-item>
        <!-- 单节售卖 -->
        <st-form-item label="单节售卖">
          <a-checkbox :value="1" v-decorator="ruleConfig.singleSell">支持单节课购买</a-checkbox>
          <a-input-number v-decorator="ruleConfig.singlePrice"></a-input-number>
          <span class="mg-l8">元/节</span>
        </st-form-item>
      </a-col>
    </a-row>
    <!-- <select-coach-level @change="(val) => onLevelChange(val, index)"></select-coach-level> -->
    <section v-if="isShowUnitSet">
      <a-row :gutter="8">
        <a-col :lg="22" :xs="22" :offset="1">
          <!-- 私教课程定价模式：教练平级定价；私教课程售卖模式：统一标价 -->
          <st-form-item label="售卖定价">
            <st-container>
              <a-table :columns="tableColumns" :dataSource="tableData" :pagination="false">
                <!-- 售卖梯度 -->
                <template slot="priceGradient" slot-scope="text, record, index">
                  <div>
                    <a-input-number v-model="tableData[index].min_sale"></a-input-number>
                    <span class="mg-l8">节及以上</span>
                  </div>
                </template>
                <!-- 售卖价格范围 -->
                <template slot="price" slot-scope="text, record, index">
                  <div key="price">
                    <a-input-number :min="0"  class="page-set-sell-price__input" v-model="tableData[index].sell_price"/>
                      <span class="page-set-sell-price__label">元/节</span>
                  </div>
                </template>
                <!-- 转让手续费 -->
                <template slot="serviceFee" slot-scope="text, record, index">
                  <a-select placeholder="请选择" @change="(val) => onTransferUnitChange(val, index)"
                    class="page-set-sell-price__select">
                    <a-select-option v-for="(item, index) in personalCourseEnums.transfer_type.value"
                      :key="index" :value="index">{{item}}
                    </a-select-option>
                  </a-select>
                  <a-input-number :min="0"  class="page-set-sell-price__input mg-l8" v-model="tableData[index].transfer_num" />
                  <span class="page-set-sell-price__label">
                    {{tableData[index].transfer_unit === 1 ? '%' : '元'}}
                  </span>
                </template>
                <!-- 操作 -->
                <template slot="action" slot-scope="text, record">
                  <a @click="del(record.key)" class="mg-l8">删除</a>
                </template>
              </a-table>
              <st-button type="dashed" block class="mg-t8" @click="addPriceRecord">添加</st-button>
            </st-container>
          </st-form-item>
        </a-col>
      </a-row>
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
      saleTypeOptions: [{
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
  components: {
    // SelectCoachLevel
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
    onSaleTypeChange(checkedValue) {
      console.log('sale channel changed', checkedValue)
    },
    del(key) {
      const newTableData = [...this.tableData]
      const target = newTableData.filter(item => key === item.key)[0]
      if (target) {
        remove(newTableData, target)
        this.tableData = newTableData
      }
    },
    addPriceRecord() {
      const newRecord = {
        key: +new Date(),
        priceGradient: '',
        price: '',
        serviceFee: ''
      }
      this.tableData.push(newRecord)
    },
    getPriceGradient() {
      const ret = []
      const { tableData } = this
      const fieldsValue = this.form.getFieldsValue()
      const singleSell = +fieldsValue.single_sell
      const singlePrice = fieldsValue.single_price
      tableData.forEach(item => {
        ret.push({
          min_sale: item.min_sale,
          sell_price: item.sell_price,
          transfer_num: item.transfer_num,
          transfer_unit: item.transfer_unit,
          single_sell: singleSell,
          single_price: singlePrice
        })
      })
      return ret
    },
    onLevelChange(val, index) {
      this.tableData[index].level_id = val
    },
    onTransferUnitChange(val, index) {
      this.tableData[index].transfer_unit = val
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
        price_gradient: info.priceGradient
      })
      this.priceSetting = info.price_setting
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.course_id = +this.query.id
      data.single_sell = +data.single_sell
      /**
       * 配合后端接口，传init值
       */
      data.sell_type = 2
      return data
    }
  }
}
</script>
