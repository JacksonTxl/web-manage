<template>
  <st-modal
    :bModal="bModal()"
    title="群发短信"
    v-model="show"
    @ok="save"
    @cancel="cancel"
    :footer="null"
  >
    <st-form :form="form">
      <st-form-item labelWidth="70px" label="接受对象">
        <a-input v-decorator="decorators.title" placeholder="请输入模版名称" />
      </st-form-item>
      <st-form-item labelWidth="70px" label="发送时间">
        <a-textarea
          v-decorator="decorators.content"
          maxlength="280"
          :autosize="{ minRows: 4, maxRows: 6 }"
          placeholder="请输入模版内容"
        />
      </st-form-item>
      <st-form-item labelWidth="70px" label="编辑短信">
        三体云动
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { ruleOptions } from './template.config'

export default {
  name: 'SettingSmsGroup',
  bem: {
    bModal: 'setting-sms-group'
  },
  props: {},
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
    save() {},
    cancel() {}
  }
}
</script>
