<template>
  <div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="16">
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
          <a-range-picker @change="onChooseDate" format="YYYY-MM-DD"/>
        </a-col>
        <a-col :lg="2"></a-col>
        <a-col :lg="6">
          <st-input-search placeholder="请输入用户姓名进行查询" @search="searchCourse"/>
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="followColumns"
          :dataSource="followList.list"
          :scroll="{ x: 1750}"
          @change="pageChange"
          :pagination="pagination"
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
import { followColumns } from './columns'
export default {
  serviceInject() {
    return {
      followservice: FollowService
    }
  },
  rxState() {
    return {
      followList: this.followservice.followList$
    }
  },
  data() {
    return {
      followColumns,
      pagination: {
        pageSize: 20,
        current: 1
      },
      list: [],
      id: ''
    }
  },
  mounted() {
    this.id = this.$route.meta.query.id
    this.pagination.total = this.followList.page.total_counts
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
    },
    pageChange(pagination) {
      console.log('pagechange', pagination)
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

<style>
</style>
