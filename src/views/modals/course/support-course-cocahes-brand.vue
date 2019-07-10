<template>
  <st-modal
    class="modal-support-course-shops"
    :title="course.course_name + ' 查看授课教练'"
    v-model='show'>
    <div class="modal-support-course-shops__search">
      <a-row>
        <a-col :lg="6">
          <a-select showSearch class="mg-r8" style="width: 160px" @change="onChange">
            <a-select-option v-for="coach in coachLevelOptions" :key="coach.id" :value="coach.id">{{coach.name}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :lg="10"></a-col>
        <a-col :lg="8">
          <st-input-search @search="onSearchKeyWords" placeholder="通过教练昵称查询"></st-input-search>
        </a-col>
      </a-row>
    </div>
    <st-container class="mg-t16">
      <st-table
      :columns="columnsCoaches"
      :rowKey="record => record.id"
      :pagination="{simple: true}"
      :dataSource="supportCoachTable">
      </st-table>
    </st-container>
  </st-modal>
</template>
<script>
import { columnsCoaches } from './support-table'
import { BrandService } from '../../pages/brand/product/course/personal/list/brand.service'
import { cloneDeep } from 'lodash-es'
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
      coachLevelOptions: [],
      supportCoachList: [],
      supportCoachTable: []
    }
  },
  props: {
    course: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onChange(val) {
      if (val) {
        this.supportCoachTable = this.supportCoachList.filter(item => {
          return item.coach_level_id === val
        })
      } else {
        this.supportCoachTable = cloneDeep(this.supportCoachList)
      }
    },
    onSearchKeyWords(val) {
      if (val) {
        this.supportCoachTable = this.supportCoachList.filter(item => {
          return item.nickname.includes(val)
        })
      } else {
        this.supportCoachTable = cloneDeep(this.supportCoachList)
      }
    },
    getShops() {
      this.brandService.getCoursePersonalSupportCoaches({ course_id: this.course.course_id }).subscribe(state => {
        this.supportCoachList = cloneDeep(state.coaches)
        this.supportCoachTable = cloneDeep(state.coaches)
        this.coachLevelOptions = state.coaches.map(item => {
          return {
            id: item.coach_level_id,
            name: item.level_name
          }
        })
      })
    }
  },
  mounted() {
    this.getShops()
  }
}
</script>
