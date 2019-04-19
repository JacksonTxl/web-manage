<template>
  <div class="page-shop-sale-list-shop">
    <header>
      <div class="page-shop-sale-list-shop__opreation page-shop-sale-list__opreation">
        <st-button type="primary">转入品牌私教课程库</st-button>
        <div>
          <a-select defaultValue="" class="mg-r8" style="width: 160px" @change="handleChange">
            <a-select-option v-for="shop in shops" :key="shop.value" :value="shop.value">{{shop.label}}</a-select-option>
          </a-select>
          <a-select class="mg-r8" defaultValue="" style="width: 160px" @change="handleChange">
            <a-select-option v-for="course in courses" :key="course.value" :value="course.value">{{course.label}}</a-select-option>
          </a-select>
          <a-select  defaultValue="" style="width: 160px" @change="handleChange">
            <a-select-option v-for="status in courseStatus" :key="status.value" :value="status.value">{{status.label}}</a-select-option>
          </a-select>
        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-shop__table mg-t8">
      <shop-sale-list-table :personalCourseList="personalCourseList"></shop-sale-list-table>
    </main>
  </div>
</template>

<script>
import ShopSaleListTable from './shop#/shop-table'
import { ShopService } from './shop.service'
export default {
  name: 'ShopSaleListShop',
  serviceInject() {
    return {
      shopService: ShopService
    }
  },
  rxState() {
    return {
      personalCourseList: this.shopService.personalCourseList$
    }
  },
  data() {
    return {
      shops: [{ label: '所有门店', value: '' }, { label: '门店A名称', value: '1' }, { label: '门店B名称', value: '2' }, { label: '门店C名称', value: '3' }, { label: '门店D名称', value: '4' }],
      courses: [{ label: '所有课程类型', value: '' }, { label: '瑜伽', value: '1' }, { label: '单车', value: '2' }, { label: '杠铃', value: '3' }, { label: '蹦床', value: '4' }, { label: '舞蹈', value: '5' }, { label: '功能性课程', value: '6' }],
      courseStatus: [{ label: '所有状态', value: '' }, { label: '有效', value: '1' }, { label: '无效', value: '0' }]
    }
  },
  components: {
    ShopSaleListTable
  },
  methods: {
    addPersonalCourse() {
      this.$router.push({ name: 'brand-product-course-team-add' })
    }
  }
}
</script>

<style scoped>

</style>
