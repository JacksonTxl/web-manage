<template>
  <st-modal
    :title="title"
    v-model="show"
    :footer="null"
    wrapClassName="scroll-modal"
  >
    <st-table
      rowKey="key"
      :loading="loading[`get${type}ShopList`]"
      :dataSource="stList"
      :columns="columns"
      :scroll="{ y: 230 }"
      @change="onPageChange"
      :pagination="{
        current: +page.current_page,
        total: +page.total_counts,
        pageSize: +page.size
      }"
    />
  </st-modal>
</template>
<script>
import { ShopTableService } from './shop-table.service'
import { columns } from './shop-table.config'
export default {
  name: 'ModalShopDepositShopTable',
  serviceInject() {
    return {
      shopTableService: ShopTableService
    }
  },
  rxState() {
    return {
      loading: this.shopTableService.loading$,
      list: this.shopTableService.list$,
      page: this.shopTableService.page$
    }
  },
  computed: {
    columns,
    stList() {
      let array = []
      this.list.forEach(o => {
        let key = parseInt(Math.random() * 999999).toString()
        array.push({ ...o, key })
      })
      return array
    }
  },
  props: ['id', 'type', 'title'],
  data() {
    return {
      show: false
    }
  },
  created() {
    this.getList({
      size: 20,
      current_page: 1
    })
  },
  methods: {
    getList(query) {
      this.shopTableService[`get${this.type}ShopList`](
        query,
        this.id
      ).subscribe()
    },
    onPageChange(data) {
      this.getList({
        size: data.pageSize,
        current_page: data.current
      })
    }
  }
}
</script>
