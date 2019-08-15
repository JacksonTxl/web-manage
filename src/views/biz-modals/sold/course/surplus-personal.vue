<template>
  <st-modal
    title="修改剩余课时"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-course-surplus"
  >
    <st-form :form="form" labelWidth="72px">
      <div :class="surplus('content')">
        <st-info :class="surplus('info')" class="mg-b24">
          <st-info-item label="课程名称">
            {{ courseData.course_name }}
          </st-info-item>
          <st-info-item label="剩余课时">
            {{ courseData.remain_course_num }}
          </st-info-item>
          <st-info-item label="有效期">
            {{ moment(courseData.buy_time * 1000).format('YYYY-MM-DD HH:mm') }}
            至
            {{ moment(courseData.end_time * 1000).format('YYYY-MM-DD HH:mm') }}
          </st-info-item>
        </st-info>
        <st-hr marginTop="0" marginBottom="0"></st-hr>
        <st-form-item label="修改课时" required class="mg-t24">
          <st-input-number
            v-decorator="['times', { rules: [{ validator: times_validator }] }]"
            placeholder="请输入修改后的额度"
          >
            <template slot="addonAfter">
              节
            </template>
          </st-input-number>
        </st-form-item>
        <st-form-item label="备注" class="mg-b0">
          <a-textarea
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
import { SurplusService } from './surplus-personal.service'
import moment from 'moment'
export default {
  name: 'ModalSoldCourseSurplus',
  bem: {
    surplus: 'modal-sold-course-surplus'
  },
  serviceInject() {
    return {
      surplusService: SurplusService
    }
  },
  rxState() {
    return {
      loading: this.surplusService.loading$
    }
  },
  props: {
    courseData: {
      type: Object
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      show: false
    }
  },
  methods: {
    // times validatorFn
    times_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请输入修改课时')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    moment,
    onSubmit() {
      this.form.validate((error, values) => {
        if (!error) {
          this.surplusService
            .edit(
              {
                remain_course: +values.times,
                description: values.description
              },
              this.courseData.id
            )
            .subscribe(() => {
              this.show = false
              this.$emit('success')
            })
        }
      })
    }
  }
}
</script>
