<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading.addGroup"
    :isEdit="true"
    :info="info.info"
    :confirmLoading="confirmLoading"
    @onsubmit="onSubmit"
    :showSelectShop="false"
  >
    <template slot="choose-product">
      <a-row :gutter="8">
        <a-col :span="10">
          <st-form-item required>
            <span slot="label">
              拼团门店
              <st-help-tooltip id="TBPTXJ005" />
            </span>
            <a-select
              showSearch
              v-decorator="decorators.shop_id"
              :disabled="activityState >= ACTIVITY_STATUS.NO_START"
              @change="changeShop"
            >
              <a-select-option
                :value="item.shop_id"
                v-for="item in shopList"
                :key="item.shop_id"
              >
                {{ item.shop_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :span="10">
          <st-form-item label="选择课程包" required>
            <a-select
              showSearch
              v-decorator="decorators.course_id"
              @change="changeCourse"
              :disabled="activityState >= ACTIVITY_STATUS.NO_START"
            >
              <a-select-option
                :value="item.id"
                v-for="item in courseList"
                :key="item.id"
              >
                {{ item.product_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :span="16">
          <st-form-item
            label="优惠设置"
            required
            :help="tableText"
            :validateStatus="tableErr ? 'error' : ''"
          >
            <div :class="basic('table')">
              <st-table
                rowKey="id"
                :columns="cardColumns"
                :dataSource="tableData"
                :pagination="false"
                :scroll="{ y: 230 }"
                align="center"
              >
                <template slot="group_price" slot-scope="customRender, record">
                  <st-input-number
                    :float="true"
                    v-model="record.group_price"
                    :disabled="activityState >= ACTIVITY_STATUS.NO_START"
                  >
                    <template slot="addonAfter">
                      元
                    </template>
                  </st-input-number>
                </template>
              </st-table>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
    </template>
  </group-form>
</template>
<script>
import GroupForm from './components#/group-form'
import { ruleOptions, cardColumns } from './add-course.config'
import { EditCourseService } from './edit-course.service'
import { UserService } from '@/services/user.service'
import {
  ACTIVITY_STATUS,
  RELEASE_STATUS
} from '@/constants/marketing/group-buy'
import moment from 'moment'
import { PatternService } from '@/services/pattern.service'
export default {
  serviceInject() {
    return {
      editCourseService: EditCourseService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.editCourseService.loading$,
      shopList: this.userService.shopList$,
      courseList: this.editCourseService.courseList$,
      info: this.editCourseService.info$
    }
  },
  bem: {
    basic: 'brand-marketing-group-course'
  },
  mounted() {
    this.setFieldsValue()
    this.changeShop(this.shopId)
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      cardColumns,
      courseList: [],
      tableData: [],
      ACTIVITY_STATUS,
      RELEASE_STATUS,
      tableText: '', // 优惠设置错误提示
      tableErr: false,
      confirmLoading: false,
      activityState: Number // 当前活动活动状态
    }
  },
  methods: {
    changeShop(value) {
      this.addCourseService.getCourseList({ shop_id: value }).subscribe(res => {
        this.$router.reload()
      })
    },
    changeCourse(value) {
      this.tableData = this.courseList.filter(
        item => item.id === value
      )[0].product_spec
    },
    onSubmit(data) {
      console.log(data)
      data.id = +this.$route.query.id
      data.shop_ids = [+this.form.getFieldValue('shop_id')]
      data.product_type = 4
      data.product_id = this.form.getFieldValue('course_id')
      data.sku = this.tableData.map(item => {
        return {
          sku_id: this.form.getFieldValue('course_id'),
          group_price: item.group_price
        }
      })
      if (this.confirmLoading) return
      this.confirmLoading = true
      this.editCourseService.editGroupbuy(data).subscribe(res => {
        this.confirmLoading = false
        this.$router.push({
          path: `/brand/marketing/plugin/group/list`
        })
      })
    },
    // 详情回显
    setFieldsValue() {
      this.activityState = this.info.info.activity_state.id
      this.courseId = this.info.info.product.id
      console.log(this.tableData, 'tableData==========')
      // this.tableData = this.info.info.sku
      this.shopId = this.info.info.support_shop[0]
    }
  },
  components: {
    GroupForm
  }
}
</script>
