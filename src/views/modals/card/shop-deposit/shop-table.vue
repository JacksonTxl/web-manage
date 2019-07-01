<template>
  <st-modal
    :title="title"
    v-model="show"
    :footer="null"
  >
    <st-table
      rowKey="id"
      :loading="loading[`get${type}ShopList`]"
      :dataSource="list"
      :columns="columns"
      :scroll="{ y: 230 }"
      @change="onPageChange"
      :pagination="{current:page.current_page,total:page.total_counts,pageSize:page.size}"
    />
  </st-modal>
</template>
<script>
import { ShopTableService } from './shop-table.service'
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
  props: ['id', 'type', 'title'],
  data() {
    return {
      show: false,
      columns: [
        {
          title: '省',
          dataIndex: 'province_name',
          width: '22%',
          scopedSlots: { customRender: 'province_name' }
        },
        {
          title: '市',
          width: '22%',
          dataIndex: 'city_name'
        },
        {
          title: '区',
          width: '22%',
          dataIndex: 'district_name'
        },
        {
          title: '门店名称',
          width: '34%',
          dataIndex: 'shop_name'
        }
      ]
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
      this.shopTableService[`get${this.type}ShopList`](query, this.id).subscribe()
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
