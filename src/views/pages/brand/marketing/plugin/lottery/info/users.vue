<template>
  <st-panel app>
    <div class="mg-b24">
      <a-select
        placeholder="中奖状态"
        v-model="$searchQuery.prize_status"
        class="mg-r8 fix-width"
        @change="onSingleSearch('prize_status', $event)"
      >
        <a-select-option
          v-for="(item, index) of prizeStatus"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
      <a-select
        placeholder="奖品类型"
        v-model="$searchQuery.prize_type"
        class="mg-r8 fix-width"
        @change="onSingleSearch('prize_type', $event)"
      >
        <a-select-option
          v-for="(item, index) of prizeType"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
      <a-select
        placeholder="奖品状态"
        v-model="$searchQuery.present_status"
        class="mg-r24 fix-width"
        @change="onSingleSearch('present_status', $event)"
      >
        <a-select-option
          v-for="(item, index) of presentStatus"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
      <span class="mg-r8">抽奖时间</span>
      <a-range-picker
        @change="onChangeDatePicker"
        v-model="queryParams.date"
        class="mg-r24"
      />
      <st-input-search
        style="display:inline-block;float:right"
        v-model="$searchQuery.keyword"
        @search="onSearch"
        placeholder="可输入姓名、手机号、奖品名称"
      ></st-input-search>
    </div>

    <st-table
      :page="page"
      @change="onTableChange"
      :loading="loading.getUserList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    ></st-table>
  </st-panel>
</template>
<script>
import { UsersService } from './users.service'
import { columns } from './users.config.ts'
import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'PluginLotteryInfoUser',
  mixins: [tableMixin],
  data() {
    return {
      queryParams: {
        date: []
      }
    }
  },
  serviceInject() {
    return {
      userService: UsersService
    }
  },
  rxState() {
    return {
      list: this.userService.list$,
      page: this.userService.page$,
      loading: this.userService.loading$,
      prizeStatus: this.userService.prizeStatus$,
      prizeType: this.userService.prizeType$,
      presentStatus: this.userService.presentStatus$
    }
  },
  computed: {
    columns
  },
  created() {},
  methods: {
    onChangeDatePicker(event) {
      this.queryParams.date = event
      this.onSearch()
    },
    onSearch() {
      let params = {
        start_time: this.queryParams.date[0]
          ? moment(this.queryParams.date[0]).format('YYYY-MM-DD')
          : '',
        end_time: this.queryParams.date[1]
          ? moment(this.queryParams.date[1]).format('YYYY-MM-DD')
          : ''
      }
      this.$router.push({ query: { ...this.$searchQuery, ...params } })
    }
  }
}
</script>
