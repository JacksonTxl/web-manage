<template>
  <div class="page-shop-sale-list-brand">
    <header>
      <div class="page-shop-sale-list-brand__opreation page-shop-sale-list__opreation">
        <st-button type="primary" @click="addPersonalCourse">+ 新增私教课程</st-button>
        <div>
          <a-select showSearch :defaultValue="defaultValue" v-model="query.category_id" :filterOption="filterOption" optionFilterProp="children" class="mg-r8" style="width: 160px" @change="onChange">
            <a-select-option v-for="category in categoryList" :key="category.id" :value="category.id">{{category.setting_name}}</a-select-option>
          </a-select>
        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-brand__table mg-t8">
      <brand-table  :loading="loading.getCoursePersonalBrandList" @set-available="onSetAvailable" @delete-course="onDeleteCourse" :personalCourseList="personalCourseList"></brand-table>
    </main>
  </div>
</template>

<script>
import BrandTable from './brand#/brand-table'
import { RouteService } from '../../../../../../../services/route.service'
import { ListService } from '../list.service'
import { BrandService } from './brand.service'
export default {
  name: 'PersonalCourseListInBrand',
  serviceInject() {
    return {
      listService: ListService,
      brandService: BrandService,
      routeService: RouteService
    }
  },
  data() {
    return {
      defaultValue: -1,
      courseStatus: [{ label: '所有状态', value: -1 }, { label: '有效', value: 1 }, { label: '无效', value: 0 }]
    }
  },
  rxState() {
    return {
      categoryList: this.listService.categoryList$,
      personalCourseList: this.brandService.personalCourseList$,
      loading: this.brandService.loading$,
      query: this.routeService.query$
    }
  },
  components: {
    BrandTable
  },
  methods: {
    onDeleteCourse(record) {
      this.brandService.deleteCourse(record.course_id).subscribe(() => {
        this.$router.push({ query: this.query, force: true })
      })
    },
    onSetAvailable(record) {
      const available = record.is_available.id === 1 ? 0 : 1
      this.brandService.setAvailable({ course_id: record.course_id, available }).subscribe(() => {
        this.$router.push({ query: this.query, force: true })
      })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    onChange() {
      this.$router.push({ query: { ...this.query, course_name: '' } })
    },
    addPersonalCourse() {
      this.$router.push({ name: 'brand-product-course-personal-add' })
    }
  }
}
</script>
