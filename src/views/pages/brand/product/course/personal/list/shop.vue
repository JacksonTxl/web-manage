<template>
  <div class="page-shop-sale-list-shop">
    <header>
      <div class="page-shop-sale-list-shop__opreation page-shop-sale-list__opreation">
        <div>
          <!-- TODO: 批量转入品牌库的按钮 -->
          <modal-link
            v-if="this.selectedRowKeys.length >= 1 && auth.transfer"
            type="primary"
            tag="st-button"
            :to="{name: 'course-transfrom-brand-course', props:{courseIds: selectedRowKeys}}"
          >转入品牌私教课程库</modal-link>
        </div>
        <div>
          <a-select class="mg-r8" style="width: 160px" v-model="query.shop_id" @change="onChange">
            <a-select-option v-for="shop in shopsOptions" :key="shop.shop_id" :value="shop.shop_id">{{shop.shop_name}}</a-select-option>
          </a-select>
          <a-select class="mg-r8" v-model="query.category_id" style="width: 160px" @change="onChange">
            <a-select-option v-for="category in categoryList" :key="category.id" :value="category.id">{{category.setting_name}}</a-select-option>
          </a-select>
        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-shop__table mg-t8">
      <shop-sale-list-table @change="onChangeSelectedRowKeys" :personalCourseList="personalCourseList"></shop-sale-list-table>
    </main>
  </div>
</template>

<script>
import ShopSaleListTable from './shop#/shop-table'
import { RouteService } from '../../../../../../../services/route.service'
import { ShopService } from './shop.service'
import { ListService } from '../list.service'
export default {
  name: 'ShopSaleListShop',
  serviceInject() {
    return {
      listService: ListService,
      shopService: ShopService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      personalCourseList: this.shopService.personalCourseList$,
      shopsOptions: this.listService.shopSelectOptions$,
      categoryList: this.listService.categoryList$,
      query: this.routeService.query$,
      auth: this.shopService.auth$
    }
  },
  data() {
    return {
      selectedRowKeys: [],
      courseStatus: [{ label: '所有状态', value: -1 }, { label: '有效', value: 1 }, { label: '无效', value: 0 }]
    }
  },
  components: {
    ShopSaleListTable
  },
  methods: {
    onChangeSelectedRowKeys(selectedRowKeys) {
      console.log(selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
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
