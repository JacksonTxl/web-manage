<template>
  <section class="pd-24">
    <st-table
    rowKey="flow_id"
    :pagination="false"
    :columns="columns"
    :loading="loading.getList"
    :dataSource="list">
      <template slot="amount" slot-scope="text,record">
          {{record.flow_type === 3 ? `-${text}` : text}}
      </template>
      <div slot="action" slot-scope="text, record">
          <a v-if="record.auth['brand_shop:order:order|flow_reverse']" @click="onFlowReversal(record)">流水冲销</a>
      </div>
    </st-table>
  </section>
</template>
<script>
import moment from 'moment'
import { CollectionDetailsService } from './collection-details.service'
import { RouteService } from '@/services/route.service'
const columns = [{
  title: '流水号',
  dataIndex: 'flow_id',
  scopedSlots: { customRender: 'flow_id' }
}, {
  title: '金额（元）',
  dataIndex: 'amount',
  scopedSlots: { customRender: 'amount' }
}, {
  title: '收银方式',
  dataIndex: 'pay_type',
  scopedSlots: { customRender: 'pay_type' }
}, {
  title: '类型',
  dataIndex: 'flow_type_name',
  scopedSlots: { customRender: 'flow_type_name' }
}, {
  title: '收款时间',
  dataIndex: 'flow_time',
  scopedSlots: { customRender: 'flow_time' }
}, {
  title: '操作人',
  dataIndex: 'operator_name',
  scopedSlots: { customRender: 'operator_name' }
}, {
  title: '关联订单号',
  dataIndex: 'linked_order',
  scopedSlots: { customRender: 'linked_order' }
}, {
  title: '备注',
  dataIndex: 'remark',
  scopedSlots: { customRender: 'remark' }
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}]
export default {
  name: 'PageShopFinanceOrderInfoCollectionDetails',
  bem: {
    basic: 'page-shop-finance'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      collectionDetailsService: CollectionDetailsService
    }
  },
  rxState() {
    return {
      list: this.collectionDetailsService.list$,
      loading: this.collectionDetailsService.loading$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      columns
    }
  },
  methods: {
    onFlowReversal(record) {
      this.$modalRouter.push({
        name: 'shop-finance-flow',
        props: {
          id: record.flow_id
        },
        on: {
          success: (result) => {
            this.$router.push({ query: this.query, force: true })
          }
        }
      })
    }
  }
}
</script>
