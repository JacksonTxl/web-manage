<template>
  <section class="sg-section">
    <h3>st-input-number</h3>
    <h5>
      此input只能输入12位。仅支持addonAfter插槽（不支持属性形式）。同时为了允许输入'\.',所以返回值为string类型。此input组件适用输入date
      price表单。
    </h5>
    <h5>float=true 支持小数（1位），默认false</h5>
    <section style="border: 1px solid #ccc;">
      <st-panel>
        <a-form :form="form">
          <a-form-item label="整数">
            <st-input-number v-model="inputnumber1" style="width:200px">
              <a-select slot="addonAfter" defaultValue="1" style="width: 60px">
                <a-select-option value="1">天</a-select-option>
                <a-select-option value="2">月</a-select-option>
                <a-select-option value="3">年</a-select-option>
              </a-select>
            </st-input-number>
            <br />
            value:{{ inputnumber1 }}
            <br />
            typeof:{{ typeof inputnumber1 }}
          </a-form-item>
          <a-form-item label="小数">
            <st-input-number
              v-model="inputnumber2"
              :float="true"
              style="width:200px"
            >
              <template slot="addonAfter">
                元
              </template>
            </st-input-number>
            <br />
            value:{{ inputnumber2 }}
            <br />
            typeof:{{ typeof inputnumber2 }}
            <br />
            <br />
          </a-form-item>
          <a-form-item label="v-decorator">
            <st-input-number
              v-decorator="[
                'inputnumber3',
                { initialValue: '400', rules: [{ validator: validator3 }] }
              ]"
              @change="change3"
              style="width:200px"
            ></st-input-number>
            -value:{{ inputnumber3 }}-typeof:{{ typeof inputnumber3 }}
            <br />
            <br />
          </a-form-item>
        </a-form>
      </st-panel>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      inputnumber1: 100,
      inputnumber2: 'aa',
      inputnumber3: 300
    }
  },
  methods: {
    validator3(rule, value, callback) {
      console.log(value)
      if (value > 0) {
        callback()
        return
      }
      // eslint-disable-next-line
      callback('请输入大于0的数')
    },
    change3(e) {
      this.inputnumber3 = e
    }
  }
}
</script>
