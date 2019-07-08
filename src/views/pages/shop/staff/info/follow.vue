<template>
  <div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="18">
          <a-range-picker @change="onChooseDate" format="YYYY-MM-DD"/>
        </a-col>
        <a-col :lg="6">
          <st-input-search placeholder="请输入用户姓名进行查询" @search="onSingleSearch('member_name', $event)"/>
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="followColumns"
          :dataSource="followList"
          :scroll="{ x: 1750}"
          :loading="loading.getStaffFollow"
          @change="onTableChange"
          :page="page"
        >
          <template slot="member_name" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="goMemberDetai(record)">{{ text }}</a>
          </template>
        </st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { FollowService } from './follow.service'
import { followColumns } from './columns.config'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'

export default {
  mixins: [ tableMixin ],
  serviceInject() {
    return {
      followservice: FollowService,
      routerService: RouteService
    }
  },
  rxState() {
    return {
      followList: this.followservice.followList$,
      loading: this.followservice.loading$,
      page: this.followservice.page$,
      query: this.routerService.query$
    }
  },
  data() {
    return {
      id: ''
    }
  },
  computed: { followColumns },
  mounted() {
    this.id = this.$route.meta.query.id
  },
  methods: {
    goMemberDetai(e) {
      console.log('跳转到用户详情', e)
    },
    onChooseDate(e) {
      console.log('选择到的日期', e)
      this.$router.push({
        query: {
          id: this.id,
          follow_date_first: moment(e[0]).format('YYYY-MM-DD'),
          follow_date_last: moment(e[1]).format('YYYY-MM-DD')
        },
        force: true
      })
    },
    searchCourse(e) {
      console.log('跟进查询', e)
      this.$router.push({
        query: {
          id: this.id,
          member_name: e
        },
        force: true
      })
    }
  }
}
</script>

<style>
</style>
