<template>
  <st-form :form="form" class="page-shop-container">
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item label="课程名称">
          <a-input placeholder="课程名称" disabled v-decorator="ruleConfig.courseName"/>
        </st-form-item>
        <st-form-item label="上课门店" required>
          <a-radio-group @change="onChange" v-decorator="ruleConfig.shopSetting">
            <a-radio v-for="(item, index) in teamCourseEnums.shop_setting.value" :key="+index"
              :value="+index">{{item}}</a-radio>
          </a-radio-group>
          <div class="page-shop-coach-container-shop mg-t8" v-if="isShow">
            <select-shop
              :shopIds="shopIds"
              @change="onSelectShopChange"
            />
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.setShop">完成</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { RouteService } from '@/services/route.service'
import SelectShop from '@/views/fragments/shop/select-shop'
import { UserService } from '@/services/user.service'
import { RuleConfig } from '@/constants/course/rule'
import { SetBrandTeamCourseService } from './set-brand-team-course.service'
import { SetShopTeamCourseService } from './set-shop-team-course.service'

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
      userService: UserService,
      routeService: RouteService,
      ruleConfig: RuleConfig,
      courseService: CourseService
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.courseService.loading$,
      teamCourseEnums: user.teamCourseEnums$,
      query: this.routeService.query$
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
      this.form.setFieldsValue({
        course_name: info.course_name,
        shop_setting: info.shop_setting,
        coach_ids: info.coach_ids
      })
      this.shopSetting = info.shop_setting
      this.shopIds = info.shop_ids
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.course_id = +this.query.id
      data.shop_ids = this.shopIds
      return data
    },
    shopInputCheck() {
      const { shopSetting } = this
      if (shopSetting === 1) {
        return true
      } else {
        return this.shopIds.length
      }
    }
  }
}
</script>
