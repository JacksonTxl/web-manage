<template>
  <st-modal title="创建场地" v-model="show" wrapClassName="modal-court-add" :footer="null">
    <st-form :form="form" labelWidth="68px" labelGutter="16px">
      <st-form-item label="场地名称" required>
        <a-input placeholder="请输入场地名称，不超过10个字" maxlength="10" v-decorator="formRules.areaName"/>
      </st-form-item>
      <st-form-item labelFix>
        <a-checkbox v-decorator="formRules.isVip">是否VIP区域</a-checkbox>
      </st-form-item>
      <st-form-item label="容纳人数">
        <st-input-number placeholder="请输入最大容纳人数，不填无限制" v-decorator="formRules.containNumber"/>
      </st-form-item>
    </st-form>
    <div class="ta-r">
      <st-button type="primary" :loading="loading.add" @click="onSubmit">保存</st-button>
    </div>
  </st-modal>
</template>

<script>
import { AddService } from './add.service'
import { MessageService } from '@/services/message.service'
import { PatternService } from '@/services/pattern.service'
export default {
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$
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
              pattern: this.pattern.CN_EN_NUM('1-10'),
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
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.getData()
        this.addService.add(data).subscribe(this.onSubmitSuccess)
      })
    },
    onCancel() {
      this.show = false
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.is_vip = +!!data.is_vip
      return data
    },
    onSubmitSuccess() {
      this.messageService.success({
        content: '添加成功'
      })
      this.$emit('change')
      this.show = false
    }
  }
}
</script>
