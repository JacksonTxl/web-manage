<template>
  <st-modal
    title="编辑场地"
    v-model="show"
    wrapClassName="modal-court-add"
    :footer="null"
  >
    <st-form :form="form" labelWidth="68px" labelGutter="16px">
      <st-form-item label="场地名称" required>
        <a-input
          placeholder="请输入场地名称，不超过10个字"
          maxlength="10"
          v-decorator="decorators.area_name"
        />
      </st-form-item>
      <st-form-item labelFix>
        <st-checkbox v-decorator="decorators.is_vip">
          <slot>
            VIP区域
          </slot>
        </st-checkbox>
      </st-form-item>
      <st-form-item label="容纳人数">
        <st-input-number
          placeholder="请输入最大容纳人数，1-999"
          :min="1"
          :max="999"
          v-decorator="decorators.contain_number"
        />
      </st-form-item>
    </st-form>
    <div class="ta-r">
      <st-button type="primary" :loading="loading.update" @click="onSubmit">
        保存
      </st-button>
    </div>
  </st-modal>
</template>

<script>
import { EditService } from './edit.service'
import { MessageService } from '@/services/message.service'
import { ruleOptions } from './court.config'

export default {
  serviceInject() {
    return {
      editService: EditService,
      messageService: MessageService
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
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false
    }
  },
  mounted() {
    this.editService.getInfo(this.id).subscribe(this.setFieldsValue)
  },
  methods: {
    setFieldsValue() {
      const info = this.info
      this.form.setFieldsValue({
        is_vip: +info.is_vip,
        area_name: info.area_name,
        contain_number: info.contain_number
      })
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        values.id = this.id
        values.contain_number = +values.contain_number
        this.editService.update(values).subscribe(this.onSubmitSuccess)
      })
    },
    onCancel() {
      this.show = false
    },
    onSubmitSuccess() {
      this.messageService.success({
        content: '保存成功'
      })
      this.$emit('change')
      this.show = false
    }
  }
}
</script>
