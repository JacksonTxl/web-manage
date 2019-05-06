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
      <set-price :value="priceGradient" @change="onPriceGradientChange"/>
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
import { RuleConfig } from '@/constants/course/rule'
import SetPrice from '@/views/fragments/course/set-price'

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
  components: {
    SetPrice
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
      priceGradient: []
    }
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
    getPriceGradient() {
      const ret = []
      const { tableData } = this
      tableData.forEach(item => {
        ret.push({
          level_id: item.level_id,
          min_sale: item.min_sale,
          max_sale: item.max_sale,
          price: item.price,
          transfer_num: item.transfer_num,
          transfer_unit: item.transfer_unit
        })
      })
      return ret
    },
    onChange(e) {
      this.priceSetting = e.target.value
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
      data.price_gradient = this.priceGradient
      return data
    },
    onPriceGradientChange(priceGradient) {
      console.log('price gradient changed', priceGradient)
      this.priceGradient = priceGradient
    }
  }
}
</script>
