<template>
  <st-mina-panel :class="basic()">
    <div>
      <st-form :form="form" labelWidth="118px">
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="活动名称" required>
              <a-input
                placeholder="请输入活动名称"
                v-decorator="decorators.activity_name"
                maxlength="30"
                @change="changeName"
                :disabled="isEdit && activityState > ACTIVITY_STATUS.UNDER_WAY"
              >
                <span slot="suffix" :disabled="isEdit">
                  {{ activityName.length > 30 ? 30 : activityName.length }}
                  /30
                </span>
              </a-input>
            </st-form-item>
            <st-form-item label="选择储值卡" require>
              <a-select
                showSearch
                @change="changeSelect"
                placeholder="请选择储值卡"
                v-model="storedId"
                :disabled="isEdit && activityState >= ACTIVITY_STATUS.NO_START"
              >
                <a-select-option
                  :value="item.id"
                  v-for="(item, index) in list"
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
                  :dataSource="currentStored"
                  :columns="columnsGroupStored"
                  :pagination="false"
                >
                  <template slot="discount" slot-scope="customRender, record">
                    <st-input-number
                      :float="true"
                      v-model="record.group_price"
                      style="width:100px;"
                      :disabled="
                        isEdit && activityState >= ACTIVITY_STATUS.NO_START
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
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="11">
            <st-form-item label="活动时间" required>
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
              <template slot="label">
                参团人数
                <st-help-tooltip id="TBPTXJ001" />
              </template>
              <st-input-number
                v-decorator="decorators.group_sum"
                :disabled="isEdit && activityState >= ACTIVITY_STATUS.NO_START"
              >
                <template slot="addonAfter">
                  人
                </template>
              </st-input-number>
            </st-form-item>
            <st-form-item required>
              <template slot="label">
                拼团有效期
                <st-help-tooltip id="TBPTXJ002" />
              </template>
              <st-input-number
                v-decorator="decorators.valid_time"
                :disabled="isEdit && activityState >= ACTIVITY_STATUS.NO_START"
              >
                <template slot="addonAfter">
                  小时
                </template>
              </st-input-number>
            </st-form-item>
            <st-form-item required>
              <template slot="label">
                活动库存
                <st-help-tooltip id="TBPTXJ003" />
              </template>
              <a-checkbox @change="checkBox" :checked="!!limitStock">
                限制库存
              </a-checkbox>
              <st-input-number
                v-decorator="decorators.stock_total"
                :min="0"
                :disabled="isEdit && activityState >= ACTIVITY_STATUS.NO_START"
                style="width: 200px;"
              ></st-input-number>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="16">
            <st-form-item label="选择门店" :class="basic('shop')" required>
              <div :class="basic('shop--container')">
                <st-t4 :class="basic('shop--set')">
                  设置支持会员卡售卖场馆范围
                </st-t4>
                <select-shop @change="getShopId"></select-shop>
              </div>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="发布状态" required>
              <a-radio-group
                :defaultValue="publishedType || 1"
                v-model="publishedType"
                :disabled="isEdit && activityState > ACTIVITY_STATUS.PUBLISHER"
              >
                <a-radio :value="1">立即发布</a-radio>
                <a-radio :value="2">暂不发布</a-radio>
                <a-radio :value="3">定时发布</a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item label="发布时间" required v-if="publishedType === 3">
              <a-date-picker
                @change="changeTime"
                :showTime="{ format: 'HH:mm' }"
                :disabledDate="disabledDate"
                format="YYYY-MM-DD HH:mm"
              />
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
      <div slot="actions">
        <st-button type="primary">
          确 定
        </st-button>
      </div>
    </div>
  </st-mina-panel>
</template>

<script>
import SelectShop from '@/views/fragments/shop/select-shop'
import { AddMemberService } from './add-member.service'
import { AddStoredService } from './add-stored.service'
import { columnsGroupStored, ruleOptions } from './add-stored.config'
import moment, { months } from 'moment'
import { ACTIVITY_STATUS } from '@/constants/marketing/group-buy'

export default {
  // name: PageBrandMarketingGroupAddStored,
  bem: {
    basic: 'brand-marketing-group-stored'
  },
  serviceInject() {
    return {
      AddCopy: AddMemberService,
      Add: AddStoredService
    }
  },
  rxState() {
    return {
      loading$: this.Add.loading$
    }
  },
  components: {
    SelectShop
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      columnsGroupStored,
      activityName: '',
      publishedType: 1, // @parmas=0 立即发布；@parmas=1 暂不发布； @parmas=3 定时发布
      limitStock: 0,
      rangeTime: [],
      activityState: Number, // 当前活动活动状态
      storedId: '', // 回显下拉选中product
      currentStored: [], // 当前下拉选中详细
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
      ACTIVITY_STATUS
    }
  },
  mounted() {
    if (this.isEdit) {
      this.setFieldsValue()
    }
  },
  methods: {
    changeTime(val) {
      console.log(val)
    },
    getShopId(shopId) {
      console.log(shopId)
    },
    changeSelect(id) {
      this.list.filter(item => {
        if (item.id == id) {
          this.currentStored = item.product_spec
        }
      })
    },
    changeName(e) {
      this.activityName = e.target.value
    },
    checkBox(e) {
      console.log(e.target.checked)
    },
    disabledDate(current) {
      return (
        current &&
        current.format('YYYY-MM-DD HH:mm') < moment().format('YYYY-MM-DD HH:mm')
      )
    },
    setFieldsValue() {
      this.activityName = this.info.activity_name
      this.publishedType = this.info.published_type
      this.selectTime.startTime.value = moment(this.info.start_time)
      this.selectTime.endTime.value = moment(this.info.end_time)
      this.activityState = this.info.activity_state[0].id
      this.storedId = this.info.product.id
      this.currentStored = this.info.sku
      this.limitStock = this.info.is_limit_stock
      this.selectTime.startTime.disabled =
        this.activityState < this.ACTIVITY_STATUS.NO_START
      this.form.setFieldsValue({
        activity_name: this.info.activity_name,
        group_sum: this.info.group_sum,
        valid_time: this.info.valid_time,
        stock_total: this.info.stock_total
      })
    }
  }
}
</script>
