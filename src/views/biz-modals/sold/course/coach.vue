<template>
  <st-modal
    title="修改教练"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-package-coach"
  >
    <st-form :form="form" labelWidth="72px">
      <div :class="coach('content')">
        <st-info :class="coach('info')">
          <st-info-item label="课程名称">{{ record.course_name }}</st-info-item>
          <st-info-item label="上课教练">{{ record.coach_name }}</st-info-item>
          <st-info-item label="有效期">
            {{ record.buy_time }} 至 {{ record.end_time }}
          </st-info-item>
        </st-info>
        <st-hr></st-hr>
        <st-form-item label="修改教练" required>
          <a-select
            v-decorator="['coach', { rules: [{ validator: coach_validator }] }]"
            placeholder="选择修改教练"
          >
            <a-select-option
              v-for="(item, index) in coachList"
              :key="index"
              :value="item.id"
            >
              {{ item.staff_name }}
            </a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="备注">
          <st-textarea
            :maxlength="30"
            v-decorator="['description']"
            :autosize="{ minRows: 4, maxRows: 6 }"
          />
        </st-form-item>
      </div>
    </st-form>
    <template slot="footer">
      <st-button @click="onSubmit" :loading="loading.edit" type="primary">
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
import { CoachService } from './coach.service'
export default {
  name: 'ModalSoldPersonalCoach',
  bem: {
    coach: 'modal-sold-personal-coach'
  },
  serviceInject() {
    return {
      coachService: CoachService
    }
  },
  rxState() {
    return {
      loading: this.coachService.loading$,
      coachList: this.coachService.coachList$
    }
  },
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  watch: {
    record: {
      deep: true,
      handler() {
        this.getCoachList()
      }
    }
  },
  created() {
    this.getCoachList()
  },
  data() {
    return {
      form: this.$form.createForm(this),
      show: false
    }
  },
  methods: {
    // pay_type validatorFn
    coach_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择修改教练')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    getCoachList() {
      this.coachService.getCoachList().subscribe()
    },
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.coachService
            .edit(
              {
                coach_id: values.coach,
                description: values.description
              },
              this.record.id
            )
            .subscribe(res => {
              this.$emit('success')
              this.show = false
            })
        }
      })
    },
    moment
  }
}
</script>
