<template>
  <section class="pd-24">
    <st-table
    :pagination="{current:query.page,total:page.total_counts,pageSize:query.size}"
    :columns="columns"
    :loading="loading.getList"
    @change="onPageChange"
    :dataSource="list">
      <template slot="consume_time" slot-scope="text">
        {{moment(text*1000).format('YYYY-MM-DD HH:mm')}}
      </template>
    </st-table>
  </section>
</template>
<script>
import moment from 'moment'
import { CollectionDetailsService } from './collection-details.service'
import { RouteService } from '@/services/route.service'
const columns = [{
  title: '消费时间',
  dataIndex: 'consume_time',
  scopedSlots: { customRender: 'consume_time' }
}, {
  title: '消费内容',
  dataIndex: 'consume_content',
  scopedSlots: { customRender: 'consume_content' }
}, {
  title: '消费课时',
  dataIndex: 'consume_course',
  scopedSlots: { customRender: 'consume_course' }
}, {
  title: '剩余课时',
  dataIndex: 'course_remain',
  scopedSlots: { customRender: 'course_remain' }
}, {
  title: '备注',
  dataIndex: 'description',
  scopedSlots: { customRender: 'description' }
}]
export default {
  name: 'PageShopSoldCardMemberInfoConsumption',
  bem: {
    basic: 'page-shop-sold'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      collectionDetailsService: CollectionDetailsService
    }
  },
  rxState() {
    return {
      page: this.collectionDetailsService.page$,
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
    moment,
    onPageChange(data) {
      this.$router.push({ query: { ...this.query, page: data.current, size: data.pageSize } })
    }
  }
}
</script>
