<template>
  <st-modal
    :title="`修改${$c('coach')}`"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-package-coach"
  >
    <st-form :form="form" labelWidth="72px">
      <div :class="coach('content')">
        <st-info :class="coach('info')">
          <st-info-item label="课程名称">{{ record.course_name }}</st-info-item>
          <st-info-item :label="`上课${$c('coach')}`">
            {{ record.coach_name }}
          </st-info-item>
          <st-info-item label="有效期">
            {{ record.buy_time }} 至 {{ record.end_time }}
          </st-info-item>
        </st-info>
        <st-hr></st-hr>
        <st-form-item :label="`修改${$c('coach')}`" required>
          <a-select
            v-decorator="decorators.coach"
            :placeholder="`选择修改${$c('coach')}`"
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
            v-decorator="decorators.description"
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
import { ruleOptions } from './coach.config'
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
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false
    }
  },
  methods: {
    getCoachList() {
      this.coachService.getCoachList().subscribe()
    },
    onSubmit() {
      this.form.validate((error, values) => {
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
