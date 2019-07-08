<template>
  <div class="pages-brand-staff-info-member-container">
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="18">
          <a-select
            style="width: 160px;margin-left:12px"
            class="mg-r8"
            :defaultValue="-1"
            placeholder="请选择门店"
          >
            <a-select-option :value="1">门店1</a-select-option>
            <a-select-option :value="3">门店2</a-select-option>
            <a-select-option :value="2">门店3</a-select-option>
            <a-select-option :value="-1">全部</a-select-option>
          </a-select>
        </a-col>
        <a-col :lg="6">
          <st-input-search placeholder="请输入会员名姓名、手机号进行查询" @search="onSingleSearch('id',$event)"/>
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="memberColums"
          :dataSource="memberInfo"
          :scroll="{ x: 1750}"
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
    }
  }
}
</script>
