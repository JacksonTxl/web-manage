<template>
  <st-modal
    title="延长有效期"
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
              {{ info$.reset_end_time }}
            </st-info-item>
            <st-info-item label="购买课时">
              {{ info$.course_name }}
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
      <st-form :form="form" labelWidth="88px">
        <div :class="transfer('transfer')">
          <st-form-item label="到期时间" required>
            <a-time-picker></a-time-picker>
          </st-form-item>
          <st-form-item label="备注">
            <st-textarea></st-textarea>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button @click="onSubmit" type="primary">
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { ActivatedService } from './lease.service'
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
    const { info$ } = this.service
    return {
      info$
    }
  },
  props: {
    id: String
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators
    }
  },
  methods: {
    init() {
      this.service.getLeaseAndactivatedCourseInfo(this.id).subscribe()
    },
    onSubmit() {
      this.form.validate().then(res => {
        console.log('fff')
      })
    }
  },
  created() {
    this.init()
  }
}
</script>
