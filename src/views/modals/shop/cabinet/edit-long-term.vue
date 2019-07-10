<template>
  <st-modal
    title="编辑长期储物柜"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
  >
    <st-form :form="form" labelWidth="70px">
      <st-form-item label="区域">
        <a-input :value="areaName" disabled/>
      </st-form-item>
      <st-form-item label="首字母">
        <a-input placeholder="请输入首字母" maxlength="1" v-decorator="rules.firstLetter"/>
      </st-form-item>
      <st-form-item label="起始编号" required>
        <a-input-number
          placeholder="请输入起始编号"
          v-decorator="ruleConfig.startNum"
          min="1"
          max="9999"
          precision="0"
          class="full-width"
        />
      </st-form-item>
      <st-form-item label="租赁价格" required>
        <st-input-number
          :float="true"
          placeholder="请输入售卖价格"
          v-decorator="ruleConfig.priceNum"
        >
          <template slot="addonAfter">元/天</template>
        </st-input-number>
      </st-form-item>
      <st-form-item label="转让手续费">
        <st-input-number :float="true" placeholder="请输入转让手续费" v-decorator="ruleConfig.transferNum">
          <template slot="addonAfter">
            <a-select v-model="transferUnit">
              <a-select-option
                v-for="(item, index) in settingEnums.cabinet.transfer_unit.value"
                :key="index"
                :value="+index"
              >
                {{item}}
              </a-select-option>
            </a-select>
          </template>
        </st-input-number>
      </st-form-item>
      <st-form-item label="可用状态" required>
        <a-radio-group
          v-decorator="ruleConfig.useStatus"
          @change="onUseStatusChange"
        >
          <a-radio
            v-for="(item, index) in settingEnums.cabinet.use_status.value"
            :key="index"
            :value="+index"
          >
            {{item}}
          </a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item v-if="isShowReason" labelFix>
        <st-textarea
          v-model="info.reason"
          placeholder="请输入不可用原因，如维修中"
          maxlength="30"
          :autosize="{ minRows: 3 }"
        />
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { EditLongTermService as EditService } from './edit-long-term.service'
import { RuleConfig } from '@/constants/setting/cabinet-rule'
import { PatternService } from '@/services/pattern.service'
import { rules } from './cabinet.config'

export default {
  serviceInject() {
    return {
      messageService: MessageService,
      userService: UserService,
      editService: EditService,
      ruleConfig: RuleConfig,
      pattern: PatternService
    }
  },
  rxState() {
    const { editService } = this
    return {
      resData: editService.resData$,
      loading: editService.loading$,
      settingEnums: this.userService.settingEnums$
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      transferUnit: 0,
      isShowReason: false
    }
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    areaName: {
      type: String,
      default: ''
    }
  },
  computed: {
    rules,
    info() {
      return this.resData.info
    }
  },
  created() {
    this.editService.getUpdateInfo(this.id).subscribe(this.setFieldsValue)
  },
  methods: {
    setFieldsValue() {
      const { info } = this
      this.form.setFieldsValue({
        first_letter: info.first_letter,
        start_num: info.start_num,
        price_num: info.price_num,
        transfer_num: info.transfer_num,
        use_status: info.use_status
      })
      this.transferUnit = info.transfer_unit
      this.reasonHandler(info.use_status)
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then((data) => {
        data.id = this.id
        const reason = this.info.reason || ''
        if (this.isShowReason && !this.pattern.CN_EN_NUM_SPACE('1-30').test(reason)) {
          this.messageService.error({
            content: '不可用原因格式错误'
          })
          return
        }
        data.reason = reason
        data.transfer_unit = this.transferUnit
        this.editService.update(data).subscribe(this.onSubmitSuccess)
      })
    },
    onCancel() {
      this.show = false
    },
    onSubmitSuccess() {
      this.messageService.success({
        content: '保存成功'
      })
      this.show = false
      this.$emit('change')
    },
    onUseStatusChange(e) {
      const status = e.target.value
      this.reasonHandler(status)
    },
    reasonHandler(status) {
      this.isShowReason = status === 2
    }
  }
}
</script>
