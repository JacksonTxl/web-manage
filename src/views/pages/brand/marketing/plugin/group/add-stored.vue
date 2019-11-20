<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading"
    :isEdit="isEdit"
    :info="info"
    :shopIds="shopIds"
    @onsubmit="onSubmit"
  >
    <template slot="choose-product">
      <a-row :gutter="8">
        <a-col :span="10">
          <st-form-item label="选择储值卡" required>
            <a-input type="hidden" v-decorator="decorators.depositId"></a-input>
            <a-select
              showSearch
              @change="changeSelect"
              placeholder="请选择储值卡"
              v-model="depositId"
              :disabled="isEdit && activityState >= ACTIVITY_STATUS.NO_START"
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in depositList"
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
    </template>
  </group-form>
</template>

<script>
import GroupForm from './components#/group-form'
import { AddMemberService } from './add-member.service'
import { AddStoredService } from './add-stored.service'
import { PatternService } from '@/services/pattern.service'
import { columnsGroupStored, ruleOptions } from './add-stored.config'
import moment, { months } from 'moment'
import {
  ACTIVITY_STATUS,
  RELEASE_STATUS
} from '@/constants/marketing/group-buy'

export default {
  name: 'PageBrandMarketingGroupAddStored',
  bem: {
    basic: 'brand-marketing-group-stored'
  },
  serviceInject() {
    return {
      Add: AddMemberService,
      AddSotred: AddStoredService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.Add.loading$,
      depositList: this.AddSotred.list$
    }
  },
  components: {
    GroupForm
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
      groupParams: {
        type: 2,
        id: null
      },
      activityName: '', // 活动名称
      publishedType: 1, // @parmas=0 立即发布；@parmas=1 暂不发布； @parmas=3 定时发布
      limitStock: true, // 是否限制库存
      publishTime: null, //
      activityState: Number, // 当前活动活动状态
      depositId: '', // 回显下拉选中product
      currentStored: [], // 当前下拉选中详细
      errTips: '', // 活动时间错误提示
      errText: '', // 发布时间错误提示
      helpShow: false,
      showHelp: false,
      shopErrText: '',
      shopHelp: false,
      shopIds: [],
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
      ACTIVITY_STATUS,
      RELEASE_SRTATUS,
      shopList: null
    }
  },
  mounted() {
    if (this.isEdit) {
      this.setFieldsValue()
      this.depositList = this.list
    }
  },
  methods: {
    changeSelect(id) {
      this.form.setFieldsValue({
        depositId: id
      })
      this.depositList.filter(item => {
        if (item.id == id) {
          this.currentStored = item.product_spec
        }
      })
      this.groupParams.id = this.currentStored[0].id
    },
    onSubmit() {
      let formFlag = false
      if (!this.selectTime.startTime.value || !this.selectTime.endTime.value) {
        this.errTips = '请选择活动时间'
        this.helpShow = true
        formFlag = true
      }
      if (
        !this.publishTime &&
        this.publishedType === this.RELEASE_SRTATUS.TIMING
      ) {
        this.errText = '请选择发布时间'
        this.showHelp = true
        formFlag = true
      }
      if (!this.shopList.length) {
        this.shopErrText = '请选择门店'
        this.shopHelp = true
        formFlag = true
      }
      this.form.validate().then(values => {
        if (formFlag) return
        let tmpList = [
          {
            sku_id: this.currentStored[0].id,
            group_price: this.currentStored[0].group_price
          }
        ]
        let params = {
          product_type: 2,
          activity_name: values.activityName,
          product_id: this.depositId,
          sku: tmpList,
          start_time: moment(this.selectTime.startTime.value).format(
            'YYYY-MM-DD HH:mm'
          ),
          end_time: moment(this.selectTime.endTime.value).format(
            'YYYY-MM-DD HH:mm'
          ),
          group_sum: this.group_price,
          valid_time: values.valid_time,
          is_limit_stock: this.limitStock,
          stock_total: values.stock_total,
          shop_ids: this.shopList,
          published_type: this.publishedType,
          published_time: moment(this.publishTime).format('YYYY-MM-DD HH:mm')
        }
        if (!this.isEdit) {
          this.Add.addGroup(params).subscribe(res => {
            console.log(params, res, '这是添加返回的数据')
          })
        } else {
          this.Add.editGroup(params).subscribe(res => {
            console.log(params, res, '这是编辑返回的数据')
          })
        }
      })
    },
    setFieldsValue() {
      this.activityName = this.info.activity_name
      this.publishedType = this.info.published_type
      this.selectTime.startTime.value = moment(this.info.start_time)
      this.selectTime.endTime.value = moment(this.info.end_time)
      this.activityState = this.info.activity_state[0].id
      this.depositId = this.info.product.id
      this.currentStored = this.info.sku
      this.limitStock = this.info.is_limit_stock === 1
      this.shopList = this.info.support_shop || []
      this.selectTime.startTime.disabled =
        this.activityState > this.ACTIVITY_STATUS.PUBLISHER
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
