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
            <st-container>
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
                    @input="setPriceChange"
                    style="width:110px;"
                  >
                    <template slot="addonAfter">
                      元
                    </template>
                  </st-input-number>
                </template>
              </st-table>
            </st-container>
          </st-form-item>
        </a-col>
      </a-row>
    </template>
  </group-form>
</template>
<script>
import GroupForm from './components#/group-form'
import { ruleOptions, cardColumns } from './add-package-course.config'
import { AddPackageCourseService } from './add-package-course.service'
import { UserService } from '@/services/user.service'
import { PRODUCT_TYPE } from '@/constants/marketing/group-buy'
import moment from 'moment'
import { PatternService } from '@/services/pattern.service'
export default {
  serviceInject() {
    return {
      addPackageCourseService: AddPackageCourseService,
      userService: UserService,
      pattern: PatternService
    }
  },
  components: {
    GroupForm
  },
  rxState() {
    return {
      loading: this.addPackageCourseService.loading$,
      shopList: this.userService.shopList$,
      courseList: this.addPackageCourseService.courseList$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      cardColumns,
      tableData: [],
      tableText: '', // 优惠设置错误提示
      tableErr: false,
      PRODUCT_TYPE
    }
  },
  methods: {
    changeShop(value) {
      this.addPackageCourseService
        .getCourseList({ shop_id: value })
        .subscribe(res => {})
    },
    changeCourse(value) {
      this.tableData = this.courseList.filter(
        item => item.id === value
      )[0].product_spec
      this.tableData[0].is_select = true
    },
    setPriceChange() {
      if (!this.tableData[0].group_price) {
        this.tableText = '请输入拼团价格'
        this.tableErr = true
      } else {
        this.tableText = ''
        this.tableErr = false
      }
    },
    onSubmit(data) {
      data.shop_ids = [+this.form.getFieldValue('shop_id')]
      data.product_type = PRODUCT_TYPE.PACKAGE_COURSE
      data.product_id = this.form.getFieldValue('course_id')
      data.sku = this.tableData.map(item => {
        return {
          sku_id: this.form.getFieldValue('course_id'),
          group_price: item.group_price,
          price: item.price
        }
      })
      this.addPackageCourseService.createGroupbuy(data).subscribe(res => {
        this.$router.push({
          path: `./list`
        })
      })
    }
  }
}
</script>
