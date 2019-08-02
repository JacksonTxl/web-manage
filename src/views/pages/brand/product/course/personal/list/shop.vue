<template>
  <div class="page-shop-sale-list-shop">
    <header>
      <div
        class="page-shop-sale-list-shop__opreation page-shop-sale-list__opreation"
      >
        <div></div>
        <div>
          <a-select
            class="mg-r8"
            :defaultValue="-1"
            style="width: 160px"
            v-model="query.shop_id"
            @change="onChange"
          >
            <a-select-option
              v-for="shop in shopsOptions"
              :key="shop.id"
              :value="shop.id"
            >
              {{ shop.shop_name }}
            </a-select-option>
          </a-select>
          <a-select
            class="mg-r8"
            :defaultValue="-1"
            v-model="query.category_id"
            style="width: 160px"
            @change="onChange"
          >
            <a-select-option
              v-for="category in categoryList"
              :key="category.id"
              :value="category.id"
            >
              {{ category.setting_name }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-shop__table mg-t8">
      <shop-sale-list-table @check="onCheckGetCourse"></shop-sale-list-table>
    </main>
  </div>
</template>

<script>
import ShopSaleListTable from './shop#/shop-table'
import { RouteService } from '../../../../../../../services/route.service'
import { ShopService } from './shop.service'
import { ListService } from '../list.service'
export default {
  name: 'PersonalCourseShop',
  serviceInject() {
    return {
      listService: ListService,
      shopService: ShopService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      shopsOptions: this.listService.shopSelectOptions$,
      categoryList: this.listService.categoryList$,
      query: this.routeService.query$,
      auth: this.shopService.auth$
    }
  },
  data() {
    return {
      selectedRowKeys: [],
      selectedRows: [],
      courseStatus: [
        { label: '所有状态', value: -1 },
        { label: '有效', value: 1 },
        { label: '无效', value: 0 }
      ]
    }
  },
  components: {
    ShopSaleListTable
  },
  methods: {
    onCheckGetCourse(selectedRows) {
      this.selectedRows = selectedRows
    },
    onChange() {
      this.$router.push({ query: { ...this.query, course_name: '' } })
    },
    addPersonalCourse() {
      this.$router.push({ name: 'brand-product-course-team-add' })
    }
  }
}
</script>
