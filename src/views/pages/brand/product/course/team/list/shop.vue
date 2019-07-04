<template>
  <div class="page-shop-sale-list-shop">
    <header>
      <div class="page-shop-sale-list-shop__opreation page-shop-sale-list__opreation">
        <div>
          <modal-link
            v-if="this.selectedRowKeys.length >= 1 && auth.transfer"
            type="primary"
            tag="st-button"
            :to="{name: 'course-transfrom-brand-course', props:{courseIds: selectedRowKeys}}"
          >转入品牌团体课程库</modal-link>
        </div>
        <div>
          <a-select placeholder="请选择门店" class="mg-r8" style="width: 160px" v-model="query.shop_id" @change="onChange">
            <a-select-option v-for="shop in shopsOptions" :key="shop.id" :value="shop.id">{{shop.shop_name}}</a-select-option>
          </a-select>
          <a-select class="mg-r8"  placeholder="课程类型" v-model="query.category_id" style="width: 160px" @change="onChange">
            <a-select-option v-for="category in categoryList" :key="category.id" :value="category.id">{{category.setting_name}}</a-select-option>
          </a-select>
        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-shop__table mg-t8">
      <team-table-shop :page="page" @delete-course="onDeleteCourse" @change="onChangeSelectedRowKeys" :teamCourseList="teamCourseList"></team-table-shop>
    </main>
  </div>
</template>

<script>
import TeamTableShop from './shop#/shop-table'
import { ShopService } from './shop.service'
import { ListService } from '../list.service'
import { RouteService } from '@/services/route.service'

export default {
  name: 'DDDTeamCourseList',
  serviceInject() {
    return {
      listService: ListService,
      shopService: ShopService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      teamCourseList: this.shopService.teamCourseList$,
      shopsOptions: this.listService.shopSelectOptions$,
      categoryList: this.listService.categoryList$,
      query: this.routeService.query$,
      page: this.shopService.page$,
      auth: this.shopService.auth$
    }
  },
  data() {
    return {
      disable: true,
      selectedRowKeys: [],
      defaultShops: -1,
      toRoute: {},
      courseStatus: [{ label: '所有状态', value: -1 }, { label: '有效', value: '1' }, { label: '无效', value: '0' }]
    }
  },
  created() {
    console.log(this.listService)
  },
  components: {
    TeamTableShop
  },
  methods: {
    onChangeSelectedRowKeys(selectedRowKeys) {
      console.log(selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onDeleteCourse(record) {
      this.shopService.deleteCourse(record.id).subscribe(() => {
        this.$router.push({ force: true })
      })
    },
    onChange() {
      this.$router.push({ query: { ...this.query, course_name: '' } })
    }
  }
}
</script>

<style scoped>

</style>
