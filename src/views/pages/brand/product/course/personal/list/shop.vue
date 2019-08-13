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
        rowKey="course_id"
        :columns="columns"
        :page="page"
        :dataSource="list"
        :scroll="{ x: 1440 }"
        :loading="loading.getList"
        @change="onTableChange"
      >
        <router-link
          class="mg-r8"
          :to="{
            name: 'brand-product-course-personal-info',
            query: { id: record.course_id }
          }"
          slot="course_name"
          slot-scope="course_name, record"
        >
          {{ course_name }}
        </router-link>
        <div slot="sell_price" slot-scope="sell_price, record">
          <a
            v-modal-link="{
              name: 'course-price-setting',
              props: { course: record }
            }"
            v-if="sell_price.is_click > 0"
          >
            {{ sell_price.course_price }}
          </a>
          <span v-else>{{ sell_price.course_price }}</span>
        </div>
        <div slot="coaches" slot-scope="coaches, record">
          <a
            v-modal-link="{
              name: 'course-support-course-cocahes-brand',
              props: { course: record }
            }"
          >
            {{ coaches }}
          </a>
        </div>
        <div slot="action" slot-scope="action, record">
          <st-table-actions>
            <router-link
              class="mg-r8"
              v-if="record.auth['brand_shop:product:personal_course|get']"
              :to="{
                name: 'brand-product-course-personal-info',
                query: { id: record.course_id }
              }"
            >
              详情
            </router-link>
          </st-table-actions>
        </div>
      </st-table>
    </main>
  </div>
</template>

<script>
import { RouteService } from '@/services/route.service'
import { ShopService } from './shop.service'
import { ListService } from '../list.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './shop.config'
import CoursePriceSetting from '@/views/biz-modals/course/price-setting'
import CourseSupportCourseCocahesBrand from '@/views/biz-modals/course/support-course-cocahes-brand'
import CourseTransfromBrandCourse from '@/views/biz-modals/course/transfrom-brand-course'
export default {
  name: 'PersonalCourseShop',
  mixins: [tableMixin],
  modals: {
    CoursePriceSetting,
    CourseSupportCourseCocahesBrand,
    CourseTransfromBrandCourse
  },
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
  data() {
    return {
      columns
    }
  }
}
</script>
