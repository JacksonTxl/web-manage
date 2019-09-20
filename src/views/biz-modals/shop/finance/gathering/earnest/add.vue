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
          <st-form-item v-if="searchMemberIsShow" label="预定会员" required>
            <a-select
              showSearch
              allowClear
              placeholder="输入手机号或会员名搜索"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="false"
              v-decorator="decorators.member_id"
              @search="onMemberSearch"
              notFoundContent="无搜索结果"
            >
              <a-select-option
                v-for="(item, index) in memberList"
                :value="item.id"
                :key="index"
              >
                <span
                  v-html="
                    `${item.member_name} ${item.mobile}`.replace(
                      new RegExp(memberSearchText, 'g'),
                      `\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`
                    )
                  "
                >
                  {{ item.member_name }} {{ item.mobile }}
                </span>
              </a-select-option>
            </a-select>
            <p
              v-if="!memberList.length && memberSearchText !== ''"
              class="mg-b0"
            >
              查无此会员，
              <a @click="onAddMember">添加新会员？</a>
            </p>
          </st-form-item>
          <st-form-item v-if="!searchMemberIsShow" label="会员姓名" required>
            <a-input
              v-decorator="decorators.member_name"
              placeholder="请输入会员姓名"
            ></a-input>
          </st-form-item>
          <st-form-item v-if="!searchMemberIsShow" label="手机号" required>
            <a-input
              v-decorator="decorators.mobile"
              placeholder="请输入手机号"
            ></a-input>
            <p class="mg-b0">
              <a @click="onCancelMember">取消添加</a>
            </p>
          </st-form-item>
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
              <st-button
                class="create-button"
                @click="onCodeNumber"
                :loading="loading.getCodeNumber"
              >
                自动生成
              </st-button>
            </div>
          </st-form-item>
        </div>
        <div>
          <st-form-item label="销售人员" required>
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
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
import { timer } from 'rxjs'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from './add.config'
export default {
  name: 'ModalSoldDealSaleMemberCard',
  bem: {
    sale: 'modal-sold-deal-sale'
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
  props: {},
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      // 搜索会员
      memberSearchText: '',
      searchMemberIsShow: true,
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
    // 搜索会员
    onMemberSearch(data) {
      this.memberSearchText = data
      if (data === '') {
        this.addService.memberList$.commit(() => [])
        this.form.resetFields(['member_id'])
      } else {
        this.addService.getMember(data, 1).subscribe(res => {
          if (!res.list.length) {
            this.form.resetFields(['member_id'])
          }
        })
      }
    },
    // 切换添加会员
    onAddMember() {
      this.searchMemberIsShow = false
      this.form.resetFields(['member_id', 'member_name', 'member_mobile'])
    },
    onCancelMember() {
      this.searchMemberIsShow = true
      this.form.resetFields(['member_id', 'member_name', 'member_mobile'])
    },
    onCodeNumber() {
      this.addService.getCodeNumber(6).subscribe(res => {
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
        this.addService.addEarnest(values).subscribe(result => {
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
