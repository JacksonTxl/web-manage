<template>
  <div :class="b()">
    <st-search-panel @search="onSearchNative" @reset="onSearchReset">
      <st-search-panel-item label="储值卡状态：">
        <st-search-radio
          v-model="$searchQuery.is_valid"
          :options="[{ lable: '都是', value: 'aa' }]"
        />
      </st-search-panel-item>
      <st-search-panel-item label="购买时间：">
        <st-range-picker :disabledDays="180" v-model="date" />
      </st-search-panel-item>
    </st-search-panel>

    <st-table
      class="pd-24"
      @change="onTableChange"
      rowKey="id"
      :columns="columns"
      :dataSource="list$"
      :loading="loading$.getInformList"
      :page="list"
    ></st-table>
  </div>
</template>

<script>
import { columns } from './inform.config'
import { InformService } from './inform.service'

export default {
  name: 'NotifyInform',
  bem() {
    b: 'page-notify-inform'
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
