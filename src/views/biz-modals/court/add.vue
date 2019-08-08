<template>
  <st-modal
    title="创建场地"
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
      <st-button type="primary" :loading="loading.add" @click="onSubmit">
        保存
      </st-button>
    </div>
  </st-modal>
</template>

<script>
import { AddService } from './add.service'
import { MessageService } from '@/services/message.service'
import { ruleOptions } from './court.config'

export default {
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$
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
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        values.contain_number = +values.contain_number
        this.addService.add(values).subscribe(this.onSubmitSuccess)
      })
    },
    onCancel() {
      this.show = false
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
