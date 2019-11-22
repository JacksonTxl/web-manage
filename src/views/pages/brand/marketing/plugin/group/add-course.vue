<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading"
    :shopIds="shopIds"
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
      groupName: '',
      cardColumns,
      courseList: [],
      shopId: '',
      courseId: '',
      tableData: [],
      isLimit: true,
      selectTime: {
        startTime: {
          showTime: false,
          disabledBegin: moment(),
          placeholder: '开始日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD HH:mm',
          change: $event => {}
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD HH:mm',
          change: $event => {},
          disabledDate: this.disabledDate
        }
      },
      publishTime: null,
      activityState: Number,
      ACTIVITY_STATUS,
      RELEASE_STATUS,
      errTips: '', // 活动时间错误提示
      errText: '', // 发布时间错误提示
      tableText: '', // 优惠设置错误提示
      helpShow: false,
      showHelp: false,
      tableErr: false,
      shopIds: []
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
    // 是否限制库存
    limitStock(value) {
      this.isLimit = value.target.checked
    },
    changeName(e) {
      this.groupName = e.target.value
    },
    disabledDate(current) {
      return (
        current &&
        current.format('YYYY-MM-DD HH:mm') < moment().format('YYYY-MM-DD HH:mm')
      )
    },
    onSubmit(data) {
      let list = []
      let isReturn = false
      this.tableData.forEach((item, index) => {
        if (!item.group_price) {
          this.tableText = '请输入拼团价'
          this.tableErr = true
          isReturn = true
        }
        list.push({ id: item.id, group_price: item.group_price })
      })
      let params = {}
      if (isReturn) {
        return
      }
      params = {
        product_type: 4, // 课程包
        activity_name: data.activity_name, // 活动名称
        product_id: this.courseId, //商品id
        sku: list, //卡、课规格[{“sku_id”:1,”group_price”:20},]
        start_time: data.start_time,
        end_time: data.end_time,
        group_sum: data.group_sum, //成团人数
        valid_time: data.valid_time, //拼团有效期
        is_limit_stock: data.is_limit_stock, //是否限制库存0不限制 1限制
        stock_total: data.stock_total, //库存
        shop_ids: [this.shopId], //门店ids [1,2,3,4]
        published_type: data.published_type, //发布状态(1-立即发布 2-暂不发布 3-定时发布)
        published_time: data.published_time //发布时间
      }
      if (this.isEdit) {
        params.id = this.$route.query.id
        this.addMemberService.editGroup(params).subscribe(res => {
          this.$router.push({
            path: `/brand/marketing/plugin/group/list`
          })
        })
      } else {
        this.addMemberService.addGroup(params).subscribe(res => {
          this.$router.push({
            path: `/brand/marketing/plugin/group/list`
          })
        })
      }
    }
  },
  components: {
    GroupForm
  }
}
</script>
