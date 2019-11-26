<template>
  <st-mina-panel app>
    <div slot="actions">
      <st-button :loading="confirmLoading" type="primary" @click="onSubmit">
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
                maxlength="30"
              >
                <span :class="basic('name--gray')" slot="suffix">
                  {{ groupName.length }}
                  /30
                </span>
              </a-input>
            </st-form-item>
          </a-col>
        </a-row>
        <slot name="choose-product"></slot>
        <a-row :gutter="8">
          <a-col :span="16">
            <st-form-item label="活动时间" required>
              <st-range-picker-2
                :disabledDays="180"
                :options="activityOptions"
                v-decorator="decorators.activity_time"
              ></st-range-picker-2>
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
                :disabled="isEdit && activityState > ACTIVITY_STATUS.PUBLISHER"
                v-decorator="decorators.group_sum"
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
                :disabled="isEdit && activityState > ACTIVITY_STATUS.PUBLISHER"
                v-decorator="decorators.valid_time"
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
              <a-checkbox
                @change="limitStock"
                :checked="isLimit"
                :disabled="isEdit && activityState > ACTIVITY_STATUS.PUBLISHER"
              >
                限制库存&nbsp;&nbsp;
              </a-checkbox>
              <st-input-number
                v-if="isLimit"
                :class="basic('stock')"
                v-decorator="decorators.stock_total"
                :disabled="isEdit && activityState >= ACTIVITY_STATUS.END"
              ></st-input-number>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8" v-if="showSelectShop">
          <a-col :span="16">
            <st-form-item
              required
              :help="errTips"
              :validateStatus="showErr ? 'error' : ''"
              :class="basic('shop')"
            >
              <span slot="label">
                选择门店
                <st-help-tooltip id="TBPTXJ004" />
              </span>
              <!-- <select-shop
                :class="basic('table')"
                @change="onSelectShop"
                :shopIds="shopIds"
              ></select-shop> -->
              <st-container>
                <st-t4 :class="basic('shop--set')">
                  设置支持会员卡售卖场馆范围
                </st-t4>
                <select-shop
                  :shopIds="info ? info.support_shop : []"
                  type="group"
                  :groupParams="groupParams"
                  @change="onSelectShop"
                  ref="selectShop"
                ></select-shop>
              </st-container>
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
                :defaultValue="releaseStatus || RELEASE_STATUS.PROMPTLY"
                v-model="releaseStatus"
                :disabled="isEdit && activityState > ACTIVITY_STATUS.PUBLISHER"
              >
                <a-radio :value="RELEASE_STATUS.PROMPTLY">立即发布</a-radio>
                <a-radio :value="RELEASE_STATUS.TEMPORARILY">暂不发布</a-radio>
                <a-radio :value="RELEASE_STATUS.TIMING">定时发布</a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item
              label="发布时间"
              required
              v-show="releaseStatus === RELEASE_STATUS.TIMING"
            >
              <a-date-picker
                :disabledDate="disabledDate"
                :showTime="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                v-decorator="decorators.published_time"
              />
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </div>
  </st-mina-panel>
</template>
<script>
import SelectShop from '@/views/fragments/shop/select-shop'
import moment from 'moment'
import { values } from 'lodash-es'
import {
  ACTIVITY_STATUS,
  RELEASE_STATUS
} from '@/constants/marketing/group-buy'
export default {
  bem: {
    basic: 'brand-marketing-group-form'
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
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    decorators: {
      type: Object,
      default: () => {
        return {}
      }
    },
    groupParams: {
      type: Object,
      default: () => {
        return {
          type: null,
          id: null
        }
      }
    },
    loading: {
      type: Boolean
    },
    confirmLoading: {
      type: Boolean
    },
    showSelectShop: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  mounted() {
    if (this.isEdit) {
      this.setFieldsValue()
    }
  },
  data() {
    return {
      ACTIVITY_STATUS,
      RELEASE_STATUS,
      groupName: '',
      errTips: '', // 活动时间错误提示
      showErr: false,
      activityState: Number, // 当前活动活动状态
      isLimit: true,
      releaseStatus: 1, // 发布状态
      publishTime: null,
      activityOptions: {
        start: {
          showTime: true,
          disabledBegin: moment().format('YYYY-MM-DD'),
          placeholder: '开始日期',
          disabled: false,
          format: 'YYYY-MM-DD HH:mm:ss'
        },
        end: {
          showTime: true,
          placeholder: '结束日期',
          disabled: false,
          format: 'YYYY-MM-DD HH:mm:ss'
        }
      },
      shopIds: []
    }
  },
  methods: {
    updateShop() {
      this.$refs.selectShop.clearShopList()
    },
    // 是否限制库存
    limitStock(value) {
      this.isLimit = value.target.checked
    },
    // 选择门店
    onSelectShop(shopIds) {
      this.shopIds = shopIds
      if (this.shopIds.length) {
        this.errTips = ''
        this.showErr = false
      }
    },
    // 为了同步字数
    changeName(e) {
      this.groupName = e.target.value
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
      let shopFlag = false
      if (this.showSelectShop && !this.shopIds.length) {
        this.errTips = '请选择门店'
        this.showErr = true
        shopFlag = true
      }
      this.form.validate().then(values => {
        if (shopFlag) return
        this.$emit('onsubmit', {
          activity_name: values.activity_name, // 活动名称
          start_time: moment(values.activity_time[0]).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          end_time: moment(values.activity_time[1]).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          group_sum: +values.group_sum, //成团人数
          valid_time: +values.valid_time, //拼团有效期
          is_limit_stock: this.isLimit ? 1 : 0, //是否限制库存0不限制 1限制
          stock_total: this.isLimit ? +values.stock_total : 0, //库存
          shop_ids: this.shopIds, //门店ids [1,2,3,4]
          published_type: this.releaseStatus, //发布状态(1-立即发布 2-暂不发布 3-定时发布)
          published_time: moment(values.published_time).format(
            'YYYY-MM-DD HH:mm:ss'
          ) //发布时间
        })
      })
    },
    // 详情回显
    setFieldsValue() {
      this.releaseStatus = this.info.published_type
      this.activityState = Number(this.info.activity_state.id)
      this.isLimit = this.info.is_limit_stock === 1
      this.shopIds = this.info.support_shop
      this.groupName = this.info.activity_name
      this.form.setFieldsValue({
        activity_name: this.info.activity_name,
        group_sum: this.info.group_sum,
        valid_time: this.info.valid_time,
        stock_total: this.info.stock_total,
        activity_time: [this.info.start_time, this.info.end_time]
      })
      if (this.releaseStatus === RELEASE_STATUS.TIMING) {
        this.form.setFieldsValue({
          published_time: moment(this.info.published_time)
        })
      }
      // 编辑不能改变活动开始时间
      this.activityOptions.start.disabled =
        this.isEdit && this.activityState > this.ACTIVITY_STATUS.PUBLISHER
      // 活动结束不能改变活动结束时间
      this.activityOptions.end.disabled =
        this.isEdit && this.activityState >= this.ACTIVITY_STATUS.END
    }
  },
  components: {
    SelectShop
  }
}
</script>
