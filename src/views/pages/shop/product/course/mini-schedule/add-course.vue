<template>
  <a-popover
    trigger="click"
    overlayClassName="modal-shop-mini-add-course"
    v-model="item[0].show"
    placement="bottom"
    title="添加课程"
  >
    <template :class="b('wrapper')" slot="content">
      <span :class="b('head-close')" @click="hide">X</span>
      <div class="add-course-conent">
        <st-form labelWidth="68px">
          <st-form-item label="添加课程" required class="mg-t12">
            <a-input
              v-decorator="[
                'course_name',
                {
                  rules: [
                    { required: true, message: '请输入课程包名称' },
                    { min: 2, message: '最少2个字符' },
                    { max: 30, message: '最多30个字符' }
                  ]
                }
              ]"
              placeholder="请输入课程包名称"
            />
          </st-form-item>
          <st-form-item label="预约日期" required>
            <a-date-picker
              @change="onChangeDatePick"
              style="width:100%"
              v-decorator="decorators.start_days"
            />
          </st-form-item>
          <st-form-item label="预约时间" required>
            <a-time-picker
              format="HH:mm"
              style="width:100%"
              v-decorator="decorators.start_time"
            />
          </st-form-item>
          <st-form-item label="场地" required>
            <a-select
              placeholder="请选择场地"
              v-model="coachId"
              v-decorator="decorators.court_id"
            >
              <a-select-option
                v-for="coach in {}"
                :key="coach.id"
                :value="coach.id"
              >
                {{ coach.staff_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="教练" required>
            <a-select
              placeholder="请选择教练"
              v-model="coachId"
              v-decorator="decorators.course_id"
            >
              <a-select-option
                v-for="coach in {}"
                :key="coach.id"
                :value="coach.id"
              >
                {{ coach.staff_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
        </st-form>
      </div>
      <div class="footer">
        <div :class="b('save-schedule-btn')">
          <st-button @click="hide">
            取消
          </st-button>
          <st-button type="primary" class="mg-l12" @click="onSubmit">
            提交
          </st-button>
        </div>
      </div>
    </template>
    <st-button block type="dashed" icon="add" @click="addCourse('team')">
      添加课程
    </st-button>
  </a-popover>
</template>

<script>
import { ruleOptions } from './add-course.config'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'ModalShopMiniAddCourse',
  bem: {
    b: 'modal-shop-mini-add-course'
  },
  props: {
    item: Array,
    default: []
  },
  watch: {},
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      coachId: '',
      form,
      decorators
    }
  },
  created() {
    console.log(this.item)
  },
  methods: {
    onChangeDatePick(val) {
      this.start = val[0].format('YYYY-MM-DD').valueOf()
      this.end = val[1].format('YYYY-MM-DD').valueOf()
    },
    hide() {
      this.item[0].show = false
    },
    // 增加课程
    addCourse() {},
    onSubmit() {
      this.form.validate().then(values => {
        const form = cloneDeep(values)
        console.log(form)
        // form.start_time = form.start_time.format('YYYY-MM-DD HH:mm')
        // if (form.court_id) {
        //   form.court_site_id = +form.court_id[1]
        //   form.court_id = +form.court_id[0]
        // }
        // form.course_fee = form.course_fee
        // form.limit_num = form.limit_num
        // this.teamScheduleScheduleService.add(form).subscribe(() => {
        //   this.$emit('ok')
        //   this.show = false
        // })
      })
    },
    save() {
      let reqdata = {
        id: this.coachId,
        schedule_start_time: this.start,
        schedule_end_time: this.end,
        scheduleInfo: this.scheduleInfo
      }
      this.scheduleService.addScheduleInBatch(reqdata).subscribe(() => {
        this.show = false
        this.$router.push({
          query: {
            ...this.$searchQuery
          }
        })
      })
    }
  }
}
</script>
