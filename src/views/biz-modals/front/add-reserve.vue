<template>
  <st-modal
    size="small"
    title="添加到访预约"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="loading$.addReserve"
  >
    <st-form :form="form">
      <form-member-search
        label="预约用户"
        :form="form"
        :decorators="decorators"
        :fields="{ member_id: 'reserve_id' }"
        type="transaction"
      ></form-member-search>
      <st-form-item label="预约时间" required>
        <a-date-picker
          v-decorator="decorators.reserve_date"
          placeholder="预约日期"
          allowClear
          :disabledDate="disabledDate"
          :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
          format="YYYY-MM-DD HH:mm"
        ></a-date-picker>
      </st-form-item>
      <st-form-item label="接待人员">
        <a-select
          v-decorator="decorators.receptionist_id"
          :options="staffList$"
        ></a-select>
      </st-form-item>
    </st-form>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { AddReserveService } from './add-reserve.service'
import { ruleOptions } from './add-reserve.config'
import FormMemberSearch from '@/views/biz-components/member-search/member-search'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'FrontAddReserve',
  serviceProviders() {
    return [AddReserveService]
  },
  serviceInject() {
    return {
      addReserveService: AddReserveService
    }
  },
  rxState() {
    const { loading$, memberList$, staffList$ } = this.addReserveService
    return {
      loading$,
      memberList$,
      staffList$
    }
  },
  components: {
    FormMemberSearch
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
    moment,
    disabledDate(current) {
      return (
        current &&
        (current < moment().add(-1, 'day') ||
          current > moment().add(1, 'month'))
      )
    },
    onSubmit() {
      this.form.validate().then(values => {
        let form = cloneDeep(values)
        form.reserve_date = moment(form.reserve_date).format('YYYY-MM-DD')
        form.reserve_time = moment(form.reserve_date).format('HH:mm')
        this.addReserveService.addReserve(form).subscribe(res => {
          this.show = false
          this.$emit('success')
        })
      })
    }
  },
  created() {
    this.addReserveService.getStaffList().subscribe()
  }
}
</script>
