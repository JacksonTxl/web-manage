<template>
  <div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="16">
          <shop-select style="width: 160px" class="mg-r8" v-model="query.shop_id" @change="onChange"/>

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
          :dataSource="followList"
          :scroll="{ x: 1750}"
          @change="pageChange"
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
import ShopSelect from '@/views/biz-components/shop-select'
import { RouteService } from '@/services/route.service'

export default {
  serviceInject() {
    return {
      followService: FollowService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      followList: this.followService.followList$,
      page: this.followService.page$,
      query: this.routeService.query$
    }
  },
  components: {
    ShopSelect
  },
  data() {
    return {
      list: [],
      id: ''
    }
  },
  computed: {
    followColumns
  },
  mounted() {
    this.id = this.$route.meta.query.id
    // this.pagination.total = this.followList.page.total_counts
  },
  methods: {
    onChange() {
      this.$router.push({ query: this.query })
    },
    goMemberDetail(e) {
      console.log('跳转到用户详情', e)
    },
    onChooseDate(e) {
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
      this.$router.push({
        query: {
          id: this.id,
          member_name: e
        },
        force: true
      })
    },
    pageChange(page) {
      this.$router.push({
        query: {
          id: this.id,
          page: page.current_page,
          size: page.size
        },
        force: true
      })
    }
  }
}
</script>

<style>
</style>
