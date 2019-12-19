<template>
  <st-modal
    title="所属门店"
    v-model="show"
    :footer="null"
    wrapClassName="scroll-modal"
  >
    <st-table
      rowKey="id"
      :loading="loading.getList"
      :dataSource="list"
      :columns="columns"
      :scroll="{ y: 230 }"
      @change="onPageChange"
      :simplePage="true"
      :page="page"
      :class="list.length > 0 ? 'st-scroll-data' : ''"
    />
  </st-modal>
</template>
<script>
import { StaffShopService } from './staff-shop.service'
import { columns } from './staff-shop.config'
import { COURSE_TYPE } from '@/constants/stat/course'
export default {
  name: 'ModalBrandFinanceStaffShop',
  bem: {
    b: 'modal-brand-finance'
  },
  serviceInject() {
    return {
      staffShopService: StaffShopService
    }
  },
  rxState() {
    return {
      loading: this.staffShopService.loading$,
      list: this.staffShopService.list$,
      page: this.staffShopService.page$
    }
  },
  computed: {
    columns
  },
  props: {
    id: {
      type: [String, Number]
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {
    this.getList({
      monthly_summary_id: this.id,
      size: 20,
      current_page: 1
    })
  },
  methods: {
    onChangeCourseType(event) {
      this.course_type = event
      this.getList({
        monthly_summary_id: this.id,
        size: 20,
        current_page: 1
      })
    },
    getList(query) {
      return this.staffShopService.getList(query).subscribe()
    },
    onPageChange(data) {
      this.getList({
        monthly_summary_id: this.id,
        size: data.pageSize,
        current_page: data.current
      })
    }
  }
}
</script>
