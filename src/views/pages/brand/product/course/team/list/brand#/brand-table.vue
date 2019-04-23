<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="id"
      :columns="columns"
      :dataSource="teamCourseList"
      :scroll="{ x: 1300}"
      @change="onChange"
    >
    <a href="javascript:;" slot="course_name" slot-scope="text,record"  @click="onClickCourseInfo(record)">{{text}}</a>
    <div slot="is_available" slot-scope="is_available">
        <span><a-badge :status="is_available.id === 1?'success':'error'" />{{is_available.name}}</span>
    </div>
    <a-rate slot="strength_level" slot-scope="strength_level" :defaultValue="strength_level" disabled />
    <div slot="action" slot-scope="text,record">
      <a href="javascript:;" class="mg-r8" @click="onClickCourseInfo(record)">详情</a>
      <a href="javascript:;" @click="onClickEditCourseInfo(record)">编辑</a>
      <st-more-dropdown style="margin-left: 12px;">
        <a-menu-item v-if="record.is_available.id">置为无效</a-menu-item>
        <a-menu-item v-if="!record.is_available.id">恢复有效</a-menu-item>
        <a-menu-item>删除</a-menu-item>
      </st-more-dropdown>
    </div>
    </st-table>

</div>

</template>

<script>
import { columns } from './brand.config'
export default {
  name: 'TeamTableBrand',
  serviceInject() {
    return {
      brandService: BrandService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      teamCourseList: this.brandService.teamCourseList$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      columns,
      selectedRowKeys: []
    }
  },
  props: {
    teamCourseList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onClickCourseInfo(val) {
      console.log(val)
      this.$router.push({ name: 'brand-product-course-team-info', query: { course_id: val.course_id } })
    },
    onClickEditCourseInfo(val) {
      console.log(val)
    },
    onChange() {

    }
  }
}
</script>

<style scoped>

</style>
