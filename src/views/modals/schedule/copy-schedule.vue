<template>
  <st-modal title="复制排期" @ok="save" v-model="show">
    {{copyStartDate}}{{copyEndDate}}
    <st-form :form="form">
      <st-form-item label="时间" required>
        <a-radio-group @change="onChangeTimeType">
          <a-radio value="month">
            上月
          </a-radio>
          <a-radio value="week">
            上周
          </a-radio>
          <a-radio value="custom">
            自定义
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
      form: this.$form.createForm(this),
      copyStartDate: '',
      copyEndDate: ''
    }
  },
  methods: {
    onChangeTimeType(e) {
      if (e.target.value === 'month') {
        this.copyStartDate = moment().month(moment().month() - 1).startOf('month').format('L')
        this.copyEndDate = moment().month(moment().month() - 1).endOf('month').format('L')
      } else if (e.target.value === 'week') {
        this.copyStartDate = moment().week(moment().week() - 1).startOf('week').format('L')
        this.copyEndDate = moment().week(moment().week() - 1).endOf('week').format('L')
      } else if (e.target.value === 'custom') {
        this.copyStartDate = moment().month(moment().month() - 1).startOf('month').format('L')
        this.copyEndDate = moment().month(moment().month() - 1).endOf('month').format('L')
      }
    },
    onChange() {

    },
    save() {

    }
  }
}
</script>
