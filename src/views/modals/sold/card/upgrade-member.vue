<template>
  <st-modal
  title="升级"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-deal-sale">
    <div :class="sale('content')">
      <a-row :class="sale('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="卡名">{{info.card_name}}</st-info-item>
            <st-info-item label="当前额度">{{info.remain_amount}}</st-info-item>
            <st-info-item label="初始额度">{{info.init_amount}}</st-info-item>
            <st-info-item label="优惠赠送">{{info.gift_amount}}</st-info-item>
            <st-info-item label="实付金额">{{info.pay_price}}</st-info-item>
            <st-info-item label="到期日期">{{info.end_time}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
           <st-info>
            <st-info-item label="会员姓名">{{info.member_name}}</st-info-item>
            <st-info-item label="手机号">{{info.mobile}}</st-info-item>
            <st-info-item label="订单号">{{info.order_id}}</st-info-item>
            <st-info-item label="订单状态">{{info.order_status}}</st-info-item>
            <st-info-item label="销售人员">{{info.staff_name}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="72px">
        <div :class="sale('sale')">
          <st-form-item label="会员卡" required labelGutter="12px">
            <a-select
              showSearch
              allowClear
              placeholder="输入会员卡名搜索"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="false"
              @change="onSelectCardChange"
              v-decorator="['memberCardId',{rules:[{required:true,message:'请选择会员卡'}]}]"
              @search="onCardSearch"
              notFoundContent="无搜索结果"
            >
              <a-select-option
              v-for="(item,index) in cardList"
              :value="+item.id"
              :key="index">
                {{item.card_name}}
              </a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item labelGutter="12px" label="规格" class="mg-b16" required>
            <template v-if="true">无</template>
            <a-radio-group v-else>
              <a-radio v-for="(item, index) in 5" :value="item" :key="index">{{item}}</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item labelGutter="12px" label="开卡方式" required>
            <template v-if="true">无</template>
            <a-radio-group v-else>
              <a-radio v-for="(item, index) in 3" :value="item" :key="index">{{item}}</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item labelGutter="12px" label="有效时间">
            <template v-if="true">无</template>
            <template v-else>
              2019-03-08 14:20        至       2020-03-07  14:20
            </template>
          </st-form-item>
          <st-form-item labelGutter="12px" label="购买赠送">
            <st-input-number v-model="giftAmount" :placeholder="`请输入赠送的${selectCardItem.card_type!==1?'天数':'次数'}`">
              <span slot="addonAfter">{{selectCardItem.card_type!==1?'天':'次'}}</span>
            </st-input-number>
          </st-form-item>
          <st-form-item labelGutter="12px" label="合同编号" required>
            <div :class="sale('contract')">
              <a-input
              v-decorator="['contractNumber',{rules:[{required:true,message:'请输入合同编号'}]}]"
              placeholder="请输入合同编号"></a-input>
              <st-button class="create-button" @click="onCodeNumber" :loading="loading.getCodeNumber">自动生成</st-button>
            </div>
          </st-form-item>
          <st-form-item labelGutter="12px" class="mgb-12" label="商品价格">500元</st-form-item>
          <st-form-item labelGutter="12px" required label="原卡抵扣">
            <st-input-number :float="true" placeholder="请输入原卡可以抵扣的剩余价值金额">
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item>
          <!-- <st-form-item labelGutter="12px" :class="sale('discounts')" label="优惠金额">
            <div>
              <div :class="sale('discounts-total')">
                <span>{{couponText}}</span>
                <a-dropdown
                v-model="couponDropdownVisible"
                :disabled="couponList.length===0"
                :class="sale({disabled:couponList.length===0})"
                placement="bottomRight"
                :getPopupContainer="trigger => trigger.parentNode"
                :trigger="['click']">
                  <div :class="sale('discounts-promotion')">
                    <span>{{couponList.length===0?'无优惠券':'优惠券选择'}}</span>
                    <a-icon type="right" />
                  </div>
                  <a-radio-group v-model="selectCoupon" @change="onSelectCouponChange" :class="sale('dropdown')" slot="overlay">
                    <a-menu>
                      <a-menu-item @click="onSelectCoupon">
                        <a-radio :value="-1">不使用</a-radio>
                      </a-menu-item>
                      <a-menu-item @click="onSelectCoupon" :key="index" v-for="(item,index) in couponList">
                        <a-radio :value="item.id">{{item.name}} {{item.price}}</a-radio>
                      </a-menu-item>
                    </a-menu>
                  </a-radio-group>
                </a-dropdown>
              </div>
            </div>
          </st-form-item> -->
          <!-- <st-form-item labelGutter="12px" :class="sale('discounts')" label="定金抵扣">
            <div>
              <div :class="sale('discounts-total')">
                <span>{{advanceText}}</span>
                <a-dropdown
                v-model="advanceDropdownVisible"
                :disabled="advanceList.length===0"
                :class="sale({disabled:advanceList.length===0})"
                placement="bottomRight"
                :getPopupContainer="trigger => trigger.parentNode"
                :trigger="['click']">
                  <div :class="sale('discounts-promotion')">
                    <span>{{advanceList.length===0?'无定金':'定金选择'}}</span>
                    <a-icon type="right" />
                  </div>
                  <a-radio-group v-model="selectAdvance" @change="onSelectAdvanceChange" :class="sale('dropdown')" slot="overlay">
                    <a-menu>
                      <a-menu-item @click="onSelectAdvance">
                        <a-radio :value="-1">不使用</a-radio>
                      </a-menu-item>
                      <a-menu-item @click="onSelectAdvance" :key="index" v-for="(item,index) in advanceList">
                        <a-radio :value="item.id">定金 {{item.price}}</a-radio>
                      </a-menu-item>
                    </a-menu>
                  </a-radio-group>
                </a-dropdown>
              </div>
            </div>
          </st-form-item> -->
          <!-- <st-form-item labelGutter="12px" label="减免金额">
            <st-input-number v-model="reduceAmount" :float="true" placeholder="请输入">
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item> -->
          <!-- <st-form-item labelGutter="12px" validateStatus="error" :help="orderAmountText" class="mg-b0" label="小计">
            <span class="total">{{priceInfo}}元</span>
          </st-form-item> -->
        </div>
        <div :class="sale('remarks')">
          <!-- <st-form-item labelGutter="12px" label="销售人员" required>
            <a-select
            v-decorator="['saleName',{rules:[{required:true,message:'请选择销售人员'}]}]"
            placeholder="选择签单的工作人员">
              <a-select-option
              v-for="(item,index) in saleList"
              :key="index"
              :value="item.id">{{item.staff_name}}</a-select-option>
            </a-select>
          </st-form-item> -->
          <!-- <st-form-item labelGutter="12px" label="备注" class="mg-b0">
            <a-textarea v-model="description" :autosize="{ minRows: 4, maxRows: 6 }" />
          </st-form-item> -->
        </div>
        {{selectCardItem}}
      </st-form>
    </div>
    <template slot="footer">
      <div :class="sale('footer')">
        <!-- <div class="price">
          <span>{{priceInfo}}元</span>
          <span>订单总额：{{cardPrice}}元</span>
        </div>
        <div class="button">
          <st-button @click="onCreateOrder" :loading="loading.renewal">创建订单</st-button>
          <st-button @click="onPay" :loading="loading.renewalPay" type="primary">立即支付</st-button>
        </div> -->
      </div>
    </template>
  </st-modal>
</template>

<script>
import { UpgradeMemberService } from './upgrade-member.service'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'ModalSoldUpgradeMemberCard',
  bem: {
    sale: 'modal-sold-deal-sale'
  },
  serviceInject() {
    return {
      upgradeMemberService: UpgradeMemberService
    }
  },
  rxState() {
    return {
      info: this.upgradeMemberService.info$,
      loading: this.upgradeMemberService.loading$
    }
  },
  props: ['id'],
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      // 会员卡列表
      cardList: [],
      selectCardItem: {},
      // 购买赠送
      giftAmount: ''
    }
  },
  created() {
    this.upgradeMemberService.serviceInit(this.id).subscribe()
  },
  methods: {
    // 搜索会员卡
    onCardSearch(data) {
      if (data === '') {
        this.cardList = []
      } else {
        this.getCardList(data)
      }
    },
    getCardList(search) {
      this.upgradeMemberService.getCardList(search).subscribe(res => {
        this.cardList = cloneDeep(res.list)
      })
    },
    onSelectCardChange(data) {
      if (data) {
        this.selectCardItem = cloneDeep(this.cardList.filter(i => i.id === data)[0])
      } else {
        this.selectCardItem = {}
      }
    },
    // 合同
    onCodeNumber() {
      this.upgradeMemberService.getCodeNumber(`${this.info.contract_type}`).subscribe(res => {
        this.form.setFieldsValue({
          contractNumber: res.info.code
        })
      })
    }
  }
}
</script>
