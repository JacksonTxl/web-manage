<template>
  <div :class="course()">
    <st-form>
      <div :class="course('bdbox')" v-for="(li, index) in list" :key="index">
        <st-t3 class="mg-y32" v-if="li.course_type === 1">推荐私教课</st-t3>
        <st-t3 class="mg-y32" v-if="li.course_type === 2">推荐团体课</st-t3>
        <st-t3 class="mg-y32" v-if="li.course_type === 3">推荐课程包</st-t3>
        <st-form-item label="模块名称">
          <a-input
            placeholder="请输入模块名称"
            v-model="li.module_name"
            maxlength="10"
          ></a-input>
        </st-form-item>
        <st-form-item label="展示课程" v-if="li.course_type === 1">
          <a-select placeholder="请输入展示课程" v-model="li.data_source">
            <a-select-option :value="1">门店全部私教课</a-select-option>
            <a-select-option :value="2">
              展示可约天内门店排定私教课
            </a-select-option>
            <a-select-option :value="3">展示门店热门私教课</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="展示课程" v-if="li.course_type === 2">
          <a-select placeholder="请输入展示课程" v-model="li.data_source">
            <a-select-option :value="1">
              展示门店可约天内的团体课
            </a-select-option>
            <a-select-option :value="2">展示门店热门团体课</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="展示课程" v-if="li.course_type === 3">
          <a-select placeholder="请输入展示课程" v-model="li.data_source">
            <a-select-option :value="1">门店全部课程包</a-select-option>
            <a-select-option :value="2">展示门店热销课程包</a-select-option>
            <a-select-option :value="3">展示门店最新课程包</a-select-option>
          </a-select>
        </st-form-item>
      </div>
    </st-form>
    <p>当前模块小程序端以门店课程为准，此处图片仅供参考</p>
  </div>
</template>
<script>
import { H5WrapperService } from './h5-wrapper.service'
import { cloneDeep } from 'lodash-es'
export default {
  bem: {
    course: 'course-component'
  },
  serviceInject() {
    return {
      h5WrapperService: H5WrapperService
    }
  },
  rxState() {
    return {
      courseInfo: this.h5WrapperService.courseInfo$
    }
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.list = cloneDeep(this.courseInfo)
  },
  watch: {
    list: {
      deep: true,
      handler(newVal) {
        this.h5WrapperService.SET_H5INFO(newVal, 5)
      }
    }
  },
  methods: {}
}
</script>
