<template>
  <div class="page-shop-sale-list-brand">
    <header>
      <div class="page-shop-sale-list-brand__opreation page-shop-sale-list__opreation">
        <st-button type="primary" @click="addPersonalCourse">+ 新增私教课程</st-button>
        <div>
          <a-select showSearch :filterOption="filterOption" optionFilterProp="children" class="mg-r8" defaultValue="" style="width: 160px" @change="handleChange">
            <a-select-option v-for="course in courses" :key="course.value" :value="course.value">{{course.label}}</a-select-option>
          </a-select>
          <a-select  defaultValue="" style="width: 160px" @change="handleChange">
            <a-select-option v-for="status in courseStatus" :key="status.value" :value="status.value">{{status.label}}</a-select-option>
          </a-select>
        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-brand__table mg-t8">
      <shop-sale-list-table :personalCourseList="personalCourseList"></shop-sale-list-table>
    </main>
  </div>
</template>

<script>
import ShopSaleListTable from './brand#/brand-table'
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
  subscriptions() {
    return {
      personalCourseList: this.brandService.personalCourseList$
    }
  },
  components: {
    ShopSaleListTable
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    addPersonalCourse() {
      console.log('d')
      this.$router.push({ name: 'brand-product-course-personal-add' })
    }
  }
}
</script>
