<template>
  <st-modal
    :title="title"
    v-model="show"
    :footer="null"
    wrapClassName="scroll-modal"
  >
    <st-table
      :page="page"
      @change="onPageChange"
      :loading="loading.getPrizedList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    ></st-table>
  </st-modal>
</template>
<script>
import { PrizeService } from './lottery-table.service'
import { columns } from './lottery-table.config'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'ModalBrandMarketingLotteryTable',
  serviceInject() {
    return {
      prizeService: PrizeService
    }
  },
  rxState() {
    return {
      loading: this.prizeService.loading$,
      list: this.prizeService.list$,
      page: this.prizeService.page$
    }
  },
  computed: {
    columns
  },
  props: ['id', 'title'],
  data() {
    return {
      show: false
    }
  },
  created() {
    this.getList({
      size: 20,
      current_page: 1,
      id: this.id
    })
  },
  methods: {
    getList(query) {
      this.prizeService.getPrizedList(query).subscribe()
    },
    onPageChange(data) {
      this.getList({
        size: data.pageSize,
        current_page: data.current,
        id: this.id
      })
    }
  }
}
</script>
