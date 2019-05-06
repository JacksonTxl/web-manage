<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="course_id"
      :loading="loading"
      :columns="columns"
      :dataSource="personalCourseList"
      :scroll="{ x: 1300}"
      @change="onChange">
      <div slot="shops" slot-scope="shops, record">
        <modal-link tag="a"
          v-if="record.shop_setting === 2"
        :to="{name: 'course-support-course-shops', props: {courseId: record.course_id}}"
        >共{{shops}}家门店</modal-link>
        <span
          v-else
        >{{record.shop_setting | enumFilter('personal_course.shop_setting')}}</span>
      </div>
      <div slot="coaches" slot-scope="coaches, record">
        <span v-if="!coaches">{{coaches}}</span>
        <modal-link tag="a"
        v-else
        :to="{name: 'course-support-course-cocahes-brand', props: {course: record}}"
        >{{coaches}}</modal-link>
      </div>
      <router-link class="mg-r8" :to="{name: 'brand-product-course-personal-info', query: {courseId: record.course_id}}"
      slot="course_name" slot-scope="course_name, record">
        {{course_name}}
      </router-link>

      <div slot="price_setting" slot-scope="price_setting">
        {{price_setting | enumFilter('personal_course.price_setting')}}
      </div>
      <div slot="sell_price" slot-scope="sell_price">
        <a

          href="javascript:;"
        >{{sell_price}}</a>
      </div>
      <div slot="is_available" slot-scope="is_available">
          <span><a-badge :status="is_available === 1?'success':'error'" />{{is_available | enumFilter('personal_course.is_available')}}</span>
      </div>
      <div slot="action" slot-scope="text, record">
        <router-link class="mg-r8" :to="{name: 'brand-product-course-personal-info', query: {courseId: record.course_id}}">详情</router-link>
        <router-link :to="{name: 'brand-product-course-personal-edit', query: {courseId: record.course_id}}">编辑</router-link>
        <st-more-dropdown style="margin-left: 12px;">

          <!-- <a-menu-item>
            <a-popconfirm  :title="record.is_available.id === 0?'确认将'+record.course_name+'进行恢复':'当前课程不再支持购买、排课，确认将'+record.course_name+'置为无效'" @confirm="onConfirmSetAvailable(record)" @cancel="cancel" okText="确定" cancelText="取消">
            {{record.is_available.id === 1 ? "置为无效":"恢复有效"}}
            </a-popconfirm>
          </a-menu-item> -->

          <a-menu-item>
            <a-popconfirm  :title="'一旦删除则无法恢复，确认删除'+record.course_name+'？'" @confirm="onConfirmDeleteCourse(record)" okText="确定" cancelText="取消">
              删除
            </a-popconfirm>
          </a-menu-item>
        </st-more-dropdown>
      </div>
    </st-table>
</div>

</template>

<script>
import { columns, mockTable } from './brand.config'
export default {
  name: 'ShopSaleListTable',
  data() {
    return {
      columns,
      selectedRowKeys: [],
      data: mockTable
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    personalCourseList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChange() {

    },
    onConfirmDeleteCourse(record) {
      this.$emit('delete-course', record)
    },
    onConfirmSetAvailable(record) {
      this.$emit('set-available', record)
    },
    cancel() {
    },
    onClickGetInfo() {

    }
  }
}
</script>

<style scoped>

</style>
