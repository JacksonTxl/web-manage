<template>
  <div class="pages-brand-staff-info-member-container">
    <a-row :gutter="24">
      <a-col :lg="24">
        <a-col :lg="18">

          <shop-select style="width: 160px" v-model="query.shop_id" @change="onChange"></shop-select>

        </a-col>
        <a-col :lg="6">
          <st-input-search placeholder="请输入会员名姓名、手机号进行查询" @search="searchCourse"/>
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="memberColums"
          :dataSource="memberInfo.list"
          :scroll="{ x: 1750}"
          @change="pageChange"
          :pagination="pagination"
        >
        <template slot="course_name" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="goCourseDetai(record)">{{ text }}</a>
          </template>
          <template slot="member_name" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="goMemberDetai(record)">{{ text }}</a>
          </template>
          <template slot="course_status" slot-scope="text,record">
            <span v-if="record.course_status ==='有效'" class="effective"></span>
            <span v-if="record.course_status ==='失效'" class="invalid"></span>
            <span v-if="record.course_status === '已冻结'" class="frozen"></span>
            {{ text }}
          </template>
        </st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { memberColums } from './columns'
import { MemberService } from './member.service'
import { RouteService } from '../../../../../services/route.service'
import ShopSelect from '@/views/biz-components/shop-select'
export default {
  serviceInject() {
    return {
      service: MemberService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      memberInfo: this.service.memberInfo$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      memberColums,
      pagination: {
        pageSize: 20,
        current: 1
      },
      id: ''
    }
  },
  components: {
    ShopSelect
  },
  mounted() {
    console.log(this.memberInfo)
    this.id = this.$route.meta.query.id
    this.pagination.total = this.memberInfo.page.total_counts
  },
  methods: {
    goCourseDetai(e) {
      console.log('跳转到课程详情', e)
    },
    goMemberDetai(e) {
      console.log('跳转到用户详情', e)
    },
    searchCourse(e) {
      this.$router.push({
        query: {
          id: this.id,
          keyword: e
        },
        force: true
      })
    },
    onChange() {
      this.$router.push({ query: this.query })
    },
    pageChange(pagination) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.$router.push({
        query: {
          id: this.id,
          page: pagination.current,
          size: pagination.pageSize
        },
        force: true
      })
    }

  }
}
</script>
