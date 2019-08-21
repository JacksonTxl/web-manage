<template>
  <div class="page-shop-sale-list-shop">
    <header>
      <div
        class="page-shop-sale-list-shop__opreation page-shop-sale-list__opreation"
      >
        <div>
          <!-- <st-button
            v-if="auth.transfer"
            type="primary"
            @click="onClickTransFromBrand"
          >转入品牌团体课程库</st-button> -->
        </div>
        <div>
          <a-select
            placeholder="请选择门店"
            :defaultValue="-1"
            class="mg-r8"
            style="width: 160px"
            v-model="query.shop_id"
            @change="onSingleSearch('shop_id', $event)"
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
            placeholder="课程类型"
            v-model="query.category_id"
            style="width: 160px"
            @change="onSingleSearch('category_id', $event)"
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
      <st-table
        class="mg-t16"
        rowKey="id"
        :columns="columns"
        :dataSource="list"
        :scroll="{ x: 1440 }"
        :loading="loading.getList"
        :alertSelection="{ onReset: onSelectionReset }"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectionChange
        }"
        :page="page"
        @change="onTableChange"
      >
        <a
          href="javascript:;"
          slot="course_name"
          slot-scope="text, record"
          @click="onClickCourseInfo(record.id)"
        >
          {{ text }}
        </a>
        <a-rate
          slot="strength_level"
          slot-scope="strength_level"
          :defaultValue="strength_level"
          disabled
        />
        <!-- 操作 -->
        <div slot="action" slot-scope="text, record">
          <st-table-actions>
            <a
              href="javascript:;"
              v-if="record.auth['brand_shop:product:team_course|get']"
              class="mg-r8"
              @click="onClickCourseInfo(record.id)"
            >
              详情
            </a>
          </st-table-actions>
        </div>
      </st-table>
    </main>
  </div>
</template>

<script>
import { ShopService } from './shop.service'
import { ListService } from '../list.service'
import { RouteService } from '@/services/route.service'
import CourseTransfromBrandTeamCourse from '@/views/biz-modals/course/transfrom-brand-team-course'
import { columns } from './shop.config'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'DDDTeamCourseList',
  mixins: [tableMixin],
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
      auth: this.shopService.auth$,
      list: this.shopService.list$,
      page: this.shopService.page$,
      loading: this.shopService.loading$
    }
  },
  modals: {
    CourseTransfromBrandTeamCourse
  },
  data() {
    return {
      columns,
      selectedRows: []
    }
  },
  methods: {
    onClickTransFromBrand() {
      this.$modalRouter.push({
        name: 'course-transfrom-brand-team-course',
        props: { courseList: this.selectedRows }
      })
    },
    onChange() {
      this.$router.push({ query: { ...this.query, course_name: '' } })
    },
    onClickCourseInfo(id) {
      this.$router.push({
        name: 'brand-product-course-team-info',
        query: {
          courseId: id
        }
      })
    }
  }
}
</script>
