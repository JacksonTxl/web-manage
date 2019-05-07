<template>
  <st-modal title="添加预约" @ok="save" v-model="show">
    <st-form :form="form">
      <st-form-item label="会员名称" required>
        <a-input-search @change="onChange"/>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select @change="onChange" />
      </st-form-item>
      <st-form-item label="消费方式" required>
        <a-select @change="onChange" />
      </st-form-item>
      <st-form-item label="上课教练" required>
        <a-select @change="onChange" />
      </st-form-item>
      <st-form-item label="预约时间" required>

        <a-date-picker @change="onChange" />
      </st-form-item>
    </st-form>
  </st-modal>
</template>

<script>
export default {
  name: 'AddOrder',
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onChange() {

    },
    save() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
