<template>
  <st-mina-panel app>
    <div slot="actions">
      <st-button :loading="loading.addGroup" type="primary" @click="onSubmit">
        保 存
      </st-button>
    </div>
    <div>
      <st-form :form="form" labelWidth="118px">
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="活动名称" required>
              <a-input
                v-decorator="decorators.activity_name"
                placeholder="请输入活动名称"
                @change="changeName"
                :disabled="isEdit && activityState > ACTIVITY_STATUS.UNDER_WAY"
              >
                <span slot="suffix">
                  {{ groupName.length }}
                  /30
                </span>
              </a-input>
            </st-form-item>
            <st-form-item required>
              <span slot="label">
                拼团门店
                <st-help-tooltip id="TBPTXJ005" />
              </span>
              <a-select
                showSearch
                v-model="shopId"
                :disabled="isEdit && activityState > ACTIVITY_STATUS.UNDER_WAY"
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
                showSearch
                v-model="courseId"
                placeholder="请输入"
                @change="changeCourse"
                :disabled="isEdit && activityState > ACTIVITY_STATUS.UNDER_WAY"
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
            <st-form-item label="优惠设置" required>
              <div :class="basic('table')">
                <st-table
                  rowKey="id"
                  :columns="cardColumns"
                  :dataSource="tableData"
                  :pagination="false"
                  :scroll="{ y: 230 }"
                  align="center"
                >
                  <template
                    slot="group_price"
                    slot-scope="customRender, record"
                  >
                    <st-input-number
                      v-model="record.group_price"
                      :disabled="
                        isEdit && activityState > ACTIVITY_STATUS.UNDER_WAY
                      "
                    >
                      <template slot="addonAfter">
                        元
                      </template>
                    </st-input-number>
                  </template>
                </st-table>
              </div>
            </st-form-item>
            <st-form-item label="活动时间" required>
              <!-- <st-range-picker
                v-model="decorators.activityTime"
              ></st-range-picker> -->
              <st-range-picker
                :disabledDays="180"
                :value="selectTime"
              ></st-range-picker>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item required>
              <span slot="label">
                参团人数
                <st-help-tooltip id="TBPTXJ001" />
              </span>
              <st-input-number
                v-decorator="decorators.group_sum"
                :disabled="isEdit && activityState > ACTIVITY_STATUS.UNDER_WAY"
              >
                <template slot="addonAfter">
                  人
                </template>
              </st-input-number>
            </st-form-item>
            <st-form-item required>
              <span slot="label">
                拼团有效期
                <st-help-tooltip id="TBPTXJ002" />
              </span>
              <st-input-number
                v-decorator="decorators.valid_time"
                :disabled="isEdit && activityState > ACTIVITY_STATUS.UNDER_WAY"
              >
                <template slot="addonAfter">
                  小时
                </template>
              </st-input-number>
            </st-form-item>
            <st-form-item required>
              <span slot="label">
                活动库存
                <st-help-tooltip id="TBPTXJ003" />
              </span>
              <a-checkbox @change="limitStock" :checked="isLimit">
                限制库存&nbsp;&nbsp;
              </a-checkbox>
              <st-input-number
                :class="basic('stock')"
                v-decorator="decorators.stock_total"
              ></st-input-number>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item required>
              <span slot="label">
                发布状态
                <st-help-tooltip id="TBPTXJ005" />
              </span>
              <a-radio-group
                v-model="releaseStatus"
                :disabled="isEdit && activityState > ACTIVITY_STATUS.UNDER_WAY"
              >
                <a-radio :value="1" :key="1">
                  立即发布
                </a-radio>
                <a-radio :value="2" :key="2">
                  暂不发布
                </a-radio>
                <a-radio :value="3" :key="3">
                  定时发布
                </a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item
              label="发布时间"
              required
              v-if="releaseStatus === 3"
              :disabled="isEdit && activityState > ACTIVITY_STATUS.UNDER_WAY"
            >
              <a-date-picker
                :disabledDate="disabledDate"
                :showTime="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                v-model="publishTime"
              />
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </div>
  </st-mina-panel>
