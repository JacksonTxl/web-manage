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
        <st-form-item required>
          <template slot="label">
            上课门店
            <st-help-tooltip id="TBCGC002" />
          </template>
          <a-radio-group
            @change="onChange"
            v-decorator="decorators.shop_setting"
          >
            <a-radio
              v-for="(item, index) in shopSetting$"
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
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.setShop">
            完成
          </st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { RouteService } from '@/services/route.service'
import SelectShop from '@/views/fragments/shop/select-shop'
import { SetBrandTeamCourseService } from './set-brand-team-course.service'
import { SetShopTeamCourseService } from './set-shop-team-course.service'
import { ruleOptions } from './set-shop-coach.config'
import { SHOP_SETTING } from '@/constants/course/team'
export default {
  name: 'SetShopCoach',
  serviceInject() {
    let CourseService
    const pageName = this.$route.name
    if (/^brand/.test(pageName)) {
      CourseService = SetBrandTeamCourseService
    } else {
      CourseService = SetShopTeamCourseService
    }
    return {
      messageService: MessageService,
      routeService: RouteService,
      courseService: CourseService
    }
  },
  rxState() {
    return {
      loading: this.courseService.loading$,
      query: this.routeService.query$,
      shopSetting$: this.courseService.shopSetting$
    }
  },
  components: {
    SelectShop
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    info: {
      deep: true,
      handler() {
        this.setFieldsValue()
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
      shopSetting: SHOP_SETTING.ALL_STORE
    }
  },
  computed: {
    isShow() {
      return this.shopSetting === SHOP_SETTING.SPECIFIED_STORE
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
        this.courseService.setShop(data).subscribe(this.onSaveSuccess)
      })
    },
    onSaveSuccess() {
      this.messageService.success({
        content: '提交成功'
      })
      this.$router.push({
        name: 'brand-product-course-team-list'
      })
    },
    onChange(e) {
      this.shopSetting = e.target.value
      this.shopIds = []
    },
    onSelectShopChange(shopIds) {
      this.shopIds = shopIds
    },
    setFieldsValue() {
      const info = this.info
      const shopSetting = info.shop_setting || SHOP_SETTING.ALL_STORE
      this.form.setFieldsValue({
        course_name: info.course_name,
        shop_setting: shopSetting,
        coach_ids: info.coach_ids
      })
      this.shopSetting = shopSetting
      this.shopIds = info.shop_ids
      this.courseId = info.course_id
    },
    getData() {
      const data = this.form.getFieldsValue()
      const id = this.query.id
      data.course_id = this.info.course_id || +id
      data.shop_ids = this.shopIds
      return data
    },
    shopInputCheck() {
      const { shopSetting } = this
      if (shopSetting === SHOP_SETTING.ALL_STORE) {
        return true
      } else {
        return this.shopIds.length
      }
    }
  }
}
</script>
