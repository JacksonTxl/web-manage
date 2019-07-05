<template>
  <st-modal title="重绑实体卡" v-model="show" size="small">
    <section>
      <section>
        <st-form :form="form" @submit="save" labelWidth="85px">
          <st-info>
            <st-info-item label="姓名">{{record.member_name}}</st-info-item>
            <st-info-item label="手机号">{{record.mobile}}</st-info-item>
          </st-info>

          <div
            style="background:rgba(247,249,252,1);padding: 20px 20px 1px 20px;margin-bottom:20px"
          >
            <st-form :form="form" @submit="save" labelWidth="125px">
              <st-info>
                <st-info-item label="当前绑定的实体卡号">{{getData.card_num}}</st-info-item>
                <st-info-item label="当前物理ID">{{getData.rfid}}</st-info-item>
              </st-info>
            </st-form>
          </div>
          <st-form-item label="实体卡号" required>
            <a-input placeholder="输入实体卡号" v-decorator="basicInfoRuleList.rfid"/>
          </st-form-item>
          <st-form-item label="物理ID" required>
            <a-input placeholder="请将实体卡置于读卡器上" v-decorator="basicInfoRuleList.card_num"/>
          </st-form-item>
          <st-form-item label="有无手续费" required>
            <a-radio-group v-decorator="basicInfoRuleList.moneyFlag" @change="radioChangeGroup">
              <a-radio value="a">有手续费</a-radio>
              <a-radio value="b">无手续费</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="手续费" v-if="moneyFlag">
            <st-input-number
              :float="true"
              placeholder="请输入需要收取的手续费金额"
              v-decorator="basicInfoRuleList.poundage"
            >
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" v-if="moneyFlag">
            <a-select :class="basic('select')" v-decorator="basicInfoRuleList.pay_method"  placeholder="请选择支付方式">
              <a-select-option
              v-for="(item,index) in payMethodList"
              :key="index"
              :value="item.value">{{item.label}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="收款人员" v-if="moneyFlag">
             <a-select
              showSearch
              allowClear
              placeholder="输入手机号或员工名称搜索"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="false"
              v-decorator="basicInfoRuleList.payee"
              @search="onSearch"
              notFoundContent="无搜索结果"
            >
              <a-select-option
              v-for="(item,index) in staffList"
              :value="item.id"
              :key="index">
                <span v-html="`${item.staff_name}&nbsp;&nbsp;&nbsp;${item.mobile}`.replace(new RegExp(memberSearchText,'g'),`\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`)">
                  {{item.staff_name}}   {{item.mobile}}
                </span>
              </a-select-option>
            </a-select>
          </st-form-item>
        </st-form>
      </section>
    </section>
    <template slot="footer">
      <st-button type="primary" @click="save" :loading="loading.getMemberPhysicalBind">确认</st-button>
    </template>
  </st-modal>
</template>
<script>
import { MissingCaedService } from './missing-card.service'
import { UserService } from '@/services/user.service'
export default {
  name: 'missingCard',
  bem: {
    basic: 'shop-missing-card'
  },
  serviceInject() {
    return {
      missingService: MissingCaedService,
      userService: UserService
    }
  },
  rxState() {
    return {
      paymentMethodList: this.missingService.paymentMethodList$,
      staffList: this.missingService.staffList$,
      memberEnums: this.userService.memberEnums$,
      loading: this.missingService.loading$
    }
  },
  props: {
    record: {
      type: Object
    }
  },
  computed: {
    payMethodList() {
      let list = []
      if (!this.memberEnums.pay_method) return list
      Object.entries(this.memberEnums.pay_method.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      moneyFlag: false,
      selectPayValues: 0,
      getData: {},
      getCard_id: '',
      basicInfoRuleList: {
        // 实体卡
        rfid: [
          'rfid',
          {
            rules: [
              {
                required: true,
                message: '请输入正确的实体卡号',
                pattern: /\d$/
              }
            ]
          }
        ],
        // 物理ID
        card_num: [
          'card_num',
          {
            rules: [
              {
                required: true,
                message: '请输入正确的物理ID',
                pattern: /\d$/
              }
            ]
          }
        ],
        moneyFlag: [
          'moneyFlag',
          {
            rules: [
              {
                required: true,
                message: '请选择有无手续费'
              }
            ]
          }
        ],
        poundage: [
          'poundage',
          {
            rules: [
              {
                required: true,
                message: '请填写手续费',
                pattern: /\d$/
              }
            ]
          }
        ],
        pay_method: [
          'pay_method',
          {
            rules: [
              {
                required: true,
                message: '请选择支付方式'
              }
            ]
          }
        ],
        payment: [
          'payment',
          {
            rules: [
              {
                required: true,
                message: '请选择收款方式'
              }
            ]
          }
        ],
        payee: [
          'payee',
          {
            rules: [
              {
                required: true,
                message: '请选择收款人员'
              }
            ]
          }
        ]
      }
    }
  },
  created() {
    this.getMemberPhysical()
  },
  methods: {
    selectPay(checkedValues) {
      this.selectPayValues = checkedValues.target.value
    },
    // 搜索员工
    onSearch(data) {
      this.memberSearchText = data
      if (data === '') {
        this.missingService.memberList$.commit(() => [])
        this.form.resetFields(['payee'])
      } else {
        this.missingService.getMemberList(data).subscribe(res => {
          if (!res.list.length) {
            this.form.resetFields(['payee'])
          }
        })
      }
    },
    getMemberPhysical() {
      this.missingService.getMemberPhysical(this.record.member_id).subscribe(state => {
        this.getData = state.info
      })
    },
    getMemberPhysicalBind(data) {
      this.missingService.getMemberPhysicalBind(this.record.member_id, data).subscribe(
        state => {
          this.show = false
          this.$router.push({ force: true, query: this.$router.query })
        }
      )
    },
    radioChangeGroup(value) {
      if (value.target.value === 'a') {
        this.moneyFlag = true
      } else {
        this.moneyFlag = false
      }
    },
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        values.moneyFlag = undefined
        values.id = this.record.member_id
        values.card_id = this.getData.id
        if (!err) {
          this.getMemberPhysicalBind(values)
        }
      })
    }
  },
  watch: {}
}
</script>
