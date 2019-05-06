<template>
  <a-form
    layout="inline"
    :form="form"
  >
    <a-form-item label="Price">

      <price-input
        v-decorator="[
          'price',
          {
            initialValue: { number: 0, currency: 'rmb' },
            rules: [{ validator: checkPrice }],
          }
        ]"
      />

    </a-form-item>
    <a-form-item>

      <st-input-number :float="true" v-model="abc">
        <!-- <template slot="addonAfter">元2</template> -->
        <a-select slot="addonAfter" defaultValue=".com" style="width: 80px">
          <a-select-option value=".com">.com</a-select-option>
          <a-select-option value=".jp">.jp</a-select-option>
          <a-select-option value=".cn">.cn</a-select-option>
          <a-select-option value=".org">.org</a-select-option>
        </a-select>
      </st-input-number>

    </a-form-item>

{{typeof abc}}
{{abc}}
  </a-form>
</template>

<script>
const hasProp = (instance, prop) => {
  const $options = instance.$options || {}
  const propsData = $options.propsData || {}
  return prop in propsData
}
const PriceInput = {
  props: ['value'],
  template: `
    <span>
      <a-input
        type='text'
        :value="number"
        @change="handleNumberChange"
        style="width: 63%; margin-right: 2%;"
      />
    </span>
  `,
  data() {
    const value = this.value || {}
    return {
      abc: 10,
      number: value.number || 0,
      currency: value.currency || 'rmb'
    }
  },
  watch: {
    value(val = {}) {
      this.number = val.number || 0
      this.currency = val.currency || 'rmb'
    }
  },
  methods: {
    handleNumberChange(e) {
      const number = parseInt(e.target.value || 0, 10)
      if (isNaN(number)) {
        return
      }
      if (!hasProp(this, 'value')) {
        this.number = number
      }
      this.triggerChange({ number })
    },
    handleCurrencyChange(currency) {
      if (!hasProp(this, 'value')) {
        this.currency = currency
      }
      this.triggerChange({ currency })
    },
    triggerChange(changedValue) {
      // Should provide an event to pass value to Form.
      this.$emit('change', Object.assign({}, this.$data, changedValue))
    }
  }
}

export default {
  components: {
    PriceInput
  },
  data() {
    return {
      abc: 11
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleSubmit(e) {
      // e.preventDefault()
      // this.form.validateFields((err, values) => {
      //   if (!err) {
      //     console.log('Received values of form: ', values)
      //   }
      // })
    },
    checkPrice(rule, value, callback) {
      console.log(value)
      if (value.number > 0) {
        callback()
        return
      }
      // eslint-disable-next-line
      callback('Price must greater than zero!')
    },
    check(rule, value, callback) {
      console.log(value)
      // eslint-disable-next-line
      callback()
    }
  }
}

</script>
