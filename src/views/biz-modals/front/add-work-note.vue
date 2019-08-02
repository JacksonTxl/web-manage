<template>
  <st-modal
    title="添加待办"
    size="small"
    v-model="show"
    wrapClassName="modal-front-add-work-note"
  >
    <st-form :form="form" labelWidth="66px">
      <st-form-item label="待办主题" required>
        <a-input
          v-decorator="[
            'subject',
            { rules: [{ required: true, message: '请输入待办主题' }] }
          ]"
          placeholder="请输入简要的待办主题"
        ></a-input>
      </st-form-item>
      <st-form-item label="待办内容" required>
        <st-textarea
          v-decorator="[
            'content',
            { rules: [{ required: true, message: '请输入待办内容' }] }
          ]"
          placeholder="请输入具体的待办内容"
        />
      </st-form-item>
    </st-form>
    <template slot="footer">
      <st-button @click="show = false">取消</st-button>
      <st-button
        @click="onSubmit"
        :loading="loading.addWorkNote"
        type="primary"
      >
        添加
      </st-button>
    </template>
  </st-modal>
</template>
<script>
import { AddWorkNoteService } from './add-work-note.service'
export default {
  name: 'ModalShopFrontAddWorkNote',
  bem: {
    add: 'modal-front-add-work-note'
  },
  serviceInject() {
    return {
      addWorkNoteService: AddWorkNoteService
    }
  },
  rxState() {
    return {
      loading: this.addWorkNoteService.loading$
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.addWorkNoteService
            .addWorkNote({
              subject: values.subject,
              content: values.content
            })
            .subscribe(() => {
              this.show = false
              this.$emit('success')
            })
        }
      })
    }
  }
}
</script>
