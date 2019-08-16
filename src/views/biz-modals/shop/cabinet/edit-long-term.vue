<template>
  <st-modal
    title="编辑长期储物柜"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.update"
  >
    <st-form :form="form" labelWidth="70px">
      <st-form-item label="区域">
        <a-input :value="areaName" disabled />
      </st-form-item>
      <st-form-item label="首字母">
        <a-input
          placeholder="请输入首字母"
          maxlength="1"
          v-decorator="decorators.first_letter"
        />
      </st-form-item>
      <st-form-item label="起始编号" required>
        <a-input-number
          placeholder="请输入起始编号"
          v-decorator="decorators.start_num"
          :min="1"
          :max="9999"
          :precision="0"
          class="full-width"
        />
      </st-form-item>
      <st-form-item label="租赁价格" required>
        <st-input-number
          :float="true"
          placeholder="请输入售卖价格"
          v-decorator="decorators.price_num"
        >
          <template slot="addonAfter">
            元/天
          </template>
        </st-input-number>
      </st-form-item>
      <st-form-item label="转让手续费">
        <st-input-number
          :float="true"
          placeholder="请输入转让手续费"
          v-decorator="decorators.transfer_num"
        >
          <template slot="addonAfter">
            <a-select v-model="transferUnit">
              <a-select-option
                v-for="(item, index) in transferUnits"
                :key="index"
                :value="+item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </template>
        </st-input-number>
      </st-form-item>
      <st-form-item label="可用状态" required>
        <a-radio-group
          v-decorator="decorators.use_status"
          @change="onUseStatusChange"
        >
          <a-radio
            v-for="(item, index) in useStatus"
            :key="index"
            :value="+item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item labelFix>
        <st-textarea
          v-decorator="decorators.reason"
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
