<template>
  <section class="pd-24">
    <st-table
      rowKey="flow_id"
      :pagination="false"
      :columns="columns"
      :loading="loading.getList"
      :dataSource="list"
    >
      <template slot="amount" slot-scope="text, record">
        {{ record.flow_type === 3 ? `-${text}` : text }}
      </template>
      <div slot="action" slot-scope="text, record">
        <a
          v-if="record.auth['shop:flow:income|reverse']"
          @click="onFlowReversal(record)"
        >
          流水冲销
        </a>
      </div>
    </st-table>
  </section>
</template>
<script>
import moment from 'moment'
import { CollectionDetailsService } from './collection-details.service'
import ShopFinanceFlow from '@/views/biz-modals/shop/finance/flow'
import { columns } from './collection-details.config'
export default {
  name: 'PageShopFinanceOrderInfoCollectionDetails',
  modals: {
    ShopFinanceFlow
  },
  serviceInject() {
    return {
      collectionDetailsService: CollectionDetailsService
    }
  },
  rxState() {
    return {
      list: this.collectionDetailsService.list$,
      loading: this.collectionDetailsService.loading$
    }
  },
  computed: {
    columns
  },
  data() {
    return {}
  },
  methods: {
    onFlowReversal(record) {
      this.$modalRouter.push({
        name: 'shop-finance-flow',
        props: {
          id: record.flow_id,
          order_id: this.$searchQuery.id
        },
        on: {
          success: result => {
            this.$router.reload()
          }
        }
      })
    }
  }
}
</script>
