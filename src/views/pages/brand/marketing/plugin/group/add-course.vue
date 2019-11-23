<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading.getCourseList"
    :confirmLoading="loading.createGroupbuy"
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
            <a-select
              placeholder="请输入"
              v-decorator="decorators.course_id"
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
      addCourseService: AddCourseService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.addCourseService.loading$,
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
      tableData: [],
      ACTIVITY_STATUS,
      RELEASE_STATUS,
      tableText: '', // 优惠设置错误提示
      tableErr: false
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
      data.shop_ids = [+this.form.getFieldValue('shop_id')]
      data.product_type = 4
      data.product_id = this.form.getFieldValue('course_id')
      data.sku = this.tableData.map(item => {
        return {
          sku_id: this.form.getFieldValue('course_id'),
          group_price: item.group_price,
          price: item.price
        }
      })
      this.addCourseService.createGroupbuy(data).subscribe(res => {
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
