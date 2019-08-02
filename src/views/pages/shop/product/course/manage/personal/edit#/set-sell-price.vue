<template>
  <st-form :form="form" class="page-set-sell-price" labelWidth="100px">
    <a-row :gutter="8">
      <a-col :lg="10" :offset="1">
        <!-- 课程名称 -->
        <st-form-item label="课程名称">
          <a-input
            placeholder="课程名称"
            disabled
            v-decorator="ruleConfig.courseName"
          />
        </st-form-item>
        <!-- 售卖方式 -->
        <st-form-item label="售卖方式">
          <a-checkbox-group
            :options="sellTypeOptions"
            v-decorator="ruleConfig.sellType"
          >
            <a-checkbox
              v-for="(item, index) in personalCourseEnums.sell_type.value"
              :key="index"
              :value="index"
            >
              {{ item }}
            </a-checkbox>
          </a-checkbox-group>
        </st-form-item>
        <!-- 课程有效期 -->
        <st-form-item>
          <template slot="label">
            课有效期
            <st-help-tooltip id="TSCPC002" />
          </template>
          <st-input-number v-decorator="ruleConfig.effectiveUnit">
            <template slot="addonAfter">
              天
            </template>
          </st-input-number>
        </st-form-item>
        <!-- 单节预约 -->
        <st-form-item>
          <template slot="label">
            单节预约
            <st-help-tooltip id="TBCPC005" />
          </template>
          <a-checkbox
            :checked="!!singleReserve"
            @change="onSingleReserveChange"
          >
            支持单节课预约
          </a-checkbox>
          <template v-if="singleReserve">
            <st-input-number
              v-model="singlePrice"
              :float="true"
              style="width: 100px;"
            />
            <span class="mg-l8">元/节</span>
          </template>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="22" :offset="1">
        <st-form-item labelFix>
          <set-price :value="priceGradient" @change="onPriceGradientChange" />
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.setPrice">
            完成
          </st-button>
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
import { GradientService } from '@/views/fragments/course/personal#/gradient.service'

export default {
  name: 'SetSellPrice',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      userService: UserService,
      routeService: RouteService,
      ruleConfig: RuleConfig,
      gradientService: GradientService
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
      priceGradient: [],
      singleReserve: 0,
      singlePrice: ''
    }
  },
  computed: {
    sellTypeOptions() {
      const sellType = this.personalCourseEnums.sell_type.value
      const options = []
      for (let i in sellType) {
        options.push({
          label: sellType[i],
          value: +i,
          disabled: +i === 2
        })
      }
      return options
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
      this.form.validateFields().then(() => {
        const data = this.getData()
        if (!this.inputCheck()) {
          return
        }
        this.addService.setPrice(data).subscribe(this.onSaveSuccess)
      })
    },
    onSaveSuccess() {
      this.messageService.success({
        content: '提交成功'
      })
      this.$router.push({
        name: 'shop-product-course-manage-personal-list'
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
    inputCheck() {
      if (this.singleReserve) {
        if (!this.singlePrice.length) {
          this.messageService.error({
            content: '请输入单节预约价格'
          })
          return
        }
      }
      if (!this.gradientService.check(this.priceGradient)) {
        return false
      }
      return true
    },
    setFieldsValue() {
      const info = this.info
      // if (info.sell_type.indexOf(2) === -1) {
      //   info.sell_type.push(2)
      // }
      this.form.setFieldsValue({
        course_name: info.course_name,
        sell_type: info.sell_type,
        effective_unit: info.effective_unit
      })
      this.singleReserve = info.single_reserve
      this.singlePrice = info.single_price
      this.priceGradient = info.price_gradient
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.course_id = +this.query.id
      data.price_gradient = this.priceGradient
      data.single_reserve = +this.singleReserve
      if (data.single_reserve) {
        data.single_price = this.singlePrice
      }
      return data
    },
    onPriceGradientChange(priceGradient) {
      this.priceGradient = priceGradient
    },
    onSingleReserveChange() {
      this.singleReserve = +!this.singleReserve
    }
  }
}
</script>
