<template>
  <st-modal
    v-model="show"
    title="test"
  >
    <st-form :form="form">
      <st-form-item label="name" required>
        <a-input
          placeholder="name"
          v-decorator="['name', { initialValue: name }]"
        />
      </st-form-item>
      <st-form-item label="age" required>
        <a-input
          placeholder="age"
          v-decorator="['age']"
        />
      </st-form-item>
    </st-form>
  </st-modal>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    age: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setFieldsValue()
    })
  },
  methods: {
    setFieldsValue() {
      this.form.setFieldsValue({
        age: this.age
      })
    }
  }
}
</script>
