<template>
  <div>
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
          v-if="record.shop_setting === 2"
          v-modal-link="{
            name: 'course-support-course-shops',
            props: { courseId: record.course_id }
          }"
        >
          共{{ shops }}家门店
        </a>
        <span v-else>
          {{ record.shop_setting | enumFilter('personal_course.shop_setting') }}
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
          <a-badge :status="is_available === 1 ? 'success' : 'error'" />
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
            <a-popconfirm
              :title="
                '一旦删除则无法恢复，确认删除' + record.course_name + '？'
              "
              @confirm="onConfirmDeleteCourse(record)"
              okText="确定"
              cancelText="取消"
            >
              删除
            </a-popconfirm>
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { columns } from './brand.config'
import { BrandService } from '../brand.service'
import { RouteService } from '@/services/route.service'
import CourseSupportCourseCocahesBrand from '@/views/biz-modals/course/support-course-cocahes-brand'
import CourseSupportCourseShops from '@/views/biz-modals/course/support-course-shops'
export default {
  name: 'ShopSaleListTable',
  mixins: [tableMixin],
  data() {
    return {
      columns
    }
  },
  modals: {
    CourseSupportCourseCocahesBrand,
    CourseSupportCourseShops
  },
  serviceInject() {
    return {
      service: BrandService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      list: this.service.list$,
      page: this.service.page$,
      loading: this.service.loading$,
      query: this.routeService.query$
    }
  },
  methods: {
    onChange() {},
    onConfirmDeleteCourse(record) {
      this.$emit('delete-course', record)
    },
    onConfirmSetAvailable(record) {
      this.$emit('set-available', record)
    },
    cancel() {},
    onClickGetInfo() {}
  }
}
</script>
