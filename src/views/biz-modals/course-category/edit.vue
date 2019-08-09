<template>
  <st-modal
    title="编辑课程类型"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.updateCourseCategory"
    size="small"
  >
    <div>
      <st-form :form="form">
        <a-row>
          <a-col :xs="22">
            <st-form-item v-show="false">
              <input type="hidden" v-decorator="decorators.id" />
            </st-form-item>
            <st-form-item label="课程类型" required>
              <a-input
                placeholder="请输入课程类型名称"
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
import { ruleOptions } from './course-category.config'

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
    id: {
      type: [Number, String],
      default: 0
    },
    setting_name: {
      type: String,
      default: ''
    }
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
  mounted() {
    this.form.setFieldsValue({
      id: this.id,
      setting_name: this.setting_name
    })
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        this.editService.updateCourseCategory(values).subscribe(() => {
          this.messageService.success({
            content: '编辑成功'
          })
          this.$emit('change')
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
