<template>
  <st-modal
    title="添加定金"
    size="small"
    v-model="show"
    @cancel="onCancel"
    wrapClassName="modal-sold-deal-sale"
  >
    <div>
      <st-form :form="form" labelWidth="88px">
        <div>
          <member-search :form="form" :saleRangeType="1"></member-search>
          <st-form-item label="定金金额" required>
            <st-input-number
              :min="1"
              :max="99999"
              :float="true"
              placeholder="请输入定金金额"
              @change="changeMoney"
              v-decorator="decorators.pay_price"
            >
              <!-- <span slot="addonAfter">元</span> -->
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" class="mg-b16" required>
            <a-radio-group v-decorator="decorators.pay_channel">
              <a-radio
                :value="item.payment_type"
                :key="index"
                v-for="(item, index) in paymentMethodList"
              >
                {{ item.payment_type_name }}
              </a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item required>
            <template slot="label">
              合同编号
              <st-help-tooltip id="TSSD001" />
            </template>
            <div :class="sale('contract')">
              <a-input
                v-decorator="decorators.contract_number"
                placeholder="请输入合同编号"
              ></a-input>
              <auto-contract-btn
                class="create-button"
                @click="onCodeNumber"
                :loading="loading.getCodeNumber"
              >
                自动生成
              </auto-contract-btn>
            </div>
          </st-form-item>
        </div>
        <div>
          <st-form-item label="销售人员">
            <a-select
              v-decorator="decorators.sale_id"
              placeholder="选择签单的工作人员"
            >
              <a-select-option
                v-for="(item, index) in saleList"
                :key="index"
                :value="item.id"
              >
                {{ item.staff_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0">
            <st-textarea
              v-decorator="decorators.description"
              :autosize="{ minRows: 4, maxRows: 6 }"
              :maxlength="200"
            />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <div :class="sale('footer')">
        <div class="price">
          <span>{{ money }}元</span>
          <!-- <span>{{ selectedNorm.price }}元</span> -->
        </div>
        <div class="button">
          <st-button
            type="primary"
            @click="onSubmit"
            :loading="loading.addEarnest"
          >
            确认收款
          </st-button>
        </div>
      </div>
    </template>
  </st-modal>
</template>

<script>
import { AddService } from './add.service'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from './add.config'
import { CODE_NUMBER } from '@/constants/sold/transaction'
import autoContractBtn from '@/views/biz-components/contract/auto-contract-btn.vue'
import MemberSearch from '@/views/biz-components/member-search/member-search'
export default {
  name: 'ModalShopFinanceGatheringEarnest',
  bem: {
    sale: 'modal-sold-deal-sale'
  },
  components: {
    autoContractBtn,
    MemberSearch
  },
  serviceProviders() {
    return [AddService]
  },
  serviceInject() {
    return {
      addService: AddService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$,
      memberList: this.addService.memberList$,
      saleList: this.addService.saleList$,
      paymentMethodList: this.addService.paymentMethodList$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      CODE_NUMBER,
      form,
      decorators,
      show: false,
      money: 0
    }
  },
  mounted() {
    this.addService.serviceInit().subscribe()
  },
  methods: {
    changeMoney(event) {
      this.money = event
    },
    onCodeNumber() {
      this.addService.getCodeNumber(this.CODE_NUMBER.EARNEST).subscribe(res => {
        this.form.setFieldsValue({
          contract_number: res.info.code
        })
      })
    },
    onCancel() {
      this.addService.memberList$.commit(() => [])
    },
    onSubmit() {
      this.form.validate().then(values => {
        this.addService
          .addEarnest({
            ...values,
            mobile: values.mobile ? values.mobile.phone : undefined,
            is_minors: values.is_minors,
            parent_name: values.parent_name,
            parent_mobile: values.parent_mobile
              ? values.parent_mobile.phone
              : undefined,
            parent_country_prefix: values.parent_mobile
              ? values.parent_mobile.code_id
              : undefined,
            parent_user_role: values.parent_user_role
          })
          .subscribe(result => {
            this.$emit('success', {
              type: 'create',
              orderId: result.info.order_id
            })
            this.show = false
          })
      })
    }
  }
}
</script>
