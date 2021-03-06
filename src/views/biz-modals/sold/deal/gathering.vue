<template>
  <st-modal
    title="订单收款"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-deal-gathering"
    @cancel="onCancel"
  >
    <div :class="gathering('content')">
      <a-row :class="gathering('info')">
        <a-col :span="13" class="mg-b36" v-if="type !== 'cloud_store'">
          <st-info>
            <st-info-item label="订单号">{{ info.order_id }}</st-info-item>
            <st-info-item class="mg-b0" label="下单时间">
              {{ info.order_time }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mg-b36" v-if="type !== 'cloud_store'">
          <st-info>
            <st-info-item label="下单人">{{ info.operate_name }}</st-info-item>
            <st-info-item class="mg-b0" label="销售">
              {{ info.sale_name }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mg-b36">
          <st-info>
            <st-info-item label="门店" v-if="type === 'venues'">
              {{ info.shop_name }}
            </st-info-item>
            <st-info-item label="场馆" v-else>
              {{ info.shop_name }}
            </st-info-item>
            <st-info-item label="用户">
              {{ info.member_name }}&nbsp;{{
                info.is_minors ? '' : info.member_mobile
              }}
            </st-info-item>
            <st-info-item
              class="mg-b0 white-nowrap"
              label="购买"
              v-if="type === 'venues'"
            >
              <!-- <div v-for="(item, index) in info.venues_site" :key="index">
                {{
                  `场地时间${index++} ${item.site_name} ${item.time_start}~${
                    item.time_end
                  } 金额：&yen;${item.price}元`
                }}
              </div> -->
              <st-overflow-text
                title="购买"
                max-width="180px"
                :value="
                  info.venues_site &&
                    info.venues_site.map(
                      item =>
                        `${item.site_name} ${item.time_start}~${
                          item.time_end
                        } 金额：&yen;${item.price}元`
                    )
                "
              ></st-overflow-text>
            </st-info-item>
            <!-- 云店 -->
            <st-info-item
              class="mg-b0 white-nowrap"
              label="购买"
              v-else-if="type === 'cloud_store'"
            >
              <st-overflow-text
                title="购买"
                max-width="180px"
                :value="
                  info.order_sub &&
                    info.order_sub.map(
                      item =>
                        `${item.product_name}${item.rule_name ? '规格：' : ''}${
                          item.rule_name
                        }*${item.product_count} 金额：&yen;${item.price}`
                    )
                "
              ></st-overflow-text>
            </st-info-item>
            <st-info-item class="mg-b0" label="购买" v-else>
              {{ info.rule_name }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mg-b36">
          <st-info v-if="type === 'venues'">
            <st-info-item label="场馆">
              {{ info.venues_name }}
            </st-info-item>
            <st-info-item class="mg-b0" label="预约日期">
              {{ info.reserve_day }}
            </st-info-item>
          </st-info>
          <st-info v-else>
            <st-info-item label="定金抵扣">
              {{ info.advance_amount }}
            </st-info-item>
            <st-info-item class="mg-b0" label="赠送">
              {{ info.gift_amount }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mg-b24">
          <st-info>
            <st-info-item label="订单总额">
              {{ info.order_amount }}
            </st-info-item>
            <st-info-item class="mg-b0" label="优惠金额">
              {{ info.discount_amount }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mg-b24">
          <st-info>
            <st-info-item label="减免金额">
              {{ info.reduce_amount }}
            </st-info-item>
            <st-info-item class="mg-b0" label="应付金额">
              {{ info.actual_amount }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24" class="mg-b36" v-if="type !== 'cloud_store'">
          <st-info>
            <st-info-item class="mg-b0" label="备注">
              {{ info.description }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="72px">
        <div :class="gathering('gathering')">
          <st-form-item
            labelWidth="120px"
            label="已收金额/未收金额"
            class="mg-b16"
            v-if="type !== 'venues'"
          >
            <span class="total">
              {{ info.payed_amount }}/{{ info.remain_amount }}
            </span>
          </st-form-item>
          <st-form-item
            class="mg-b16"
            label="支付金额"
            v-if="type === 'venues'"
          >
            {{ info.actual_amount }}
          </st-form-item>
          <st-form-item class="mg-b16" label="支付金额" required v-else>
            <st-input-number
              :float="true"
              :max="info.remain_amount | dealMaxNumber"
              v-decorator="decorators.price"
            >
              <template slot="addonAfter">
                元
              </template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" class="mg-b16" required>
            <a-radio-group
              @change="selectPay"
              v-decorator="decorators.payment_method"
            >
              <a-radio
                :value="item"
                :key="index"
                v-for="(item, index) in paymentMethodList"
              >
                {{ item.payment_type_name }}
              </a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item
            label="储值卡"
            class="mg-b16"
            v-if="selectPayValues.payment_type === 0"
            required
          >
            <a-select
              placeholder="请选择储值卡"
              v-decorator="decorators.deposit_card_id"
            >
              <a-select-option
                :value="item.id"
                :key="index"
                v-for="(item, index) in selectPayValues.deposit"
              >
                {{ item.card_name }}--{{ item.now_amount }}元
              </a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item
            label="备注"
            class="mg-b16"
            v-if="type === 'cloud_store'"
          >
            <a-textarea
              placeholder="请填写备注"
              style="height:90px;"
              v-model="description"
            ></a-textarea>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button
        type="primary"
        @click="onSubmit"
        :loading="loading.payTransaction"
      >
        确认收款
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { GatheringService } from './gathering.service'
import { ruleOptions } from './gathering.config'
export default {
  name: 'ModalSoldDealGathering',
  bem: {
    gathering: 'modal-sold-deal-gathering'
  },
  serviceProviders() {
    return [GatheringService]
  },
  serviceInject() {
    return {
      gatheringService: GatheringService
    }
  },
  rxState() {
    return {
      info: this.gatheringService.info$,
      loading: this.gatheringService.loading$,
      paymentMethodList: this.gatheringService.paymentMethodList$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      selectPayValues: 0,
      description: ''
    }
  },
  // 订单id，签单类型
  props: ['order_id', 'type'],
  created() {
    this.gatheringService
      .getPaymentInfo(this.order_id, this.type)
      .subscribe(result => {
        this.gatheringService.getPaymentMethodList(this.order_id).subscribe()
      })
  },
  filters: {
    dealMaxNumber: value => {
      if (!value) return
      return Number(value.substr(0, value.length - 1))
    }
  },
  methods: {
    // 关闭modal
    onCancel() {
      this.show = false
      this.$emit('cancel')
    },
    selectPay(checkedValues) {
      this.selectPayValues = checkedValues.target.value
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        values.order_id = this.order_id
        values.payment_type = values.payment_method.payment_type
        values.description = this.description || undefined
        delete values.payment_method
        if (this.type === 'venues') {
          values.price = this.info.order_price
        }
        this.gatheringService.payTransaction(values).subscribe(result => {
          this.$emit('success', {
            type: 'pay'
          })
          this.show = false
        })
      })
    }
  }
}
</script>
