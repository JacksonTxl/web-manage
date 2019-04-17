<template>
  <div>
    <a-select placeholder="请选择课程类型" @change="change">
      <a-select-option :value="item.id" v-for="item in list" :key="item.id">{{item.setting_name}}</a-select-option>
    </a-select>
  </div>
</template>

<script>
import { SelectCourseTypeService } from './select-course-type.service'
export default {
  name: 'StSelectCourseType',
  serviceInject() {
    return {
      selectCourseTypeService: SelectCourseTypeService
    }
  },
  data() {
    return {
      list: []
    }
  },
  subscriptions() {
    return {
      list: this.selectCourseTypeService.list$
    }
  },
  created() {
    this.selectCourseTypeService.getCourseTypes().subscribe()
  },
  methods: {
    change(val) {
      this.$emit('change', val)
    }
  }
}
</script>
