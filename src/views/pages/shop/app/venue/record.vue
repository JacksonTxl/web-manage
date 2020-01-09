<template>
  <div :class="data()">
    <div :class="data('search')">
      <div :class="data('action')">
        <st-input-search
          placeholder="请输入预约人或手机号查找"
          v-model="$searchQuery.keywords"
          @search="onKeywordsSearch('keywords', $event)"
        />
      </div>
    </div>

    <st-table
      :page="page"
      @change="onTableChange"
      :loading="loading.getList"
      :columns="columns"
      :dataSource="list"
      :stripe="false"
      rowKey="id"
    >
      <st-table
        slot="expandedRowRender"
        slot-scope="text"
        :columns="subColumns"
        :dataSource="text.order_sub"
        :pagination="false"
      >
        <template slot="reserve_status" slot-scope="text">
          <st-text
            :status="{
              success: text === 3,
              error: text === 1 || text === 4,
              warning: text === 2
            }"
          >
            {{ text | enumFilter('venues_reserve.venues_reserve_status') }}
          </st-text>
        </template>
        <div slot="action" slot-scope="text, record">
          <st-table-actions>
            <a
              v-if="record.auth['shop:order:venues_reserve|slave_del']"
              @click="cancelBooking(record.id, true)"
            >
              取消预约
            </a>
          </st-table-actions>
        </div>
      </st-table>
      <template slot="order_source" slot-scope="text">
        {{ text | enumFilter('finance.order_source') }}
      </template>
      <template slot="reserve_status" slot-scope="text">
        <st-text
          :status="{
            success: text === 3,
            error: text === 1 || text === 4,
            warning: text === 2
          }"
        >
          {{ text | enumFilter('venues_reserve.venues_reserve_status') }}
        </st-text>
      </template>
      <template slot="pay_status" slot-scope="text">
        <st-text
          :status="{
            success: text === 3,
            error: text === 2,
            warning: text === 1
          }"
        >
          {{ text | enumFilter('finance.pay_status') }}
        </st-text>
      </template>
      <div slot="action" slot-scope="text, record">
        <st-table-actions>
          <a
            v-if="record.auth['shop:order:venues_reserve|master_pay']"
            @click="receipt(record.id)"
          >
            收款
          </a>
          <a
            v-if="record.auth['shop:order:venues_reserve|master_del']"
            @click="cancelBooking(record.id)"
          >
            取消预约
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>

<script>
import { RecordService } from './record.service'
import tableMixin from '@/mixins/table.mixin'
import { columns, subColumns } from './record.config'
import SoldDealGathering from '@/views/biz-modals/sold/deal/gathering'
import { RESERVE_STATUS } from '@/constants/venue'
export default {
  name: 'PageShopAppVenueData',
  bem: {
    data: 'shop-app-venue-data'
  },
  mixins: [tableMixin],
  modals: {
    SoldDealGathering
  },
  serviceInject() {
    return {
      recordService: RecordService
    }
  },
  rxState() {
    return {
      list: this.recordService.list$,
      page: this.recordService.page$,
      loading: this.recordService.loading$
    }
  },
  data() {
    return {
      query: {
        shop_id: -1,
        day: 7,
        start_date: undefined,
        end_date: undefined
      },
      columns,
      subColumns,
      RESERVE_STATUS
    }
  },
  methods: {
    receipt(id) {
      this.$modalRouter.push({
        name: 'sold-deal-gathering',
        props: {
          order_id: id,
          type: 'venues'
        },
        on: {
          success: this.payCallBack
        }
      })
    },
    payCallBack(orderId, callBackType) {
      switch (callBackType) {
        case 'cancel':
          this.onSearch()
          break
        case 'pay':
          this.createdGatheringTip({
            message: '收款成功',
            order_id: orderId
          })
          break
      }
    },
    cancelBooking(id, isSub) {
      let params = {}
      if (isSub) {
        params.sub_order_id = id
      } else {
        params.order_id = id
      }
      this.recordService.cancelReserve(params).subscribe(() => {
        this.getList()
      })
    },
    onChangeChartShop(event) {
      this.query.shop_id = event
      this.getList()
    },
    onChangeChartDays(event) {
      this.query.day = event.recently_day || undefined
      this.query.start_date = event.start_date || undefined
      this.query.end_date = event.end_date || undefined
      this.getList()
    },
    getList() {
      this.recordService.getList(this.query).subscribe()
    }
  }
}
</script>
