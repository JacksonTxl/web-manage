<template>
  <div :class="basic()">
    <portal to="SHOP_SOLD_CARD_LIST_ACTIONS">
      <st-input-search
        v-model="$searchQuery.search"
        @search="onKeywordsSearch('search', $event)"
        placeholder="请输入卡名、合同编号、会员姓名或手机号查找"
        style="width:380px"
      />
    </portal>

    <st-search-panel @search="onSearchNative" @reset="onSearchReset">
      <st-search-panel-item label="储值卡状态：">
        <st-search-radio v-model="$searchQuery.is_valid" :options="isValids" />
      </st-search-panel-item>
      <st-search-panel-item label="购买时间：">
        <st-range-picker :disabledDays="180" v-model="date" />
      </st-search-panel-item>
    </st-search-panel>
    <div :class="basic('content')">
      <div :class="basic('content-batch')">
        <!-- NOTE: 导出 -->
        <!-- <st-button type="primary" class="mg-r8" v-if="auth.export">批量导出</st-button> -->
      </div>
      <st-total
        :indexs="totalColumns"
        :dataSource="total"
        hasTitle
        class="mg-b16"
      ></st-total>
      <div>
        <!--
          NOTE: 本期没有按钮不做
          :alertSelection="{onReset: onClear}"
          :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
         -->
        <st-table
          :page="page"
          rowKey="id"
          @change="onTableChange"
          :loading="loading.getList"
          :columns="columns"
          :dataSource="list"
          :scroll="{ x: 3000 }"
        >
          <template slot="is_valid" slot-scope="text">
            <st-text
              :status="{
                success: text === 1,
                error: text === 2
              }"
            >
              {{ text | enumFilter('sold_common.is_valid') }}
            </st-text>
          </template>
          <template slot="end_time" slot-scope="text">
            {{ text }}
          </template>
          <template slot="buy_time" slot-scope="text">
            {{ text }}
          </template>
          <div slot="action" slot-scope="text, record">
            <st-table-actions>
              <a
                v-if="record.auth['shop:sold:sold_deposit_card|get']"
                @click="onDetail(record)"
              >
                详情
              </a>
              <a
                v-if="
                  record.auth['shop:sold:sold_deposit_card|export_contract']
                "
                @click="toContract(record)"
              >
                查看合同
              </a>
              <a
                v-if="record.auth['shop:sold:sold_deposit_card|transfer']"
                @click="onTransfer(record)"
              >
                转让
              </a>
              <a
                v-if="record.auth['brand_shop:order:order|refund']"
                @click="onRefund(record)"
              >
                退款
              </a>
            </st-table-actions>
          </div>
        </st-table>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { DepositService } from './deposit.service'
import tableMixin from '@/mixins/table.mixin'
import { columns, totalColumns } from './deposit.config'
import SoldCardRefund from '@/views/biz-modals/sold/card/refund'
import SoldCardTransfer from '@/views/biz-modals/sold/card/transfer'
export default {
  name: 'PageShopSoldCardDepositList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-sold'
  },
  modals: {
    SoldCardRefund,
    SoldCardTransfer
  },
  serviceInject() {
    return {
      depositService: DepositService
    }
  },
  rxState() {
    return {
      list: this.depositService.list$,
      loading: this.depositService.loading$,
      page: this.depositService.page$,
      isValids: this.depositService.isValids$,
      auth: this.depositService.auth$,
      total: this.depositService.total$
    }
  },
  computed: {
    columns,
    totalColumns
  },
  data() {
    return {
      is_valid: 1,
      // 结束时间面板是否显示
      endOpen: false,
      selectedRowKeys: [],
      selectedRows: [],
      date: []
    }
  },

  mounted() {
    this.setSearchData()
  },
  watch: {
    query(newVal) {
      this.setSearchData()
    }
  },
  methods: {
    // 跳转合同
    toContract(record) {
      let url = `${window.location.origin}/common/contract-preview?id=${
        record.order_id
      }`
      window.open(url)
    },
    // 转让
    onTransfer(record) {
      this.$modalRouter.push({
        name: 'sold-card-transfer',
        props: {
          id: record.id,
          type: 'deposit'
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 退款
    onRefund(record) {
      this.$modalRouter.push({
        name: 'sold-card-refund',
        props: {
          type: 'deposit',
          id: record.id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 详情
    onDetail(record) {
      this.$router.push({
        name: `shop-sold-card-info-deposit-info-operation-record`,
        query: { id: record.id }
      })
    },
    // 查询
    onSearchNative() {
      this.$searchQuery.start_time = this.date[0]
        ? `${this.date[0].format('YYYY-MM-DD')} 00:00:00`
        : ''
      this.$searchQuery.end_time = this.date[1]
        ? `${this.date[1].format('YYYY-MM-DD')} 23:59:59`
        : ''
      this.onSearch()
    },
    // 设置searchData
    setSearchData() {
      this.is_valid = this.$searchQuery.is_valid
      const start = this.$searchQuery.start_time
        ? cloneDeep(moment(this.$searchQuery.start_time))
        : null
      const end = this.$searchQuery.end_time
        ? cloneDeep(moment(this.$searchQuery.end_time))
        : null
      this.date = [start, end]
    },
    // moment
    moment,
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = cloneDeep(selectedRowKeys)
    },
    onClear() {
      this.selectedRowKeys = []
      this.selectedRows = []
    }
  }
}
</script>
