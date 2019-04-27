<template>
  <div>
    <a-select :defaultValue="value" placeholder="请选择课程类型" @change="change">
      <a-select-option :value="-1">请选择课程类型</a-select-option>
      <a-select-option :value="item.id" v-for="item in list" :key="item.id">{{item.setting_name}}</a-select-option>
    </a-select>
  </div>
</template>

<script>
import { SelectCourseCategoryService } from './select-course-category.service'
export default {
  name: 'StSelectCourseCategory',
  serviceInject() {
    return {
      selectCourseCategoryService: SelectCourseCategoryService
    }
  },
  props: {
    value: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      list: []
    }
  },
  rxState() {
    return {
      list: this.selectCourseCategoryService.list$
    }
  },
  created() {
    this.selectCourseCategoryService.getCourseCategoryList().subscribe()
  },
  methods: {
    change(val) {
      this.$emit('change', val)
    }
  }
}
</script>
