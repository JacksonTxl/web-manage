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
        <st-form labelWidth="68px" :form="form">
          <st-form-item label="添加课程" required class="mg-t12">
            <a-select
              placeholder="请选择课程"
              v-decorator="decorators.course_id"
            >
              <a-select-option
                v-for="course in courseOptions"
                :key="course.id"
                :value="course.id"
              >
                {{ course.course_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="预约日期" required>
            <a-date-picker
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
            <a-cascader
              placeholder="请选择场地"
              :options="courtOptions"
              :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
              v-decorator="decorators.court_id"
            />
          </st-form-item>
          <st-form-item label="教练" required>
            <a-select
              placeholder="请选择教练"
              v-decorator="decorators.coach_id"
            >
              <a-select-option
                v-for="coach in coachOptions"
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
    item: {
      type: Array,
      default() {
        return []
      }
    },
    cycleIndex: {
      type: Number,
      default: 0
    },
    week: {
      type: Number,
      default: 1
    }
  },
  watch: {
    item(newVal) {
      //console.log(newVal)
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      coachId: '',
      form,
      decorators,
      // mock
      courseOptions: [
        {
          id: 19,
          course_name: 'aaaaa'
        },
        {
          id: 25,
          course_name: 'kkkkkkkk'
        },
        {
          id: 34,
          course_name: 'test_course'
        }
      ],
      coachOptions: [
        {
          id: 1,
          staff_name: '姓名1'
        },
        {
          id: 67,
          staff_name: '姓名67'
        }
      ],
      courtOptions: [
        {
          id: 1,
          name: '啊啊啊啊啊',
          seat: [
            {
              id: 3,
              name: '模板一'
            },
            {
              id: 6,
              name: '模板二'
            },
            {
              id: 7,
              name: '模板二'
            }
          ]
        },
        {
          id: 2,
          name: '动感打王赛康车阿萨德',
          seat: [
            {
              id: 2,
              name: '22222222'
            }
          ]
        },
        {
          id: 3,
          name: '动感打车'
        },
        {
          id: 4,
          name: '跑步机'
        }
      ]
    }
  },
  created() {
    // console.log(this.cycleIndex)
    // console.log(this.week)
  },
  methods: {
    hide() {
      this.item[0].show = false
    },
    // 增加课程
    addCourse() {},
    onSubmit() {
      this.form.validate().then(values => {
        const form = cloneDeep(values)
        form.start_days = form.start_days.format('YYYY-MM-DD')
        form.start_time = form.start_time.format('HH:mm')
        // console.log(form)
        if (form.court_id) {
          form.court_site_id = +form.court_id[1]
          form.court_id = +form.court_id[0]
        }
        this.$emit('addCourse', form, this.cycleIndex, this.week)
        this.item[0].show = false
        // 调用冲突验证接口
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
