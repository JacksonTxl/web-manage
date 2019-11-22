<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading.addGroup"
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
            <a-input type="hidden" v-decorator="decorators.shopId" />
            <a-select
              showSearch
              v-model="shopId"
              placeholder="请输入"
              @change="changeShop"
            >
              <a-select-option
                :value="item.shop_id"
                v-for="(item, index) in shopList"
                :key="index"
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
            <a-input type="hidden" v-decorator="decorators.courseId" />
            <a-select
              showSearch
              v-model="courseId"
              placeholder="请输入"
              @change="changeCourse"
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in courseList"
                :key="index"
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
                  <st-input-number :float="true" v-model="record.group_price">
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
import { AddMemberService } from './add-member.service'
import { AddCourseService } from './add-course.service'
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
      addMemberService: AddMemberService,
      addCourseService: AddCourseService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.addMemberService.loading$,
      shopList: this.userService.shopList$,
      courseList: this.addCourseService.courseList$
    }
  },
  bem: {
    basic: 'brand-marketing-group-course'
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      cardColumns,
      courseList: [],
      shopId: '',
      courseId: '',
      tableData: [],
      isLimit: true,
      ACTIVITY_STATUS,
      RELEASE_STATUS,
      tableText: '', // 优惠设置错误提示
      tableErr: false,
      confirmLoading: false
    }
  },
  methods: {
    changeShop(value) {
      this.form.setFieldsValue({
        shopId: value
      })
      this.addCourseService.getCourseList({ shop_id: value }).subscribe(res => {
        this.$router.reload()
      })
    },
    changeCourse(value) {
      this.form.setFieldsValue({
        courseId: value
      })
      this.courseList.filter(item => {
        if (item.id === value) {
          this.tableData = item.product_spec
        }
      })
    },
    onSubmit(data) {
      console.log(data)
      data.product_type = 4
      data.product_id = this.courseId
      data.sku = this.tableData.map(item => {
        return {
          sku_id: item.id,
          group_price: item.group_price
        }
      })
      if (this.confirmLoading) return
      this.confirmLoading = true
      this.addMemberService.addGroup(data).subscribe(res => {
        this.confirmLoading = false
        this.$router.push({
          path: `/brand/marketing/plugin/group/list`
        })
      })
    }
  },
  components: {
    GroupForm
  }
}
</script>
