<template>
  <st-modal
    :title="titleList[type]"
    @ok="onOk"
    v-model='show'>
    <div :class="course()">
      <div :class="course('search')">
        <a-select :class="course('search-select')" :getPopupContainer="trigger => trigger.parentNode" v-model="searchData.course_type" @change="onCourseTypeChange">
          <a-select-option v-for="(item,index) in courseTypeList" :key="index" :value="item.id">{{item.setting_name}}</a-select-option>
        </a-select>
        <st-input-search @search="getCourseList" v-model="searchData.search" :class="course('search-input')" placeholder="请输入课程名称进行查询"/>
      </div>
      <div :class="course('all-table')">
        <st-form-table>
          <colgroup>
            <col style="width:26%;">
            <col style="width:22%;">
            <col style="width:31%;">
            <col style="width:21%;">
          </colgroup>
          <tr class="bg-thead">
            <th class="pl-24">课程类别</th>
            <th>课程类型</th>
            <th>课程名称</th>
            <th>操作</th>
          </tr>
          <tbody>
            <tr>
              <td colspan="4">
                <ul :class="course('scroll-content')" v-scrollBar='{stopPropagation:true}'>
                  <li class="table-item" v-for="(item,index) in courseList" :class="{'bg-row-odd':index%2===0,'bg-row-even':index%2!==0}" :key="item.course_id">
                    <div class="pl-24">{{item.course_category}}</div>
                    <div>{{item.course_type}}</div>
                    <div>{{item.course_name}}</div>
                    <div><a href="javascript:void(0)" @click="onAdd(item.course_id)">添加</a></div>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </st-form-table>
      </div>
      <p :class="course('count')">
        <span>共查到{{courseList.length}}条记录</span>
        <a href="javascript:void(0)" :disabled="courseList.length<1" @click="onAllAdd">全部添加</a>
      </p>
      <p :class="course('selet-course-title')">已选定{{selectCourseList.length}}种课程</p>
      <div :class="course('select-table')">
        <st-form-table>
          <colgroup>
            <col style="width:26%;">
            <col style="width:22%;">
            <col style="width:31%;">
            <col style="width:21%;">
          </colgroup>
          <tr class="bg-thead">
            <th class="pl-24">课程类别</th>
            <th>课程类型</th>
            <th>课程名称</th>
            <th>操作</th>
          </tr>
          <tbody>
            <tr>
              <td colspan="4">
                <ul :class="course('scroll-content')" v-scrollBar='{stopPropagation:true}'>
                  <li class="table-item" v-for="(item,index) in selectCourseList" :class="{'bg-row-odd':index%2===0,'bg-row-even':index%2!==0}" :key="item.course_id">
                    <div class="pl-24">{{item.course_category}}</div>
                    <div>{{item.course_type}}</div>
                    <div>{{item.course_name}}</div>
                    <div><a href="javascript:void(0)" @click="onRemove(item.course_id)">删除</a></div>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </st-form-table>
      </div>
    </div>
  </st-modal>
</template>
<script>
import { SelectCourseService } from './select-course.service'
import { cloneDeep, filter, remove } from 'lodash-es'
export default {
  name: 'SelectCourse',
  serviceInject() {
    return {
      selectCourseService: SelectCourseService
    }
  },
  rxState() {
    return {
      addLoading: this.selectCourseService.loading$
    }
  },
  bem: {
    course: 'st-select-course'
  },
  props: {
    type: {
      type: String,
      default() {
        return 'team'
      }
    },
    courses: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      show: false,
      courseTypeList: [],
      titleList: {
        team: '选择团课',
        personal: '选择私教课'
      },
      searchData: {
        course_type: null,
        search: ''
      },
      courseList: [],
      selectCourseList: []
    }
  },
  methods: {
    onCourseTypeChange(data) {
      this.searchData.search = ''
      this.searchData.course_type = data
      this.getCourseList()
    },
    onAdd(id) {
      let arr = filter(this.courseList, o => o.course_id === id)
      this.selectCourseList.push(...arr)
      this.filterCourse()
    },
    onAllAdd() {
      this.selectCourseList.push(...cloneDeep(this.courseList))
      this.courseList = []
    },
    onRemove(id) {
      let arr = cloneDeep(this.selectCourseList)
      remove(arr, o => o.course_id === id)
      this.selectCourseList = arr
      this.getCourseList()
    },
    onOk() {
      this.$emit('ok', { list: cloneDeep(this.selectCourseList) })
      this.show = false
    },
    // 根据已选课程，过滤可选课程
    filterCourse() {
      let arr = cloneDeep(this.courseList)
      this.selectCourseList.forEach(i => {
        remove(arr, o => o.course_id === i.course_id)
      })
      this.courseList = arr
    },
    getCourseType() {
      this.selectCourseService.getCourseTypeList().subscribe(res => {
        this.courseTypeList = cloneDeep(res.list)
        this.searchData.course_type = res.list[0].id
        this.getCourseList()
      })
    },
    getCourseList() {
      this.selectCourseService.getCourseList({
        type: this.type,
        search: this.searchData.search,
        course_type: this.searchData.course_type
      }).subscribe(res => {
        this.courseList = cloneDeep(res.list)
        this.filterCourse()
      })
    }
  },
  created() {
    this.getCourseType()
    this.selectCourseList.push(...this.courses)
  }
}
</script>
