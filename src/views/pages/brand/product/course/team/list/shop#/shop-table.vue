<template>
<st-table
  class="mg-t16"
  rowKey="id"
  :columns="columns"
  :dataSource="list"
  :scroll="{ x: 1440}"
  :loading="loading.getList"
  :alertSelection="{onReset: onSelectionReset}"
  :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectionChange}"
  :page="page"
  @change="onTableChange"
>
<a href="javascript:;" slot="course_name" slot-scope="text,record"  @click="onClickCourseInfo(record.id)">{{text}}</a>
<a-rate slot="strength_level" slot-scope="strength_level" :defaultValue="strength_level" disabled />
<!-- 操作 -->
<div slot="action" slot-scope="text,record">
  <st-table-actions>
    <a href="javascript:;" v-if="record.auth['brand_shop:product:team_course|get']" class="mg-r8" @click="onClickCourseInfo(record.id)">详情</a>
  </st-table-actions>
</div>

</st-table>

</template>

<script>
import { columns } from './shop.config'
import { ShopService } from '../shop.service'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'TeamTableShop',
  mixins: [tableMixin],
  serviceInject() {
    return {
      service: ShopService
    }
  },
  rxState() {
    return {
      list: this.service.list$,
      page: this.service.page$,
      loading: this.service.loading$
    }
  },
  data() {
    return {
      columns
    }
  },
  methods: {
    onClickCourseInfo(id) {
      this.$router.push({
        name: 'brand-product-course-team-info',
        query: {
          courseId: id
        }
      })
    },
    onClickEditCourseInfo(id) {
      this.$router.push({
        name: 'brand-product-course-team-edit',
        query: {
          id
        }
      })
    },
    onConfirmDeleteCourse(record) {
      this.$emit('delete-course', record)
    }
  }
}
</script>

<style scoped>

</style>
