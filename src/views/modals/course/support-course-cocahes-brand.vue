<template>
  <st-modal
    class="modal-support-course-shops"
    :title="course.course_name + ' 查看授课教练'"
    v-model='show'>
    <div class="modal-support-course-shops__search">
      <a-select showSearch :defaultValue="defaultValue"  :filterOption="filterOption" optionFilterProp="children" class="mg-r8" style="width: 160px" @change="onChange">
        <a-select-option v-for="category in categoryList" :key="category.id" :value="category.id">{{category.setting_name}}</a-select-option>
      </a-select>
      <st-input-search placeholder="通过教练项目、昵称、手机号查询"></st-input-search>
    </div>
    <st-container>
    <st-table
    :columns="columnsCoaches"
    :rowKey="record => record.id"
    :pagination="{simple: true}"
    :dataSource="supportCoachList">
    </st-table>
    </st-container>
  </st-modal>
</template>
<script>
import { columnsCoaches } from './support-table'
import { BrandService } from '../../pages/brand/product/course/personal/list/brand.service'
export default {
  name: 'SupportCourseCoachesBrand',
  serviceInject() {
    return {
      brandService: BrandService
    }
  },
  data() {
    return {
      columnsCoaches,
      show: false,
      courseStatus: [{ label: '所有状态', value: -1 }, { label: '有效', value: 1 }, { label: '无效', value: 0 }],
      supportCoachList: []
    }
  },
  props: {
    course: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getShops() {
      this.brandService.getCoursePersonalSupportCoaches({ course_id: this.course.course_id }).subscribe(state => {
        this.supportCoachList = state.coaches
      })
    }
  },
  mounted() {
    this.getShops()
  }
}
</script>
