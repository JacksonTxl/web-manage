<template>
  <div class="page-shop-sale-list-brand">
    <header>
      <div class="page-shop-sale-list-brand__opreation page-shop-sale-list__opreation">
        <st-button type="primary" @click="addPersonalCourse">+ 新增私教课程</st-button>
        <div>
          <a-select showSearch :filterOption="filterOption" optionFilterProp="children" class="mg-r8" defaultValue="" style="width: 160px" @change="handleChange">
            <a-select-option v-for="course in courses" :key="course.value" :value="course.value">{{course.label}}</a-select-option>
          </a-select>
          <a-select  defaultValue="" style="width: 160px" @change="onChange">
            <a-select-option v-for="status in courseStatus" :key="status.value" :value="status.value">{{status.label}}</a-select-option>
          </a-select>
        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-brand__table mg-t8">
      <brand-table @set-available="onSetAvailable" :personalCourseList="personalCourseList"></brand-table>
    </main>
  </div>
</template>

<script>
import BrandTable from './brand#/brand-table'
import { BrandService } from './brand.service'
export default {
  name: 'ShopSaleListShop',
  serviceInject() {
    return {
      brandService: BrandService
    }
  },
  data() {
    return {
      courses: [{ label: '所有课程类型', value: '' }, { label: '瑜伽', value: '1' }, { label: '单车', value: '2' }, { label: '杠铃', value: '3' }, { label: '蹦床', value: '4' }, { label: '舞蹈', value: '5' }, { label: '功能性课程', value: '6' }],
      courseStatus: [{ label: '所有状态', value: '' }, { label: '有效', value: '1' }, { label: '无效', value: '0' }]
    }
  },
  rxState() {
    return {
      personalCourseList: this.brandService.personalCourseList$
    }
  },
  components: {
    BrandTable
  },
  methods: {
    onSetAvailable(record) {
      console.log(record)
      const available = record.is_available === 1 ? 0 : 1
      this.brandService.setAvailableInBrand({ course_id: record.course_Id, available }).subscribe(() => {
        this.$router.push({ force: true })
      })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    onChange() {
    },
    addPersonalCourse() {
      console.log('d')
      this.$router.push({ name: 'brand-product-course-personal-add' })
    }
  }
}
</script>
