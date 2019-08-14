<template>
  <div class="page-shop-sale-list-brand">
    <header>
      <div
        class="page-shop-sale-list-brand__opreation page-shop-sale-list__opreation"
      >
        <st-button
          icon="add"
          type="primary"
          v-if="auth.add"
          @click="addPersonalCourse"
        >
          新增私教课程
        </st-button>
        <div>
          <a-select
            showSearch
            :defaultValue="defaultValue"
            v-model="query.category_id"
            :filterOption="filterOption"
            optionFilterProp="children"
            class="mg-r8"
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
    <main class="page-shop-sale-list-brand__table mg-t8">
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
        <div slot="shops" slot-scope="shops, record">
          <a
            v-if="record.shop_setting === SHOP_SETTING.SPECIFIED_STORE"
            v-modal-link="{
              name: 'course-support-course-shops',
              props: { courseId: record.course_id }
            }"
          >
            共{{ shops }}家门店
          </a>
          <span v-else>
            {{
              record.shop_setting | enumFilter('personal_course.shop_setting')
            }}
          </span>
        </div>
        <div slot="coaches" slot-scope="coaches, record">
          <span v-if="!coaches">{{ coaches }}</span>
          <a
            v-else
            v-modal-link="{
              name: 'course-support-course-cocahes-brand',
              props: { course: record }
            }"
          >
            {{ coaches }}
          </a>
        </div>
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

        <div slot="price_setting" slot-scope="price_setting">
          {{ price_setting | enumFilter('personal_course.price_setting') }}
        </div>
        <div slot="sell_price" slot-scope="sell_price">
          <span>{{ sell_price }}</span>
        </div>
        <div slot="is_available" slot-scope="is_available">
          <span>
            <a-badge
              :status="
                is_available === IS_AVAILABLE.VALID ? 'success' : 'error'
              "
            />
            {{ is_available | enumFilter('personal_course.is_available') }}
          </span>
        </div>
        <div slot="action" slot-scope="text, record">
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
            <router-link
              v-if="record.auth['brand_shop:product:personal_course|edit']"
              :to="{
                name: 'brand-product-course-personal-edit',
                query: { id: record.course_id }
              }"
            >
              编辑
            </router-link>
            <a href="javascript:;">
              <st-popconfirm
                :title="
                  '一旦删除则无法恢复，确认删除' + record.course_name + '？'
                "
                @confirm="onDeleteCourse(record)"
                okText="确定"
                cancelText="取消"
              >
                删除
              </st-popconfirm>
            </a>
          </st-table-actions>
        </div>
      </st-table>
    </main>
  </div>
</template>

<script>
import { RouteService } from '@/services/route.service'
import { ListService } from '../list.service'
import { BrandService } from './brand.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './brand.config'
import CourseSupportCourseCocahesBrand from '@/views/biz-modals/course/support-course-cocahes-brand'
import CourseSupportCourseShops from '@/views/biz-modals/course/support-course-shops'
import { SHOP_SETTING, IS_AVAILABLE } from '@/constants/course/personal'
export default {
  name: 'PersonalCourseListInBrand',
  mixins: [tableMixin],
  modals: {
    CourseSupportCourseCocahesBrand,
    CourseSupportCourseShops
  },
  serviceInject() {
    return {
      listService: ListService,
      brandService: BrandService,
      routeService: RouteService
    }
  },
  data() {
    return {
      SHOP_SETTING,
      IS_AVAILABLE,
      columns,
      defaultValue: -1
    }
  },
  rxState() {
    return {
      categoryList: this.listService.categoryList$,
      loading: this.brandService.loading$,
      list: this.brandService.list$,
      page: this.brandService.page$,
      query: this.routeService.query$,
      auth: this.brandService.auth$
    }
  },
  methods: {
    onDeleteCourse(record) {
      this.brandService.deleteCourse(record.course_id).subscribe(() => {
        this.$router.push({ query: this.query, force: true })
      })
    },
    onSetAvailable(record) {
      const available =
        record.is_available.id === IS_AVAILABLE.VALID
          ? IS_AVAILABLE.INVALID
          : IS_AVAILABLE.VALID
      this.brandService
        .setAvailable({ course_id: record.course_id, available })
        .subscribe(() => {
          this.$router.push({ query: this.query, force: true })
        })
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
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
