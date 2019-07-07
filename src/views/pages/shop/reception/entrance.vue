<template>
  <st-panel app :class="entrance()">
    <div :class="entrance('search')" class="mg-b16">
      <st-button type="primary" :disabled="!selectedRowKeys.length || !auth.batchCheckout" @click="onLeaveBatch">批量离场</st-button>
      <div>
        <a-input-search
        style="width: 200px"
        class="mg-r8"
        v-model="query.keyword"
        @search="onSingleSearch('keyword',$event)"
        placeholder="请输入姓名或手机号查找" />
        <a-select
        style="width: 160px"
        v-model="query.entry_type"
        @change="onSingleSearch('entry_type',$event)"
        >
          <a-select-option v-for="item in entryTypeList" :key="item.value">{{item.label}}</a-select-option>
        </a-select>
      </div>
    </div>
    <st-table
      :scroll="{x:1440}"
      :page='page'
      :alertSelection='{onReset:onSelectionReset}'
      @change='onTableChange'
      :rowSelection="{selectedRowKeys,onChange:onSelectionChange}"
      :loading="loading.getList"
      :columns="columns"
      :dataSource="list"
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
          {{record.entry_time}}{{record.leave_time?`&nbsp;~&nbsp;${record.leave_time}`:''}}
        </template>
        <!-- 操作 -->
        <div slot="action" slot-scope="text,record">
          <st-table-actions>
            <a @click="onLeave(record)" v-if="auth.checkout">离场</a>
          </st-table-actions>
        </div>
    </st-table>
  </st-panel>
</template>
<script>
import { EntranceService } from './entrance.service'
import { columns } from './entrance.config.ts'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'

export default {
  mixins: [ tableMixin ],
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
      entryTypeList: this.entranceService.entryTypeList$,
      list: this.entranceService.list$,
      page: this.entranceService.page$,
      loading: this.entranceService.loading$,
      query: this.routeService.query$
    }
  },
  computed: {
    columns
  },
  methods: {
    // 离场
    onLeave(record) {
      this.$confirm({
        title: '离场',
        content: `确定离场吗？`,
        onOk: () => {
          return this.entranceService.setEntranceLeave(record.member_id).toPromise().then(() => {
            this.onSelectionReset()
            this.$router.push({ force: true, query: this.query })
          })
        }
      })
    },
    // 批量离场
    onLeaveBatch() {
      let ids = []
      this.selectedRows.forEach(i => {
        ids.push(i.member_id)
      })
      this.$confirm({
        title: '批量离场',
        content: `确定离场吗？`,
        onOk: () => {
          return this.entranceService.setEntranceLeaveBatch({
            ids
          }).toPromise().then(() => {
            this.onSelectionReset()
            this.$router.push({ force: true, query: this.query })
          })
        }
      })
    }
  }
}
</script>
