<template>
  <div class="pages-brand-staff-info-member-container">
    <a-row class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="6">
          <st-input-search placeholder="请输入姓名、手机号进行查询" @search="onSingleSearch('keyword',$event)"/>
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="memberColums"
          :dataSource="memberInfo"
          :scroll="{ x: 1300}"
          :rowSelection="{selectedRowKeys,onChange:onSelectionChange}"
          :loading="loading.getStaffServiceCourses"
          :page="page"
          @change="onTableChange"
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
import { memberColums } from './columns.config'
import { MemberService } from './member.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'

export default {
  mixins: [ tableMixin ],
  serviceInject() {
    return {
      service: MemberService,
      routerService: RouteService
    }
  },
  rxState() {
    return {
      memberInfo: this.service.memberInfo$,
      loading: this.service.loading$,
      page: this.service.page$,
      query: this.routerService.query$
    }
  },
  data() {
    return {
      id: ''
    }
  },
  computed: { memberColums },
  mounted() {
    this.id = this.$route.meta.query.id
  },
  methods: {
    goCourseDetai(e) {
      console.log('跳转到课程详情', e)
      let course_type = e.course_type
      let course_id = e.course_id

      this.$router.push({
        name: 'shop-product-course-manage-personal-info',
        query: {
          id: course_id
        }
      })
    },
    goMemberDetai(e) {
      console.log('跳转到用户详情', e)
      let member_id = e.member_id
      this.$router.push({
        name: 'shop-member-info-basic',
        query: {
          id: e.member_id
        }
      })
    },
    searchCourse(e) {
      this.$router.push({
        query: {
          id: this.id,
          keyword: e
        },
        force: true
      })
    }
  }
}
</script>
