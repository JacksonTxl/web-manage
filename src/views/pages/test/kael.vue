<template>
  <div>
    <a-row :gutter="8">
      <a-col :lg="20">
        <st-form :form="form">
          <st-form-item required>
            <a-date-picker
              format="YYYY-MM-DD HH:mm"
              :disabledDate="disabledDate"
              :disabledTime="disabledDateTime"
              :showTime="{ defaultValue: moment('00:00', 'HH:mm'), format:'HH:mm' }"
            />
            <br>
          </st-form-item>
        </st-form>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    moment,
    range(start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },

    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day')
    },

    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24).splice(1, 20),
        disabledMinutes: () => this.range(30, 60)
      }
    },

    disabledRangeTime(_, type) {
      if (type === 'start') {
        return {
          disabledHours: () => this.range(0, 60).splice(1, 20),
          disabledMinutes: () => this.range(30, 60)
        }
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31)
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    }
  }
}
</script>
