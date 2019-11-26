<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading.addGroup"
    :isEdit="true"
    :info="info"
    :confirmLoading="loading.editGroupbuy"
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
              :disabled="disabledEdit"
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
              :disabled="disabledEdit"
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
                    :disabled="disabledEdit"
                    @input="setPriceChange"
                    style="width:110px;"
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
import { ruleOptions, cardColumns } from './add-package-course.config'
import { EditCoursePackageService } from './edit-package-course.service'
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
      editCoursePackageService: EditCoursePackageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.editCoursePackageService.loading$,
      shopList: this.userService.shopList$,
      courseList: this.editCoursePackageService.courseList$,
      info: this.editCoursePackageService.info$
    }
  },
  bem: {
    basic: 'brand-marketing-group-course'
  },
  mounted() {
    this.editCourseService
      .getCourseList({ shop_id: this.info.support_shop[0] })
      .subscribe(res => {
        this.setFieldsValue()
      })
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
      disabledEdit: false,
      oldStock: Number
    }
  },
  methods: {
    changeShop(value) {
      this.editCourseService
        .getCourseList({ shop_id: value })
        .subscribe(res => {
          this.$router.reload()
        })
    },
    changeCourse(value) {
      this.tableData = this.courseList.filter(
        item => item.id === value
      )[0].product_spec
    },
    // 处理输入拼团价格的逻辑
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
          path: `./list`
        })
      })
    },
    // 详情回显
    setFieldsValue() {
      console.log(this.info)
      this.oldStock = this.info.stock_total
      this.oldTime = new Date(this.info.end_time)
      this.form.setFieldsValue({
        shop_id: this.info.support_shop[0],
        course_id: this.info.product.id
      })
      // 是否能够编辑, 当活动未开始时可以编辑
      this.disabledEdit =
        this.info.activity_state.id >= ACTIVITY_STATUS.NO_START
      // 将详情信息中的sku和courseList中选中的某项课程包中的product_spec进行合并,得到一个含有price和group_price的数组,赋值给tableData
      this.tableData = this.info.sku.map((item, key) => {
        let courseProductSpec = this.courseList
          .filter(course => item.sku_id === course.id)
          .shift().product_spec
        return Object.assign({}, item, courseProductSpec[key])
      })
    }
  },
  components: {
    GroupForm
  }
}
</script>
