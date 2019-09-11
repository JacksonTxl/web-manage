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
      :page="page"
    />
  </st-modal>
</template>
<script>
import { ShopTableService } from './shop-table.service'
import { columns } from './shop-table.config.ts'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'ModalBrandDepositShopTable',
  mixins: [tableMixin],
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
    stList() {
      let array = []
      this.list.forEach(o => {
        let key = parseInt(Math.random() * 999999).toString()
        array.push({ ...o, key })
      })
      return array
    },
    columns
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
