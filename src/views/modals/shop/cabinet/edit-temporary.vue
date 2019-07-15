<template>
  <st-modal
    title="编辑临时储物柜"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.update"
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
          :min="1"
          :max="9999"
          :precision="0"
          class="full-width"
        />
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
import { EditTemporaryService as EditService } from './edit-temporary.service'
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
        use_status: info.use_status
      })
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
