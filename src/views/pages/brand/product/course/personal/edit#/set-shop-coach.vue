<template>
  <st-form :form="form" class="page-shop-container">
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item label="私教课程">
          <a-input placeholder="课程名称" disabled v-decorator="ruleConfig.courseName"/>
        </st-form-item>
        <st-form-item label="上课门店" required>
          <a-radio-group @change="onChange" v-decorator="ruleConfig.shopSetting">
            <a-radio v-for="(item, index) in personalCourseEnums.shop_setting.value" :key="+index"
              :value="+index">{{item}}</a-radio>
          </a-radio-group>
          <div class="page-shop-coach-container-shop mg-t8" v-if="isShow">
            <select-shop @change="onSelectShopChange"></select-shop>
            <input type="hidden" v-decorator="ruleConfig.shopIds">
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item label="上课教练">
          <div class="page-shop-coach-container-coach">
            <input type="hidden" v-decorator="ruleConfig.coachIds">
            <select-coach @change="onSelectCoachChange"></select-coach>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.setShop">保存，继续设置售卖价格</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { EditService } from '../edit.service'
import { MessageService } from '@/services/message.service'
import { RouteService } from '@/services/route.service'
import SelectShop from '@/views/fragments/shop/select-shop'
import SelectCoach from '@/views/fragments/coach/select-coach'
import { UserService } from '@/services/user.service'
import { RuleConfig } from '@/constants/course/rule'

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
  name: 'SetShopCoach',
  serviceInject() {
    return {
      editService: EditService,
      messageService: MessageService,
      userService: UserService,
      routeService: RouteService,
      ruleConfig: RuleConfig
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.editService.loading$,
      personalCourseEnums: user.personalCourseEnums$,
      query: this.routeService.query$
    }
  },
  components: {
    SelectShop,
    SelectCoach
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
      shopIds: [],
      shopSetting: 1
    }
  },
  computed: {
    isShow() {
      return this.shopSetting === 2
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
        console.log('step 2 data', data)
        this.editService.setShop(data).subscribe(() => {
          this.messageService.success({
            content: '提交成功'
          })
          this.$emit('goNext')
        })
      })
    },
    onChange(e) {
      this.shopSetting = e.target.value
    },
    onSelectShopChange(shopIds) {
      console.log('your selected', shopIds)
      this.form.setFieldsValue({
        shop_ids: shopIds
      })
    },
    onSelectCoachChange(coachIds) {
      console.log('your selected', coachIds)
      this.form.setFieldsValue({
        coach_ids: coachIds
      })
    },
    setFieldsValue() {
      const info = this.info
      this.form.setFieldsValue({
        course_name: info.course_name,
        shop_setting: info.shop_setting,
        shop_ids: info.shop_ids,
        coach_ids: info.coach_ids
      })
      this.shopSetting = info.shop_setting
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.course_id = +this.query.id
      return data
    }
  }
}
</script>
