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
                v-decorator="decorators.group_name"
                placeholder="请输入活动名称"
                @change="changeName"
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
                    <st-input-number v-model="record.group_price">
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
              <st-input-number v-decorator="decorators.num">
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
              <st-input-number v-decorator="decorators.time">
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
                v-decorator="decorators.stock"
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
              <a-radio-group v-model="releaseStatus">
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
            <st-form-item label="发布时间" required v-if="releaseStatus === 3">
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
    info: {
      type: Object,
      default: () => {}
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
      // shopList: [
      //   {
      //     brand_id: 1,
      //     shop_id: 12,
      //     province_id: 310000,
      //     province_name: '上海市',
      //     city_id: 310100,
      //     city_name: '上海市',
      //     district_id: 310106,
      //     district_name: '静安区',
      //     shop_name: 'kael的1店'
      //   },
      //   {
      //     brand_id: 1,
      //     shop_id: 13,
      //     province_id: 310000,
      //     province_name: '上海市',
      //     city_id: 310100,
      //     city_name: '上海市',
      //     district_id: 310106,
      //     district_name: '静安区',
      //     shop_name: 'kael的1店'
      //   }
      // ],
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
      publishTime: null
    }
  },
  props: {
    // 是否是编辑0:新建，1:已发布, 2:暂不发布, 3:定时发布
    editType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    // console.log('------------', this.info)
  },
  methods: {
    changeShop(value) {
      console.log('0000000000000000000000')
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
        console.log(this.editType, 'this.editType')
        let params = {}
        if (this.editType === 1 || this.editType === 3) {
          // 编辑
          params = {
            id: 1,
            product_type: 4,
            activity_name: values.activity_name,
            end_time: this.selectTime.endTime.value,
            stock_total: values.stock_total
          }
        } else {
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
        }
        if (this.editType) {
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
    }
  }
}
</script>
