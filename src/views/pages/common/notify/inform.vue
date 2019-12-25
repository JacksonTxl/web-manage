<template>
  <div :class="b()">
    <st-search-panel @search="onSearchNative" @reset="onSearchReset">
      <st-search-panel-item label="储值卡状态：">
        <st-search-radio
          v-model="$searchQuery.notify_type"
          :options="noticeTypeLevel1Options"
        />
      </st-search-panel-item>
      <st-search-panel-item label="二级分类：">
        <st-search-radio
          v-model="$searchQuery.is_valid"
          :options="noticeTypeLevel2Options"
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
    const { list$, page$, loading$, noticeTypeOptions$ } = this.service
    return { list$, page$, loading$, noticeTypeOptions$ }
  },
  data() {
    return {
      date: null
    }
  },
  computed: {
    columns,
    noticeTypeLevel1Options() {
      return this.noticeTypeOptions$.map(item => {
        return {
          label: item.value,
          value: item.key
        }
      })
    },
    noticeTypeLevel2Options() {
      const options = []
      for (let item of this.noticeTypeOptions$) {
        if (item.value === this.$searchQuery.notify_type) {
          return [...item]
        }
      }
      return options
    }
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
