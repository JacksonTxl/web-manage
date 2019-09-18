<template>
  <st-modal
    title="重新激活"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-course-transfer"
  >
    <div :class="transfer('content')">
      <a-row :class="transfer('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="课程名称">
              {{ info$.course_name }}
            </st-info-item>
            <st-info-item label="剩余课时">
              {{ info$.remain_course_num }}
            </st-info-item>
            <st-info-item label="购买课时">
              {{ info$.buy_course_num }}
            </st-info-item>
            <st-info-item label="到期日期">{{ info$.end_time }}</st-info-item>
            <st-info-item label="实付金额">
              {{ info$.pay_price }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="会员姓名">
              {{ info$.member_name }}
            </st-info-item>
            <st-info-item label="手机号">
              {{ info$.mobile }}
            </st-info-item>
            <st-info-item label="订单号">
              {{ info$.order_id }}
            </st-info-item>
            <st-info-item label="订单状态">
              {{ info$.order_status | enumFilter('sold.course_status') }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-hr marginTop="0" marginBottom="0" />
      <st-form :form="form" class="mg-t24">
        <div :class="transfer('transfer')">
          <st-form-item label="到期时间" required>
            <a-date-picker
              format="YYYY-MM-DD HH:mm:ss"
              :disabledDate="disabledDate"
              v-decorator="decorators.end_time"
              :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
            />
          </st-form-item>
          <st-form-item label="备注">
            <st-textarea
              v-decorator="decorators.description"
              :maxlength="200"
            ></st-textarea>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button
        @click="onSubmit"
        :loading="loading$.setActivatedCourse"
        type="primary"
      >
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { ActivatedService } from './activated.service'
import { ruleOptions } from './activated.config'
import moment from 'moment'
export default {
  name: 'ModalSoldCourseActivated',
  bem: {
    transfer: 'modal-sold-course-Activated'
  },
  serviceProviders() {
    return [ActivatedService]
  },
  serviceInject() {
    return {
      service: ActivatedService
    }
  },
  rxState() {
    const { info$, loading$ } = this.service
    return {
      info$,
      loading$
    }
  },
  props: ['id', 'type'],
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      moment,
      show: false
    }
  },
  methods: {
    range(start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment(this.info$.end_time).endOf('day')
    },
    init() {
      this.service.getLeaseAndactivatedCourseInfo(this.id).subscribe(res => {
        this.form.setFieldsValue({
          end_time: moment(res.info.reset_end_time)
        })
      })
    },
    onSubmit() {
      this.form.validate().then(values => {
        this.service
          .setActivatedCourse({
            id: this.id,
            ...values
          })
          .subscribe(res => {
            this.$emit('success')
            this.show = false
          })
      })
    }
  },
  created() {
    this.init()
  }
}
</script>
