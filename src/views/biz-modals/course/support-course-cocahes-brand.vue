<template>
  <st-modal
    class="modal-support-course-shops"
    :title="course.course_name + ' 查看授课教练'"
    :footer="null"
    v-model="show"
  >
    <div class="modal-support-course-shops__search">
      <a-row>
        <a-col :lg="6">
          <a-select
            showSearch
            v-model="coachLevel"
            class="mg-r8"
            style="width: 160px"
            @change="onChange"
          >
            <a-select-option
              v-for="coach in coachLevelOptions"
              :key="coach.id"
              :value="coach.id"
            >
              {{ coach.name }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :lg="10"></a-col>
        <a-col :lg="8">
          <st-input-search
            @search="onSearchKeyWords"
            placeholder="通过教练昵称查询"
          ></st-input-search>
        </a-col>
      </a-row>
    </div>
    <st-container class="mg-t16">
      <st-table
        :columns="columnsCoaches"
        :rowKey="record => record.id"
        :page="false"
        :dataSource="supportCoachTable"
      >
        <div slot="nature_work" slot-scope="text">
          {{ text | enumFilter('staff.nature_work') }}
        </div>
      </st-table>
    </st-container>
  </st-modal>
</template>
<script>
import { columnsCoaches } from './support-table.config'
import { BrandService } from '../../pages/brand/product/course/personal/list/brand.service'
import { cloneDeep, uniqBy } from 'lodash-es'
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
      coachLevel: -1,
      show: false,
      courseStatus: [
        { label: '所有状态', value: -1 },
        { label: '有效', value: 1 },
        { label: '无效', value: 0 }
      ],
      coachLevelOptions: [{ id: -1, name: '所有教练等级' }],
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
      if (val !== -1) {
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
      this.brandService
        .getCoursePersonalSupportCoaches({ course_id: this.course.course_id })
        .subscribe(state => {
          this.supportCoachList = cloneDeep(state.coaches)
          this.supportCoachTable = cloneDeep(state.coaches)
          this.coachLevelOptions = [
            ...this.coachLevelOptions,
            ...uniqBy(
              state.coaches.map(item => {
                return {
                  id: item.coach_level_id,
                  name: item.level_name
                }
              }),
              'id'
            )
          ]
        })
    }
  },
  mounted() {
    this.getShops()
  }
}
</script>
