<template>
  <st-panel
    app>
    <div slot="actions">
      <a-input-search placeholder="团课名称" v-model="query.courseName" @search="onSearchCourseName"></a-input-search>
    </div>
    <a-row>
      <a-col :span="6">
        <st-button>新增门店团体课程</st-button>
      </a-col>
      <a-col :span="18">
        <a-select></a-select>
        <a-select></a-select>
      </a-col>
    </a-row>
    <shop-table></shop-table>
  </st-panel>
</template>
<script>
import { RouteService } from '../../../../../../../services/route.service'
import ShopTable from './list#/shop-table'
export default {
  name: 'TeamCourseList',
  serviceInject() {
    return {
      routeService: RouteService
    }
  },
  components: {
    ShopTable
  },
  rxState() {
    return {
      query: this.routeService.query$
    }
  },
  methods: {
    onSearchCourseName(val) {
      this.$router.push({ query: this.query })
    }
  }
}
</script>
