<template>
  <st-modal
    title="编辑适用范围"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.editCourseRange"
    size="small"
  >
    <div>
      <st-form :form="form">
        <a-row>
          <a-col :xs="22">
            <st-form-item label="适用范围" required>
              <a-input
                placeholder="请输入适用范围"
                v-decorator="decorators.setting_name"
                maxlength="20"
              ></a-input>
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </div>
  </st-modal>
</template>
<script>
import { EditService } from './edit.service'
import { MessageService } from '@/services/message.service'
import { ruleOptions } from './course-range.config'

export default {
  serviceInject() {
    return {
      editService: EditService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      loading: this.editService.loading$
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.form.setFieldsValue({
      setting_name: this.info.setting_name
    })
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: true
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        let para = {
          id: this.info.id,
          setting_name: values.setting_name
        }
        this.editService.editCourseRange(para).subscribe(() => {
          this.messageService.success({
            content: ' 编辑成功'
          })
          this.$emit('success')
          this.show = false
        })
      })
    },
    onCancel() {
      this.show = false
    }
  }
}
</script>
