<template>
  <div :class="b()">
    <st-search-panel @search="onSearch" @reset="onSearchReset">
      <st-search-panel-item label="通知类型：">
        <st-search-radio
          v-model="$searchQuery.notify_type"
          :options="noticeTypeLevel1Options"
        />
      </st-search-panel-item>
      <st-search-panel-item label="二级分类：">
        <st-search-radio
          v-model="$searchQuery.sub_notify_type"
          :options="noticeTypeLevel2Options"
        />
      </st-search-panel-item>
      <st-search-panel-item label="通知名单：">
        <shop-select
          class="mg-r8"
          style="width: 160px"
          :defaultValue="-1"
          v-model="$searchQuery.shop_id"
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
    const { list$, page$, loading$, informTypeOptions$ } = this.service
    return { list$, page$, loading$, informTypeOptions$ }
  },
  data() {
    return {
      date: null
    }
  },
  computed: {
    columns,
    noticeTypeLevel1Options() {
      return this.informTypeOptions$.map(item => {
        return {
          label: item.value,
          value: item.key
        }
      })
    },
    noticeTypeLevel2Options() {
      let options = []
      for (let item of this.informTypeOptions$) {
        if (item.key === this.$searchQuery.notify_type) {
          options = [
            { label: '全部', value: -1 },
            ...item.sub_type.map(item => {
              return {
                label: item.value,
                value: item.key
              }
            })
          ]
        }
      }
      return options
    }
  }
}
</script>
