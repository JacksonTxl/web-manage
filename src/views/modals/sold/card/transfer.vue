<template>
  <st-modal
    title="转让"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-card-transfer"
    @ok="onOk"
  >
    <div :class="transfer('content')">
      <a-row :class="transfer('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="商品名称">{{transferInfo.card_name}}</st-info-item>
            <st-info-item label="剩余金额">{{transferInfo.now_amount}}</st-info-item>
            <st-info-item label="储值金额">{{transferInfo.init_amount}}</st-info-item>
            <st-info-item label="实付金额">{{transferInfo.pay_price}}</st-info-item>
            <st-info-item label="到期日期">{{transferInfo.end_time}}</st-info-item>
            <st-info-item label="销售人员" class="mgb-24">{{transferInfo.staff_name}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="会员姓名">{{transferInfo.member_name}}</st-info-item>
            <st-info-item label="手机号">{{transferInfo.mobile}}</st-info-item>
            <st-info-item label="实体卡号">{{transferInfo.card_code}}</st-info-item>
            <st-info-item label="订单号">{{transferInfo.order_id}}</st-info-item>
            <st-info-item label="订单状态">{{transferInfo.order_status}}</st-info-item>
            <st-info-item
              label="转让手续费"
              class="mgb-24"
            >{{transferInfo.transfer_num}}{{transferInfo.transfer_unit ===1 ? '%': '元'}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form labelWidth="72px">
        <div :class="transfer('transfer')">
          <st-form-item label="转让会员" required>
            <a-input value="18897880988"></a-input>
          </st-form-item>
          <st-form-item label="有效时间" required>
            <div :class="transfer('time')">
              <a-form-item class="page-a-form mg-b0">
                <a-date-picker
                  style="width: 100%;"
                  format="YYYY-MM-DD"
                  placeholder="开始时间"
                  :showToday="false"
                />
              </a-form-item>
              <span>~</span>
              <a-form-item class="page-a-form mg-b0">
                <a-date-picker format="YYYY-MM-DD" placeholder="结束时间" :showToday="false"/>
              </a-form-item>
            </div>
          </st-form-item>
          <st-form-item label="剩余价值" required>
            <a-input value="18897880988"></a-input>
          </st-form-item>
          <st-form-item label="合同编号" class="mgb-18" required>
            <div :class="transfer('contract')">
              <a-input placeholder="请输入合同编号" v-model="infCode"></a-input>
              <st-button class="create-button" @click="settingContractCodenumber">自动生成</st-button>
            </div>
          </st-form-item>
          <st-form-item label="手续费" class="mgb-18">{{transferInfo.poundage}}元</st-form-item>
          <st-form-item :label="finance.pay_channel.description" required>
            <a-select placeholder="选择支付方式">
              <a-select-option
                v-for="(item,key,index) in finance.pay_channel.value"
                :value="key"
                :key="index"
              >{{item}}</a-select-option>
            </a-select>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button key="submit" type="primary">确认提交</st-button>
    </template>
  </st-modal>
</template>

<script>
import { UserService } from '@/services/user.service'
import { TransferService } from './transfer.service'
export default {
  name: 'ModalSoldCardTransfer',
  bem: {
    transfer: 'modal-sold-card-transfer'
  },
  props: {
    record: {
      type: Object
    },
    type: {
      type: String
    }
  },
  serviceInject() {
    return {
      transferService: TransferService,
      userservice: UserService
    }
  },
  rxState() {
    return {
      finance: this.userservice.finance$
    }
  },
  data() {
    return {
      show: false,
      transferInfo: {},
      infCode: ''
    }
  },
  created() {
    this.transferInfoFunc()
  },
  methods: {
    /* 自动生成合同编号 */
    settingContractCodenumber() {
      let self = this
      this.transferService
        .settingContractCodenumber(self.transferInfo.contract_type)
        .subscribe(res => {
          self.infCode = res.info.code
          console.log(res.info.code)
        })
    },
    transferInfoFunc() {
      let self = this
      this.transferService
        .getMemberTransferInfo(self.record.id, this.type)
        .subscribe(res => {
          self.transferInfo = res.info
        })
    },
    onOk() {
      this.$emit('ok')
      this.show = false
    }
  }
}
</script>
