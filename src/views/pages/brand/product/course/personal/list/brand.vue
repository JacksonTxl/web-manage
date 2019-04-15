<template>
  <div class="page-shop-sale-list-brand">
    <header>
      <div class="page-shop-sale-list-brand__opreation page-shop-sale-list__opreation">
        <st-button type="primary" @click="addPersonalCourse">+ 新增私教课程</st-button>
        <div>
          <a-select></a-select>
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
  subscriptions() {
    return {
      personalCourseList: this.brandService.personalCourseList$
    }
  },
  components: {
    ShopSaleListTable
  },
  methods: {
    addPersonalCourse() {
      console.log('d')
      this.$router.push({ name: 'brand-product-course-personal-add' })
    }
  }
}
</script>
