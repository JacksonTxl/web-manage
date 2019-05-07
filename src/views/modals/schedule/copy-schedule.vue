<template>
  <st-modal title="复制排期" @ok="save" v-model="show">
    <st-form :form="form">
      <st-form-item label="时间" required>
        <a-radio-group v-decorator="['radio-group']">
          <a-radio value="a">
            item 1
          </a-radio>
          <a-radio value="b">
            item 2
          </a-radio>
          <a-radio value="c">
            item 3
          </a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item label="复制排期" required>
        <a-range-picker @change="onChange" />
      </st-form-item>
      <st-form-item label="应用排期" required>
        <a-range-picker @change="onChange" />
      </st-form-item>
    </st-form>
  </st-modal>
</template>

<script>
export default {
  name: 'CopySchedule',
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
