<template>
  <st-panel >
    <!-- <st-range-picker :disabledDays="180"></st-range-picker> -->
    <st-form :form="form" @submit="save">
      <st-form-item>
        <st-select :list="list" placeholder="请选择" v-decorator="rules.country_prefix"></st-select>
      </st-form-item>
      <st-form-item class="mg-l24" labelOffset>
        <st-button type="primary" ghost html-type="submit">保存</st-button>
      </st-form-item>
    </st-form>
  </st-panel>
</template>
<script>
// import StRangePicker from '@/views/components/datetime-picker/range-picker'
import StSelect from '@/views/components/select/select'
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      list: [{
        label: 'test1',
        value: 1
      }],
      rules: {
        country_prefix: ['country_prefix']
      }
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        }
      })
    }
  },
  components: {
    StSelect
  }
}
</script>
