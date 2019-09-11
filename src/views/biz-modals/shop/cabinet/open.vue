<template>
  <st-modal
    title="远程开柜"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.update"
  >
    <st-form :form="form" labelWidth="70px">
      <st-form-item label=" ">
        柜子使用人：李大爷
      </st-form-item>
      <st-form-item label="开柜原因">
        <a-select
          placeholder="请选择开柜原因"
          v-decorator="decorators.first_letter"
        ></a-select>
      </st-form-item>
      <st-form-item labelFix>
        <st-textarea
          v-decorator="decorators.reason"
          placeholder="请输入开柜原因"
          maxlength="30"
          :autosize="{ minRows: 3 }"
        />
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { EditLongTermService as EditService } from './edit-long-term.service'
import { ruleOptions } from './cabinet.config'

export default {
  serviceInject() {
    return {
      messageService: MessageService,
      editService: EditService
    }
  },
  rxState() {
    const { editService } = this
    return {
      resData: editService.resData$,
      loading: editService.loading$,
      transferUnits: this.editService.transferUnits$,
      useStatus: this.editService.useStatus$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
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
    info() {
      return this.resData.info
    }
  },
  mounted() {
    this.editService.getUpdateInfo(this.id).subscribe(this.setFieldsValue)
  },
  methods: {
    setFieldsValue() {
      const { info } = this
      this.transferUnit = info.transfer_unit
      this.reasonHandler(info.use_status)
      this.form.setFieldsValue({
        first_letter: info.first_letter,
        start_num: info.start_num,
        price_num: info.price_num,
        transfer_num: info.transfer_num,
        use_status: info.use_status,
        reason: info.reason
      })
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validate().then(data => {
        data.id = this.id
        data.transfer_unit = this.transferUnit
        if (!this.isShowReason) {
          data.reason = ''
        }
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