</template>
<script>
import { ruleOptions, cardColumns } from './add-course.config'
import { AddMemberService } from './add-member.service'
import { AddCourseService } from './add-course.service'
import { ACTIVITY_STATUS } from '@/constants/marketing/group-buy'
import moment from 'moment'
export default {
  serviceInject() {
    return {
      addMemberService: AddMemberService,
      addCourseService: AddCourseService
    }
  },
  rxState() {
    return {
      loading: this.addMemberService.loading$,
      shopList: this.addCourseService.shopList$,
      courseList: this.addCourseService.courseList$
    }
  },
  bem: {
    basic: 'brand-marketing-group-course'
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    info(n, o) {
      if (this.isEdit) {
        this.setFieldsValue()
        this.addCourseService.init().subscribe(res => {})
        this.changeShop(this.shopId)
      }
    }
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
      isLimit: false,
      // 发布状态
      releaseStatus: 1,
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
      ACTIVITY_STATUS
    }
  },
  methods: {
    changeShop(value) {
      this.addCourseService.getCourseList({ shop_id: 1 }).subscribe(res => {
        this.$router.reload()
      })
    },
    changeCourse(value) {
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
    onSubmit() {
      this.form.validate().then(values => {
        let params = {}
        let list = []
        this.tableData.forEach((item, index) => {
          list.push({ id: id, group_price: item.group_price })
        })
        params = {
          product_type: 4, // 课程包
          activity_name: values.activity_name, // 活动名称
          product_id: this.courseId, //商品id
          sku: list, //卡、课规格[{“sku_id”:1,”group_price”:20},]
          start_time: this.selectTime.startTime.value,
          end_time: this.selectTime.endTime.value,
          group_sum: values.group_sum, //成团人数
          valid_time: values.valid_time, //拼团有效期
          is_limit_stock: this.isLimit ? 1 : 0, //是否限制库存0不限制 1限制
          stock_total: values.stock_total, //库存
          shop_ids: [this.shopId], //门店ids [1,2,3,4]
          published_type: this.releaseStatus, //发布状态(1-立即发布 2-暂不发布 3-定时发布)
          published_time: moment(this.publishTime).format('YYYY-MM-DD HH:mm') //发布时间
        }
        if (this.isEdit) {
          // 编辑 type为2，3只能编辑名称，结束时间，库存
          this.addMemberService.editGroup(params).subscribe(res => {
            console.log(params, res, '这是编辑返回的数据')
          })
        } else {
          this.addMemberService.addGroup(params).subscribe(res => {
            // 新建成功 todo(路由地址未确定)
            console.log(params, res, '==============')
            // this.$router.push({
            //   path: `/brand/marketing/plugin/group/list`
            // })
          })
        }
      })
    },
    // 详情回显
    setFieldsValue() {
      console.log(this.info, 'support_shop')
      this.groupName = this.info.activity_name
      this.releaseStatus = this.info.published_type
      this.shopId = this.info.support_shop[0].shop_id
      this.selectTime.startTime.value = moment(this.info.start_time)
      this.selectTime.endTime.value = moment(this.info.end_time)
      this.activityState = this.info.activity_state[0].id
      this.courseId = this.info.product.id
      this.tableData = this.info.sku
      this.isLimit = this.info.is_limit_stock === 1
      this.selectTime.startTime.disabled =
        this.activityState > this.ACTIVITY_STATUS.PUBLISHER
      this.form.setFieldsValue({
        activity_name: this.info.activity_name,
        group_sum: this.info.group_sum,
        valid_time: this.info.valid_time,
        stock_total: this.info.stock_total
      })
      console.log(this.info.sku)
    }
  }
}
</script>
