<template>
  <st-form :form="form" @submit="save" class="page-shop-container">
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <input type="hidden" v-decorator="formRules.course_id">
        <st-form-item label="私教课程">
          <a-input placeholder="课程名称" disabled v-decorator="formRules.course_name"/>
        </st-form-item>
        <st-form-item label="上课门店" required>
          <a-radio-group @change="onChange" v-decorator="formRules.shop_setting">
            <a-radio v-for="(item, index) in personalCourseEnums.shop_setting.value" :key="index"
              :value="index">{{item}}</a-radio>
          </a-radio-group>
          <div class="page-shop-coach-container-shop mg-t8" v-if="isShow">
            <select-shop @change="onSelectShopChange"></select-shop>
            <input type="hidden" v-decorator="formRules.shop_ids">
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item label="上课教练">
          <div class="page-shop-coach-container-coach">
            <input type="hidden" v-decorator="formRules.coach_ids">
            <select-coach @change="onSelectCoachChange"></select-coach>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" html-type="submit">保存，继续设置售卖价格</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { AddService } from '../add.service'
import { MessageService } from '@/services/message.service'
import SelectShop from '@/views/fragments/shop/select-shop'
import SelectCoach from '@/views/fragments/coach/select-coach'
import { UserService } from '@/services/user.service'
import { enumFilter } from '@/filters/other.filters'
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

const formRules = {
  course_name: [
    'course_name', {
      rules: [{
        required: true,
        message: '请输入课程名称'
      }, {
        min: 4,
        message: '支持输入4~30个字的课程名称'
      }],
      initialValue: 'XXXX'
    }
  ],
  course_id: [
    'course_id'
  ],
  shop_setting: [
    'shop_setting', {
    }
  ],
  shop_ids: [
    'shop_ids', {
      rules: [{
        required: true,
        message: '请选择上课门店'
      }]
    }
  ],
  coach_ids: [
    'coach_ids', {
      rules: []
    }
  ]
}

export default {
  name: 'SetShopCoach',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      userService: UserService
    }
  },
  components: {
    SelectShop,
    SelectCoach
  },
  filters: {
    enumFilter
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formRules,
      isShow: false,
      shopIds: [1, 7]
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
  subscriptions() {
    const user = this.userService
    return {
      personalCourseEnums: user.personalCourseEnums$
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        ...this.info
      })
    })
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        data.course_id = this.dataInfo.course_id
        console.log('step 2 data', data)
        this.addService.setShop(data).subscribe(() => {
          this.messageService.success({
            content: '提交成功'
          })
          this.$emit('goNext')
        })
      })
    },
    onChange(e) {
      console.log(typeof e.target.value)
      e.target.value === '2' ? this.isShow = true : this.isShow = false
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
    }
  }
}
</script>
