<template>
  <st-modal
    size="small"
    title="添加到访预约"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="loading$.addReverse"
  >
    <st-form :form="form">
      <st-form-item label="预约用户" required>
        <a-input></a-input>
      </st-form-item>
      <st-form-item label="预约时间" required>
        <a-date-picker
          v-decorator="decorators.reserve_date"
          placeholder="预约日期"
          allowClear
          :disabledDate="disabledDate"
          :showTime="{ format: 'HH:mm', minuteStep: 5 }"
          format="YYYY-MM-DD HH:mm"
        ></a-date-picker>
      </st-form-item>
      <st-form-item label="接待人员">
        <a-select v-decorator="decorators.receptionist_id">
          <a-select-option label="33" value="123">123</a-select-option>
        </a-select>
      </st-form-item>
    </st-form>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { AddReverveService } from './add-reverve.service'
import { ruleOptions } from './add-reserve.config'
export default {
  serviceProviders() {
    return [AddReverveService]
  },
  serviceInject() {
    return {
      addReverveService: AddReverveService
    }
  },
  rxState() {
    const { loading$ } = this.addReverveService
    return {
      loading$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      show: true,
      form,
      decorators
    }
  },
  methods: {
    disabledDate(current) {
      return (
        current &&
        (current < moment().add(-1, 'day') ||
          current > moment().add(1, 'month'))
      )
    },
    onSubmit() {
      this.form.validate().then(values => {
        console.log(values)
        // this.addReverveService.addReverse().subscribe()
      })
    }
  }
}
</script>
