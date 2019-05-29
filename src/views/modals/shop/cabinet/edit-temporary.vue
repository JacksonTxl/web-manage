<template>
  <st-modal
    title="编辑临时储物柜"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
  >
    <st-form :form="form" labelWidth="70px">
      <st-form-item label="区域">
        <a-input :value="id" disabled/>
      </st-form-item>
      <st-form-item label="首字母">
        <a-input placeholder="请输入首字母" v-decorator="ruleConfig.firstLetter"/>
      </st-form-item>
      <st-form-item label="起始编号" required>
        <a-input placeholder="请输入起始编号" v-decorator="ruleConfig.startNum"/>
      </st-form-item>
      <st-form-item label="可用状态" required>
        <a-radio-group
          v-decorator="ruleConfig.useStatus"
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
      <st-form-item labelFix>
        <a-textarea v-decorator="ruleConfig.reason" placeholder="请输入不可用原因，如维修中"/>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { EditTemporaryService as EditService } from './edit-temporary.service'
import { RuleConfig } from '@/constants/setting/cabinet-rule'

export default {
  serviceInject() {
    return {
      messageService: MessageService,
      userService: UserService,
      editService: EditService,
      ruleConfig: RuleConfig
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
      form: this.$form.createForm(this)
    }
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    type: {
      type: String,
      default: 'temporary'
    }
  },
  created() {
    this.editService.getUpdateInfo(this.id).subscribe(this.setFieldsValue)
  },
  methods: {
    setFieldsValue() {
      const { info } = this.resData
      this.form.setFieldsValue({
        first_letter: info.first_letter,
        start_num: info.start_num,
        use_status: info.use_status,
        reason: info.reason
      })
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then((data) => {
        data.id = this.id
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
    }
  }
}
</script>
