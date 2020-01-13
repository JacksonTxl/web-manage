<template>
  <st-modal
    :title="title"
    v-model="show"
    :footer="null"
    wrapClassName="scroll-modal"
  >
    <st-table
      rowKey="key"
      :loading="loading.getPluginCouponShop"
      :dataSource="stList"
      :columns="columns"
      :scroll="{ y: 230 }"
      @change="onPageChange"
      :page="page"
    />
  </st-modal>
</template>
<script>
import { CouponTableService } from './coupon-table.service'
import { columns } from './coupon-table.config.ts'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'ModalBrandMarkingCouponTable',
  mixins: [tableMixin],
  serviceInject() {
    return {
      couponTableService: CouponTableService
    }
  },
  rxState() {
    return {
      loading: this.couponTableService.loading$,
      list: this.couponTableService.list$,
      page: this.couponTableService.page$
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
      this.couponTableService.getPluginCouponShop(query, this.id).subscribe()
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
