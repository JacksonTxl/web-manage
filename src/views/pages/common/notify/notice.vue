<template>
  <div :class="b()">
    <st-search-panel @search="onSearchNative" @reset="onSearchReset">
      <st-search-panel-item label="通知类型：">
        <st-search-radio
          v-model="$searchQuery.is_valid"
          :options="[{ label: '都是', value: 'aa' }]"
        />
      </st-search-panel-item>
      <st-search-panel-item label="二级分类：">
        <st-search-radio
          v-model="$searchQuery.is_valid"
          :options="[{ label: '都是', value: 'aa' }]"
        />
      </st-search-panel-item>
      <st-search-panel-item label="通知门店：">
        <a-select></a-select>
      </st-search-panel-item>
    </st-search-panel>

    <st-table
      class="pd-24"
      @change="onTableChange"
      rowKey="id"
      :columns="columns"
      :dataSource="list$"
      :loading="loading$.getList"
      :page="page$"
    ></st-table>
  </div>
</template>

<script>
import { columns } from './inform.config'
import { InformService } from './inform.service'
import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'NotifyNotice',
  mixins: [tableMixin],
  bem: {
    b: 'page-notify-Notice'
  },
  serviceInject() {
    return {
      service: InformService
    }
  },
  rxState() {
    const { list$, page$, loading$ } = this.service
    return { list$, page$, loading$ }
  },
  data() {
    return {
      date: null
    }
  },
  computed: {
    columns
  },
  methods: {
    onSearchNative() {
      console.log('onser')
    },
    onSearchReset() {
      console.log('cds')
    }
  }
}
</script>
