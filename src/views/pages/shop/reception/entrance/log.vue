<template>
  <div :class="log()">
    <portal to="SHOP_RECEPTION_ENTRANCE_KEYWORDS_SEARCH">
      <st-input-search
        v-model="$searchQuery.keyword"
        @search="onKeywordsSearch('keyword', $event)"
        placeholder="请输入姓名或手机号查找"
        maxlength="50"
      />
    </portal>
    <div :class="log('search')" class="mg-b16">
      <st-recent-radio-group
        :days="days"
        @change="onChangeDate"
      ></st-recent-radio-group>
      <div>
        <a-select
          style="width: 160px"
          v-model="$searchQuery.entry_type"
          @change="onSingleSearch('entry_type', $event)"
          :options="entryTypeList$"
        ></a-select>
      </div>
    </div>
    <st-table
      :scroll="{ x: 800 }"
      :page="page$"
      @change="onTableChange"
      :loading="loading$.getList"
      :columns="columns"
      :dataSource="list$"
      rowKey="id"
    />
  </div>
</template>

<script>
import { LogService } from './log.service'
import { columns } from './log.config.ts'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'ReceptionEntranceLog',
  mixins: [tableMixin],
  bem: {
    log: 'page-shop-reception-entrance'
  },
  data() {
    return {
      days: [1, 7, 15]
    }
  },
  serviceInject() {
    return {
      service: LogService
    }
  },
  rxState() {
    const { page$, list$, loading$, entryTypeList$ } = this.service
    return { page$, list$, loading$, entryTypeList$ }
  },
  computed: {
    columns
  },
  methods: {
    onChangeDate(event) {
      this.$searchQuery.days = event.recently_day || undefined
      this.$searchQuery.start_time = event.start_date || undefined
      this.$searchQuery.end_time = event.end_date || undefined
      this.onSearch()
    }
  }
}
</script>
