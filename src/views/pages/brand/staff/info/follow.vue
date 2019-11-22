<template>
  <a-row>
    <shop-select
      style="width: 160px"
      class="mg-r8"
      :defaultValue="-1"
      v-model="$searchQuery.shop_id"
      @change="onSingleSearch('shop_id', $event)"
    />
    <a-range-picker
      @change="onChooseDate"
      :disabledDate="disabledDate"
      format="YYYY-MM-DD"
    />

    <st-input-search
      class="fl-r"
      placeholder="请输入用户姓名进行查询"
      @search="onSingleSearch('member_name', $event)"
    />

    <a-col :lg="24" class="mg-t16">
      <st-table
        :columns="followColumns"
        :dataSource="followList"
        :scroll="{ x: 1000 }"
        :loading="loading.getStaffFollow"
        @change="onTableChange"
        :page="page"
      >
        <template slot="member_name" slot-scope="text, record">
          <a href="javascript:;" class="mg-r8" @click="goMemberDetail(record)">
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
import ShopSelect from '@/views/biz-components/shop-select'
import tableMixin from '@/mixins/table.mixin'

export default {
  mixins: [tableMixin],
  serviceInject() {
    return {
      followService: FollowService
    }
  },
  rxState() {
    return {
      followList: this.followService.followList$,
      page: this.followService.page$,
      loading: this.followService.loading$
    }
  },
  components: {
    ShopSelect
  },
  data() {
    return {
      id: ''
    }
  },
  computed: {
    followColumns
  },
  mounted() {
    this.id = this.$searchQuery.id
    // this.pagination.total = this.followList.page.total_counts
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
    goMemberDetail(e) {
      console.log('跳转到用户详情', e)
      let member_id = e.member_id
      this.$router.push({
        name: 'brand-staff-info-basic',
        query: {
          id: e.member_id
        }
      })
    },
    onChooseDate(e) {
      this.$router.push({
        query: {
          id: this.id,
          follow_date_first: moment(e[0]).format('YYYY-MM-DD'),
          follow_date_last: moment(e[1]).format('YYYY-MM-DD')
        }
      })
    }
  }
}
</script>
