<template>
  <a-modal title="编辑场地" v-model="show" wrapClassName="modal-court-add" :footer="null">
    <st-form :form="form" labelWidth="68px" labelGutter="16px">
      <st-form-item label="场地名称" required>
        <a-input placeholder="请输入场地名称，不超过10个字" maxlength="10" v-decorator="formRules.areaName"/>
      </st-form-item>
      <st-form-item labelFix>
        <a-checkbox :checked="!!info.is_vip" @change="onIsVipChange">是否VIP区域
        </a-checkbox>
      </st-form-item>
      <st-form-item label="容纳人数">
        <st-input-number placeholder="请输入最大容纳人数，不填无限制" v-decorator="formRules.containNumber"/>
      </st-form-item>
    </st-form>
    <div class="ta-c">
      <st-button type="primary" @click="onSubmit">保存</st-button>
    </div>
  </a-modal>
</template>

<script>
import { EditService } from './edit.service'
import { MessageService } from '@/services/message.service'
import { RuleConfig } from '@/constants/rule'
export default {
  serviceInject() {
    return {
      editService: EditService,
      messageService: MessageService,
      ruleConfig: RuleConfig
    }
  },
  rxState() {
    return {
      info: this.editService.info$,
      loading: this.editService.loading$
    }
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      show: false,
      formRules: {
        areaName: [
          'area_name', {
            rules: [{
              required: true,
              message: '请输入场地名称'
            }, {
              validator: this.courtNameValidator,
              message: '支持输入中英文、数字,不超过10个字'
            }]
          }
        ],
        containNumber: ['contain_number'],
        isVip: ['is_vip']
      }
    }
  },
  created() {
    this.form = this.$form.createForm(this)
    this.editService.getInfo(this.id).subscribe(this.setFieldsValue)
  },
  methods: {
    setFieldsValue() {
      const info = this.info
      this.form.setFieldsValue({
        area_name: info.area_name,
        contain_number: info.contain_number
      })
    },
    onIsVipChange(e) {
      this.info.is_vip = !this.info.is_vip
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.getData()
        this.editService.update(data).subscribe(this.onSubmitSuccess)
      })
    },
    onCancel() {
      this.show = false
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.id = this.id
      data.is_vip = +this.info.is_vip
      return data
    },
    onSubmitSuccess() {
      this.messageService.success({
        content: '保存成功'
      })
      this.$emit('change')
      this.show = false
    },
    courtNameValidator(rule, value, callback) {
      if (!this.ruleConfig.generateRule('1-10').test(value)) {
        callback(rule.message)
      } else {
        callback()
      }
    }
  }
}
</script>
