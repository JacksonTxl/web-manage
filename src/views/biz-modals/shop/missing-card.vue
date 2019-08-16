<template>
  <st-modal title="重绑实体卡" v-model="show" size="small">
    <section>
      <section>
        <st-form :form="form" @submit="save" labelWidth="88px">
          <st-info>
            <st-info-item label="姓名">{{ record.member_name }}</st-info-item>
            <st-info-item label="手机号">{{ record.mobile }}</st-info-item>
          </st-info>

          <div
            style="background:rgba(247,249,252,1);padding: 20px 20px 1px 20px;margin-bottom:20px"
          >
            <st-form :form="form" @submit="save" labelWidth="125px">
              <st-info>
                <st-info-item label="当前绑定的实体卡号">
                  {{ getData.card_num }}
                </st-info-item>
                <st-info-item label="当前物理ID">
                  {{ getData.rfid }}
                </st-info-item>
              </st-info>
            </st-form>
          </div>
          <st-form-item label="实体卡号" required>
            <a-input
              placeholder="输入实体卡号"
              v-decorator="decorators.card_num"
            />
          </st-form-item>
          <st-form-item label="物理ID" required>
            <a-input
              placeholder="请将实体卡置于读卡器上"
              v-decorator="decorators.rfid"
            />
          </st-form-item>
          <st-form-item label="有无手续费" required>
            <a-radio-group
              v-decorator="decorators.moneyFlag"
              @change="radioChangeGroup"
            >
              <a-radio value="a">有手续费</a-radio>
              <a-radio value="b">无手续费</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="手续费" v-if="moneyFlag">
            <st-input-number
              :float="true"
              placeholder="请输入需要收取的手续费金额"
              v-decorator="decorators.poundage"
            >
              <template slot="addonAfter">
                元
              </template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" v-if="moneyFlag">
            <a-select
              :class="basic('select')"
              v-decorator="decorators.pay_method"
              placeholder="请选择支付方式"
            >
              <a-select-option
                v-for="(item, index) in payMethodList"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
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
              v-decorator="decorators.payee"
              @search="onSearch"
              notFoundContent="无搜索结果"
            >
              <a-select-option
                v-for="(item, index) in staffList"
                :value="item.id"
                :key="index"
              >
                <span
                  v-html="
                    `${item.staff_name} ${item.mobile}`.replace(
                      new RegExp(memberSearchText, 'g'),
                      `\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`
                    )
                  "
                >
                  {{ item.staff_name }} {{ item.mobile }}
                </span>
              </a-select-option>
            </a-select>
          </st-form-item>
        </st-form>
      </section>
    </section>
    <template slot="footer">
      <st-button
        type="primary"
        @click="save"
        :loading="loading.getMemberPhysicalBind"
      >
        确认
      </st-button>
    </template>
  </st-modal>
</template>
<script>
import { MissingCaedService } from './missing-card.service'
import { ruleOptions } from './missing-card.config'
export default {
  name: 'missingCard',
  bem: {
    basic: 'shop-missing-card'
  },
  serviceInject() {
    return {
      missingService: MissingCaedService
    }
  },
  rxState() {
    return {
      paymentMethodList: this.missingService.paymentMethodList$,
      payMethodList: this.missingService.payMethodList$,
      staffList: this.missingService.staffList$,
      loading: this.missingService.loading$
    }
  },
  props: {
    record: {
      type: Object
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      show: false,
      form,
      decorators,
      moneyFlag: false,
      selectPayValues: 0,
      getData: {},
      getCard_id: ''
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
      this.missingService
        .getMemberPhysical(this.record.member_id)
        .subscribe(state => {
          this.getData = state.info
        })
    },
    getMemberPhysicalBind(data) {
      this.missingService
        .getMemberPhysicalBind(this.record.member_id, data)
        .subscribe(state => {
          this.show = false
          this.$router.push({ force: true, query: this.$router.query })
        })
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
      this.form.validate().then(values => {
        values.moneyFlag = undefined
        values.id = this.record.member_id
        values.card_id = this.getData.id
        this.getMemberPhysicalBind(values)
      })
    }
  }
}
</script>
