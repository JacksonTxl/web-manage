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
          v-decorator="decorators.subject"
          placeholder="请输入简要的待办主题"
        ></a-input>
      </st-form-item>
      <st-form-item label="待办内容" required>
        <st-textarea
          v-decorator="decorators.content"
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
import { ruleOptions } from './add-work-note.config'
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
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        this.addWorkNoteService.addWorkNote(values).subscribe(() => {
          this.show = false
          this.$emit('success')
        })
      })
    }
  }
}
</script>
