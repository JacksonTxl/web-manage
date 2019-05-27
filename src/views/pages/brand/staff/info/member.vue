<template>
  <div>
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
        ></st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { memberColums } from './columns'
import { MemberService } from './member.service'
export default {
  serviceInject() {
    return {
      service: MemberService
    }
  },
  rxState() {
    return {
      memberInfo: this.service.memberInfo$
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
  mounted() {
    console.log(this.memberInfo)
    this.id = this.$route.meta.query.id
    this.pagination.total = this.memberInfo.page.total_counts
  },
  methods: {
    searchCourse(e) {
      this.$router.push({
        query: {
          id: this.id,
          keyword: e
        },
        force: true
      })
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
