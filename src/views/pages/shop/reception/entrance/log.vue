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
      <st-recent-radio-group @change="onChangeDate"></st-recent-radio-group>
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
    onChangeDate(val) {
      console.log('dsafas')
    }
  }
}
</script>
