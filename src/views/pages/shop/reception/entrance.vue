<template>
  <st-panel app :class="entrance()">
    <div :class="entrance('search')" class="mg-b16">
      <st-button type="primary" :disabled="!selectedRowKeys.length || auth.batchCheckout" @click="onLeaveBatch">批量离场</st-button>
      <div>
        <a-input-search
        style="width: 200px"
        class="mg-r8"
        v-model="query.keyword"
        @search="onSelect('keyword',$event)"
        placeholder="请输入姓名或手机号查找" />
        <a-select
        style="width: 160px"
        v-model="query.entry_type"
        @change="onSelect('entry_type',$event)"
        >
          <a-select-option v-for="item in entryTypeList" :key="item.value">{{item.label}}</a-select-option>
        </a-select>
      </div>
    </div>
    <st-table
      :alertSelection="{onReset: onClear}"
      :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
      @change="onPageChange"
      :columns="columns"
      :dataSource="list"
      :pagination="{current:query.page,total:page.total_counts,pageSize:query.size}"
      rowKey="id"
      >
        <!-- 姓名 -->
        <template slot="member_name" slot-scope="text">
          {{text}}
        </template>
        <!-- 手机号 -->
        <template slot="mobile" slot-scope="text">
          {{text}}
        </template>
        <!-- 入场类型 -->
        <template slot="entry_type" slot-scope="text">
          {{text}}
        </template>
        <!-- 入场时间 -->
        <template slot="entry_time" slot-scope="text,record">
          {{record.entry_time}}&nbsp;~&nbsp;{{record.leave_time}}
        </template>
        <!-- 操作 -->
        <div slot="action" slot-scope="text,record">
          <a @click="onLeave(record)" v-if="auth.checkout">离场</a>
        </div>
    </st-table>
  </st-panel>
</template>
<script>
import { EntranceService } from './entrance.service'
import { columns } from './entrance.config'
import { RouteService } from '@/services/route.service'
export default {
  name: 'PageShopReceptionEntrance',
  bem: {
    entrance: 'page-shop-reception-entrance'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      entranceService: EntranceService
    }
  },
  rxState() {
    return {
      auth: this.entranceService.auth$,
      list: this.entranceService.list$,
      page: this.entranceService.page$,
      loading: this.entranceService.loading$,
      query: this.routeService.query$
    }
  },
  computed: {
    entryTypeList() {
      let array = []
      array = [
        {
          label: '全部',
          value: -1
        },
        {
          label: '会员入场',
          value: 1
        },
        {
          label: '到访入场',
          value: 2
        }
      ]
      return array
    }
  },
  data() {
    return {
      columns,
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    onSelect(key, data) {
      this.$router.push({ query: { ...this.query, ...{ [key]: data } } })
    },
    // 清空列表选择
    onClear() {
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    // 列表选择
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 分页
    onPageChange(data) {
      this.$router.push({ query: { ...this.query, page: data.current, size: data.pageSize } })
    },
    // 离场
    onLeave(record) {
      this.$confirm({
        title: '离场',
        content: `确定离场吗？`,
        onOk: () => {
          return this.entranceService.setEntranceLeave(record.id).toPromise().then(() => {
            this.entranceService.getList().subscribe()
          })
        }
      })
    },
    // 批量离场
    onLeaveBatch() {
      this.$confirm({
        title: '批量离场',
        content: `确定离场吗？`,
        onOk: () => {
          return this.entranceService.setEntranceLeaveBatch({
            ids: this.selectedRowKeys
          }).toPromise().then(() => {
            this.entranceService.getList().subscribe()
          })
        }
      })
    }
  }
}
</script>
