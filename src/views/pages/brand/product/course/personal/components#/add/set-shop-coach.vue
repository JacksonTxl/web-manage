<template>
  <st-form :form="form" class="page-shop-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程名称">
          <a-input
            placeholder="课程名称"
            disabled
            v-decorator="decorators.course_name"
          />
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item required>
          <template slot="label">
            售卖门店
            <st-help-tooltip id="TBCPC001" />
          </template>
          <a-radio-group
            @change="onChange"
            v-decorator="decorators.shop_setting"
          >
            <a-radio
              v-for="(item, index) in shopSetting"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </a-radio>
          </a-radio-group>
          <div class="page-shop-coach-container-shop mg-t8" v-if="isShow">
            <select-shop @change="onSelectShopChange"></select-shop>
            <input type="hidden" v-decorator="decorators.shop_ids" />
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item>
          <template slot="label">
            上课教练
            <st-help-tooltip id="TBCPC002" />
          </template>
          <div class="page-shop-coach-container-coach">
            <input type="hidden" v-decorator="decorators.coach_ids" />
            <select-coach
              :shopIds="shopIds"
              @change="onSelectCoachChange"
            ></select-coach>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button
            type="primary"
            @click="save"
            :loading="loading.setShop"
            :disabled="!courseId"
          >
            保存，继续设置售卖价格
          </st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { AddService } from '../../add.service'
import { MessageService } from '@/services/message.service'
import SelectShop from '@/views/fragments/shop/select-shop'
import SelectCoach from '@/views/fragments/coach/select-coach'
import { ruleOptions } from '../set-shop-coach.config'
import { SHOP_SETTING } from '@/constants/course/personal'
export default {
  name: 'SetShopCoach',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$,
      shopSetting: this.addService.shopSetting$
    }
  },
  components: {
    SelectShop,
    SelectCoach
  },
  props: {
    courseName: {
      type: String,
      default: ''
    },
    courseId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    courseName(val) {
      this.form.setFieldsValue({
        course_name: val
      })
    },
    courseId(val) {
      this.form.setFieldsValue({
        course_id: val
      })
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      isShow: false,
      shopIds: []
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validate().then(() => {
        const data = this.form.getFieldsValue()
        data.course_id = this.courseId
        this.addService.setShop(data).subscribe(() => {
          this.messageService.success({
            content: '提交成功'
          })
          this.$emit('goNext')
        })
      })
    },
    onChange(e) {
      this.isShow = e.target.value === SHOP_SETTING.SPECIFIED_STORE
      this.shopIds = []
    },
    onSelectShopChange(shopIds) {
      this.shopIds = shopIds
      this.form.setFieldsValue({
        shop_ids: shopIds
      })
    },
    onSelectCoachChange(coachIds) {
      this.form.setFieldsValue({
        coach_ids: coachIds
      })
    },
    setFieldsValue() {
      const info = this.info
      this.form.setFieldsValue({
        course_name: info.course_name,
        course_category: info.course_category,
        train_aim: info.train_aim,
        duration: info.duration,
        is_online_sale: info.is_online_sale,
        price: info.price,
        effective_unit: info.effective_unit,
        image: info.image,
        description: info.description
      })
      this.fileList = [this.info.image]
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.course_id = +this.query.id
      return data
    }
  }
}
</script>
