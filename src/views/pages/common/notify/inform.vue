<template>
  <div :class="b()">
    <st-search-panel @search="onSearchNative" @reset="onSearchReset">
      <st-search-panel-item label="储值卡状态：">
        <st-search-radio
          v-model="$searchQuery.is_valid"
          :options="[{ lable: '都是', value: 'aa' }]"
        />
      </st-search-panel-item>
      <st-search-panel-item label="二级分类：">
        <st-search-radio
          v-model="$searchQuery.is_valid"
          :options="[{ lable: '都是', value: 'aa' }]"
        />
      </st-search-panel-item>
      <st-search-panel-item label="通知名单：">
        <shop-select
          class="mg-r8"
          style="width: 160px"
          :defaultValue="-1"
          v-model="$searchQuery.shop_id"
          @change="onSingleSearch('shop_id', $event)"
        ></shop-select>
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
import ShopSelect from '@/views/biz-components/shop-select'
import { columns } from './inform.config'
import { InformService } from './inform.service'
import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'NotifyInform',
  mixins: [tableMixin],
  bem: {
    b: 'page-notify-inform'
  },
  serviceInject() {
    return {
      service: InformService
    }
  },
  components: {
    ShopSelect
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
