<template>
  <st-form :form="form" class="page-shop-container">
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
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
        <st-form-item label="上课门店" required>
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
            <select-shop :shopIds="shopIds" @change="onSelectShopChange" />
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item label="上课教练">
          <div class="page-shop-coach-container-coach">
            <input type="hidden" v-decorator="decorators.coach_ids" />
            <select-coach
              :shopIds="shopIds"
              :coachIds="info.coach_ids"
              @change="onSelectCoachChange"
            />
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.setShop">
            保存，继续设置售卖价格
          </st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { EditService } from '../../edit.service'
import { MessageService } from '@/services/message.service'
import { RouteService } from '@/services/route.service'
import SelectShop from '@/views/fragments/shop/select-shop'
import SelectCoach from '@/views/fragments/coach/select-coach'
import { ruleOptions } from '../set-shop-coach.config'
import { SHOP_SETTING } from '@/constants/course/personal'
export default {
  name: 'SetShopCoach',
  serviceInject() {
    return {
      editService: EditService,
      messageService: MessageService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      loading: this.editService.loading$,
      query: this.routeService.query$,
      shopSetting: this.editService.shopSetting$
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
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      shopIds: [],
      isShow: false
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
      if (!this.shopInputCheck()) {
        this.messageService.error({
          content: '请选择门店'
        })
        return
      }
      this.form.validateFields().then(() => {
        const data = this.getData()
        this.editService.setShop(data).subscribe(() => {
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
        shop_setting: info.shop_setting,
        coach_ids: info.coach_ids
      })
      this.isShow = info.shop_setting === SHOP_SETTING.SPECIFIED_STORE
      this.shopIds = info.shop_ids
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.course_id = +this.query.id
      data.shop_ids = this.shopIds
      return data
    },
    shopInputCheck() {
      if (this.isShow) {
        return this.shopIds.length
      } else {
        return true
      }
    }
  }
}
</script>
