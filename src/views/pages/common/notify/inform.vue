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
      <st-search-panel-item label="通知门店：">
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
      :page="page$"
    >
      <template slot="notify_type" slot-scope="text, record">
        {{ record.notify_type.name }}
      </template>
      <template slot="sub_notify_type" slot-scope="text, record">
        {{ record.sub_notify_type.name }}
      </template>
      <template slot="content" slot-scope="text, record">
        <st-overflow-text maxWidth="250px" :value="record.content" />
      </template>
      <template slot="actions" slot-scope="text, record">
        <st-table-actions>
          <a @click="onClickDetail(record)">
            查看
          </a>
        </st-table-actions>
      </template>
    </st-table>
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
  watch: {
    // 当一级类型变化则二级分类重置
    '$searchQuery.notify_type'(oldValue, newValue) {
      if (oldValue !== newValue) {
        this.$searchQuery.sub_notify_type = -1
      }
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
    routerNameSet() {
      return {
        'shop-reception-entrance': [1, 2],
        'shop-reception-reserve': [3, 4, 5],
        'shop-finance-order-list': [6, 7, 8, 9],
        'shop-member-list-studio': [10, 11, 12, 13, 14, 15, 16]
      }
    },
    noticeTypeLevel1Options() {
      return this.informTypeOptions$.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
    },
    noticeTypeLevel2Options() {
      let options = []
      for (let item of this.informTypeOptions$) {
        if (item.id === this.$searchQuery.notify_type) {
          options = [
            { label: '全部', value: -1 },
            ...item.children.map(item => {
              return {
                label: item.name,
                value: item.id
              }
            })
          ]
        }
      }
      return options
    }
  },
  methods: {
    onClickDetail(record) {
      console.log(record)
      for (let key in this.routerNameSet) {
        console.log(key)
        console.log(
          this.routerNameSet[key].includes(record.sub_notify_type.key)
        )
        console.log('this.routerNameSet[key]', this.routerNameSet[key])
        if (this.routerNameSet[key].includes(record.sub_notify_type.key)) {
          this.$router.push({ name: key })
        }
      }
    }
  }
}
</script>
