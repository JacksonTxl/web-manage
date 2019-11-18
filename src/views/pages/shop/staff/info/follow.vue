<template>
  <a-row>
    <a-col :lg="24">
      <a-col :lg="18">
        <a-range-picker
          @change="onChooseDate"
          :disabledDate="disabledDate"
          format="YYYY-MM-DD"
        />
      </a-col>
      <a-col :lg="6">
        <st-input-search
          placeholder="请输入用户姓名进行查询"
          @search="onSingleSearch('member_name', $event)"
        />
      </a-col>
    </a-col>
    <a-col :lg="24" class="mg-t16">
      <st-table
        :columns="followColumns"
        :dataSource="followList"
        :scroll="{ x: 1300 }"
        :loading="loading.getStaffFollow"
        @change="onTableChange"
        :page="page"
      >
        <template slot="member_name" slot-scope="text, record">
          <a href="javascript:;" class="mg-r8" @click="goMemberDetai(record)">
            {{ text }}
          </a>
        </template>
      </st-table>
    </a-col>
  </a-row>
</template>

<script>
import { FollowService } from './follow.service'
import { followColumns } from './columns.config'
import tableMixin from '@/mixins/table.mixin'

export default {
  mixins: [tableMixin],
  serviceInject() {
    return {
      followservice: FollowService
    }
  },
  rxState() {
    return {
      followList: this.followservice.followList$,
      loading: this.followservice.loading$,
      page: this.followservice.page$
    }
  },
  data() {
    return {
      id: ''
    }
  },
  computed: { followColumns },
  mounted() {
    this.id = this.$searchQuery.id
  },
  methods: {
    range(start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },

    disabledDate(current) {
      return (
        current && current.format('YYYY-MM-DD') > moment().format('YYYY-MM-DD')
      )
    },
    goMemberDetai(e) {
      console.log('跳转到用户详情', e)
      this.$router.push({
        name: 'shop-member-info-basic',
        query: {
          id: e.member_id
        }
      })
    },
    onChooseDate(e) {
      console.log('选择到的日期', e)
      this.$router.push({
        query: {
          id: this.id,
          follow_date_first: moment(e[0]).format('YYYY-MM-DD'),
          follow_date_last: moment(e[1]).format('YYYY-MM-DD')
        }
      })
    },
    searchCourse(e) {
      console.log('跟进查询', e)
      this.$router.push({
        query: {
          id: this.id,
          member_name: e
        }
      })
    }
  }
}
</script>

<style></style>
