<template>
  <a-popover
    trigger="click"
    overlayClassName="modal-shop-mini-add-course"
    v-model="item.show"
    title="添加课程"
  >
    <!-- <a @click="hide" slot="content">添加</a> -->
    <div :class="b('wrapper')" @click="hide" slot="content">
      <span :class="b('head-close')">X</span>
      <div class="add-course-conent">
        <st-form>
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
          <st-form-item required label="时间" :class="b('select__date')">
            <a-range-picker @change="onChangeRangePicker"></a-range-picker>
          </st-form-item>
          <st-form-item label="场地" required>
            <a-select placeholder="请选择场地" v-model="coachId">
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
            <a-select placeholder="请选择教练" v-model="coachId">
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
          <st-button>
            取消
          </st-button>
          <st-button type="primary" class="mg-l12">
            提交
          </st-button>
        </div>
      </div>
    </div>
    <st-button block type="dashed" icon="add" @click="addCourse('team')">
      添加课程
    </st-button>
  </a-popover>
</template>

<script>
export default {
  name: 'AddScheduleInBatch',
  bem: {
    b: 'modal-shop-mini-add-course'
  },
  props: {
    item: Object,
    default: {}
  },
  watch: {},
  data() {
    return {
      coachId: ''
    }
  },
  created() {},
  methods: {
    onChangeRangePicker(val) {
      this.start = val[0].format('YYYY-MM-DD').valueOf()
      this.end = val[1].format('YYYY-MM-DD').valueOf()
    },
    hide() {
      console.log(111)
      this.weekList[0].show = false
    },
    // 增加课程
    addCourse() {},
    // 新增周期排课
    addScheduleWeek() {
      this.scheduleList.push({ scheduleInfo: {} })
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
