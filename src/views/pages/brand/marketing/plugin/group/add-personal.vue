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
              >
                <span slot="suffix" :class="basic('tip')">
                  {{ groupName.length }}
                  /30
                </span>
              </a-input>
            </st-form-item>
            <st-form-item label="选择私教课" required>
              <a-input type="hidden" v-decorator="decorators.cardId" />
              <a-select
                showSearch
                v-model="cardId"
                placeholder="请选择私教课"
                @change="handleChange"
              >
                <a-select-option
                  v-for="item in personalList"
                  :value="item.brand_id"
                  :key="item.id"
                >
                  {{ item.brand_id }}
                  {{ item.product_name }}
                </a-select-option>
              </a-select>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="拼团课时" required>
              <a-input
                v-decorator="decorators.group_hour"
                placeholder="请输入拼团课时"
                @change="changeHour"
              ></a-input>
            </st-form-item>
          </a-col>
        </a-row>
        <!-- 输入完课时 之后才可以显示优惠设置的教练信息 -->
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
                  v-if="decorators.group_hour"
                  :columns="cardColumns"
                  :dataSource="newCoach"
                  :pagination="false"
                  :scroll="{ y: 230 }"
                  :rowSelection="
                    newCoach.length > 1
                      ? {
                          onChange: onChange,
                          selectedRowKeys: selectedRowKeys
                        }
                      : null
                  "
                  rowKey="id"
                >
                  <!-- rowKey="key" -->
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
          </a-col>
        </a-row>

        <a-row :gutter="8">
          <a-col :span="16">
            <st-form-item
              label="活动时间"
              :help="errTips"
              :validateStatus="helpShow ? 'error' : ''"
              required
            >
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
              <st-input-number v-decorator="decorators.group_sum">
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
              <st-input-number v-decorator="decorators.valid_time">
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
                v-if="isLimit"
                :class="basic('stock')"
                v-decorator="decorators.stock_total"
              ></st-input-number>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="16">
            <st-form-item required>
              <span slot="label">
                选择门店
                <st-help-tooltip id="TBPTXJ004" />
              </span>
              <select-shop
                :class="basic('table')"
                :groupParams="groupParams"
                @change="onSelectShop"
                :shopIds="shopIds"
              ></select-shop>
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
                :defaultValue="releaseStatus || RELEASE_SRTATUS.PROMPTLY"
                v-model="releaseStatus"
                :disabled="isEdit && activityState > RELEASE_SRTATUS.PUBLISHER"
              >
                <a-radio :value="RELEASE_SRTATUS.PROMPTLY">立即发布</a-radio>
                <a-radio :value="RELEASE_SRTATUS.TEMPORARILY">暂不发布</a-radio>
                <a-radio :value="RELEASE_SRTATUS.TIMING">定时发布</a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item
              label="发布时间"
              required
              :help="errText"
              :validateStatus="showHelp ? 'error' : ''"
              v-if="releaseStatus === RELEASE_SRTATUS.TIMING"
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
import {
  ACTIVITY_STATUS,
  RELEASE_SRTATUS
} from '@/constants/marketing/group-buy'
import { ruleOptions, cardColumns } from './add-personal.config'
import SelectShop from '@/views/fragments/shop/select-shop'
import { AddPersonalService } from './add-personal.service'
import moment from 'moment'
import { values } from 'lodash-es'
export default {
  serviceInject() {
    return {
      addPersonalService: AddPersonalService
    }
  },
  rxState() {
    return {
      loading: this.addPersonalService.loading$,
      personalList: this.addPersonalService.personalList$,
      coach: this.addPersonalService.coachList$
    }
  },
  bem: {
    basic: 'brand-marketing-group-member'
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      ACTIVITY_STATUS,
      RELEASE_SRTATUS,
      form,
      decorators,
      groupName: '', // 活动名称
      groupHour: '', // 课程时长
      cardId: '', // 活动商品
      selectedRowKeys: [], // 优惠设置选中项
      isLimit: true, // 限制库存
      shopIds: [], //选择门店
      cardColumns,
      groupParams: {
        type: 3,
        id: null
      },
      // 发布状态
      releaseStatus: 1,
      publishTime: null, // 发布时间
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
      activityState: Number, // 当前活动活动状态
      errTips: '', // 活动时间错误提示
      errText: '', // 发布时间错误提示
      tableText: '', // 优惠设置错误提示
      helpShow: false,
      showHelp: false,
      tableErr: false
    }
  },

  props: {
    // 是否编辑
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
    // 疑问
    info(n, o) {
      if (this.isEdit) {
        this.setFieldsValue()
        this.addMemberService.init().subscribe(res => {
          this.chooseMember(this.cardId)
        })
      }
    }
  },
  updated() {
    // console.log(this.newCoach)
  },
  mounted() {},
  computed: {
    // 教练增加默认课时
    newCoach() {
      let list = []
      this.coach.forEach((item, index) => {
        return list.push({ level: item.level, id: item.id, hour: '--' })
      })
      return list
    }
  },
  methods: {
    // 疑问
    chooseMember(value) {
      this.form.setFieldsValue({
        cardId: value
      })
      this.personalList.filter(item => {
        if (item.id === value) {
          this.newCoach = item.product_spec
          if (this.selectedRowKeys && this.isEdit) {
            this.info.sku.forEach(item => {
              this.newCoach.forEach(card => {
                if (item.id === card.id) {
                  card.group_price = item.group_price
                }
              })
            })
          }
        }
      })
    },
    // 输入拼团课时
    changeHour(e) {
      this.groupHour = e.target.value
      let list = []
      this.newCoach.forEach((item, index) => {
        item.hour = e.target.value
      })
    },
    // 设置选择私教课
    handleChange(e) {
      this.groupParams.id = e
      this.addPersonalService.addCoach({ id: e }).subscribe(res => {})
    },
    // 优惠设置选择变化
    onChange(value) {
      this.selectedRowKeys = value
      console.log(this.selectedRowKeys, '选择优惠设置')
    },
    // 是否限制库存
    limitStock(value) {
      this.isLimit = value.target.checked
      console.log(this.isLimit, '限制库存')
    },
    // 选择门店
    onSelectShop(shopIds) {
      this.shopIds = shopIds
      console.log(this.shopIds, '选择门店')
    },
    // 为了同步字数
    changeName(e) {
      this.groupName = e.target.value
      console.log(this.groupName, '活动名称')
    },
    // select选择设置开始时间不能小于现在
    disabledDate(current) {
      return (
        current &&
        current.format('YYYY-MM-DD HH:mm') < moment().format('YYYY-MM-DD HH:mm')
      )
    },
    // 新建拼团活动
    onSubmit() {
      this.form.validate().then(values => {
        if (
          !this.selectTime.startTime.value ||
          !this.selectTime.endTime.value
        ) {
          console.log(1)
          this.errTips = '请选择活动时间'
          this.helpShow = true
          return
        }
        if (
          !this.publishTime &&
          this.releaseStatus === this.RELEASE_SRTATUS.TIMING
        ) {
          this.errText = '请选择发布时间'
          this.showHelp = true
          return
        }
        if (!this.selectedRowKeys.length) {
          this.tableText = '请选择私教课规格'
          this.tableErr = true
        }
        let params = {}
        let isReturn = false
        let list = []
        this.selectedRowKeys.forEach((id, index) => {
          this.newCoach.forEach(item => {
            if (item.id === id) {
              if (!item.group_price) {
                this.tableText = '请输入拼团价'
                this.tableErr = true
                isReturn = true
              }
              list.push({ sku_id: id, group_price: item.group_price })
            }
          })
        })
        if (isReturn) {
          return
        }
        params = {
          product_type: 1, // 会籍卡
          activity_name: values.activity_name, // 活动名称
          product_id: this.cardId, //商品id
          sku: list, //卡、课规格[{“sku_id”:1,”group_price”:20},]
          start_time: this.selectTime.startTime.value,
          end_time: this.selectTime.endTime.value,
          group_sum: values.group_sum, //成团人数
          valid_time: values.valid_time, //拼团有效期
          is_limit_stock: this.isLimit ? 1 : 0, //是否限制库存0不限制 1限制
          stock_total: values.stock_total, //库存
          shop_ids: this.shopIds, //门店ids [1,2,3,4]
          published_type: this.releaseStatus, //发布状态(1-立即发布 2-暂不发布 3-定时发布)
          published_time: moment(this.publishTime).format('YYYY-MM-DD HH:mm') //发布时间
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
      })
    },
    // 详情回显
    setFieldsValue() {
      this.groupName = this.info.activity_name
      this.releaseStatus = this.info.published_type
      this.selectTime.startTime.value = moment(this.info.start_time)
      this.selectTime.endTime.value = moment(this.info.end_time)
      this.activityState = this.info.activity_state[0].id
      this.cardId = this.info.product.id
      this.isLimit = this.info.is_limit_stock === 1
      this.selectTime.startTime.disabled =
        this.activityState > this.ACTIVITY_STATUS.PUBLISHER
      this.form.setFieldsValue({
        activity_name: this.info.activity_name,
        group_sum: this.info.group_sum,
        valid_time: this.info.valid_time,
        stock_total: this.info.stock_total
      })
      this.info.sku.forEach(item => {
        this.selectedRowKeys.push(item.id)
      })
      this.shopIds = this.info.shop_ids
    }
  },
  components: {
    SelectShop
  }
}
</script>
