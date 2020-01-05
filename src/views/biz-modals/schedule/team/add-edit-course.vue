<template>
  <st-modal
    title="新增团课周课表"
    @ok="save"
    okText="确定"
    v-model="show"
    width="1082px"
    :class="basic()"
  >
    <div :class="basic('form')">
      <st-form :form="form" labelWidth="96px">
        <st-form-item label="课表名称" required>
          <a-input
            placeholder="请选择课表名称"
            :class="basic('form-name')"
            maxlength="30"
          />
        </st-form-item>
        <st-form-item label="排期起止时间" required>
          <a-range-picker />
        </st-form-item>
        <st-form-item label="排课限制">
          最多排
          <st-input-number
            placeholder="不填则默认排满"
            :class="basic('form-number')"
          >
            <span slot="addonAfter">节</span>
          </st-input-number>
        </st-form-item>
        <st-form-item label="跳过节假日" required>
          <a-radio-group :options="optionArr" v-model="isHoliday" />
        </st-form-item>
        <st-form-item label="最多上课安排" required>
          <div :class="basic('border-box')">
            <st-form-table hoverable :isEmpty="false">
              <thead>
                <tr>
                  <th>星期</th>
                  <th>课程</th>
                  <th>开始时间</th>
                  <th>上课教练</th>
                  <th>场地</th>
                  <th>人数</th>
                  <th>预约价格</th>
                  <th style="width:60px">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="8" class="st-form-table__add">
                    <st-button
                      type="dashed"
                      icon="add"
                      block
                      @click="addCourse"
                    >
                      添加
                    </st-button>
                  </td>
                </tr>

                <template v-for="(item, index) in courseList">
                  <tr :key="index">
                    <td>
                      <a-select placeholder="请选择星期" style="width: 85px">
                        <a-select-option
                          v-for="course in courseOptions"
                          :key="course.id"
                        >
                          {{ course.course_name }}
                        </a-select-option>
                      </a-select>
                    </td>
                    <td>
                      <a-select placeholder="请选择课程" style="width: 85px">
                        <a-select-option
                          v-for="course in courseOptions"
                          :key="course.id"
                        >
                          {{ course.course_name }}
                        </a-select-option>
                      </a-select>
                    </td>
                    <td>
                      <a-date-picker
                        style="width: 120px"
                        :showTime="{ format: 'HH:mm' }"
                        format="YYYY-MM-DD HH:mm"
                        placeholder="请选择时间"
                      />
                    </td>
                    <td>
                      <a-select
                        placeholder="请选择上课教练"
                        style="width: 85px"
                      >
                        <a-select-option
                          v-for="course in courseOptions"
                          :key="course.id"
                        >
                          {{ course.course_name }}
                        </a-select-option>
                      </a-select>
                    </td>
                    <td>
                      <a-select placeholder="请选择场地" style="width: 85px">
                        <a-select-option
                          v-for="course in courseOptions"
                          :key="course.id"
                        >
                          {{ course.course_name }}
                        </a-select-option>
                      </a-select>
                    </td>
                    <td>
                      <st-input-number style="width: 90px">
                        <span slot="addonAfter">人</span>
                      </st-input-number>
                    </td>
                    <td>
                      <st-input-number :float="true" style="width: 110px">
                        <span slot="addonAfter">元/节</span>
                      </st-input-number>
                    </td>
                    <td>
                      <template>
                        <a @click="delRow(index)">
                          删除
                        </a>
                      </template>
                    </td>
                  </tr>
                </template>
              </tbody>
            </st-form-table>
          </div>
        </st-form-item>
      </st-form>
    </div>
  </st-modal>
</template>
<script>
import { AddEditCourseService } from './add-edit-course.service'
// import { MessageService } from '@/services/message.service'
// import { PatternService } from '@/services/pattern.service'
export default {
  serviceInject() {
    return {
      addEditCourseService: AddEditCourseService
    }
  },
  name: 'addEditCourseService',
  bem: {
    basic: 'modal-schedule-team-add-edit-course'
  },
  props: {},
  data() {
    const form = this.$stForm.create()
    return {
      form,
      courseOptions: [],
      optionArr: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 0,
          label: '否'
        }
      ],
      isHoliday: 1,
      courseList: [
        {
          time: '2019-11-11 09:00:00',
          name: '周一课表',
          type: '类型一',
          num: '20',
          person: '王新元'
        }
      ],
      show: false
    }
  },
  created() {},
  methods: {
    // 添加课表
    addCourse() {
      this.$emit('add')
    },
    delRow(index) {
      this.sites.splice(index, 1)
    },
    save(e) {
      this.show = false
      this.$emit('success', true)
    }
  }
}
</script>
