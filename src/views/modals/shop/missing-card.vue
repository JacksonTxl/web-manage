<template>
  <st-modal title="遗失补卡" @ok="save" v-model="show" size="small">
    <section>
      <section>
        <st-form :form="form" @submit="save" labelWidth="85px">
          <st-info>
            <st-info-item label="姓名">孙乐乐</st-info-item>
            <st-info-item label="手机号">12345678901</st-info-item>
          </st-info>

          <div
            style="background:rgba(247,249,252,1);padding: 20px 20px 1px 20px;margin-bottom:20px"
          >
            <st-form :form="form" @submit="save" labelWidth="125px">
              <st-info>
                <st-info-item label="当前绑定的实体卡号">213456758987654</st-info-item>
                <st-info-item label="当前物理ID">12345678901</st-info-item>
              </st-info>
            </st-form>
          </div>
          <st-form-item label="实体卡号" required>
            <a-input placeholder="输入实体卡号" v-decorator="basicInfoRuleList.physical_id"/>
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
              v-decorator="basicInfoRuleList.money"
            >
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式">
            <a-select placeholder="请输入收款的支付方式" v-decorator="basicInfoRuleList.receivables">
              <a-select-option value="china">China</a-select-option>
              <a-select-option value="usa">U.S.A</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="收款人员">
            <a-input placeholder="请输入收款的工作人员" v-decorator="basicInfoRuleList.payment"/>
          </st-form-item>
        </st-form>
      </section>
    </section>
  </st-modal>
</template>
<script>
export default {
  name: 'missingCard',
  props: {},
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      moneyFlag: false,
      basicInfoRuleList: {
        // 实体卡
        physical_id: [
          'physical_id',
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
        money: [
          'money',
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
        receivables: [
          'receivables',
          {
            rules: [
              {
                required: true,
                message: '请填写支付方式'
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
                message: '请填写收款方式'
              }
            ]
          }
        ]
      }
    }
  },
  created() {},
  methods: {
    radioChangeGroup(value) {
      if (value.target.value === 'a') {
        this.moneyFlag = true
      } else {
        this.moneyFlag = false
      }
    },
    save(e) {
      e.preventDefault()
      console.log(e)
      this.form.validateFields((err, values) => {
        console.log(err, values)
        if (!err) {
        }
      })
    }
  },
  watch: {}
}
</script>
