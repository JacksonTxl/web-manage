<template>
  <st-modal
    :title="title"
    v-model="show"
    :footer="null"
    wrapClassName="scroll-modal"
  >
    <div :class="b('total')">
      <div :class="b('num')">{{ info.sale_price }}</div>
      <div :class="b('num')">
        {{ info.royalty_price }}
        <label :class="b('tip')" v-if="info.royalty_mode_exist === 2">
          （该员工当月未设置提成模板）
        </label>
      </div>
    </div>
    <st-table
      rowKey="id"
      :loading="loading.getList"
      :dataSource="list"
      :columns="columns"
      :scroll="{ x: 1200, y: 230 }"
      @change="onPageChange"
      simplePage
      :page="page"
      :class="list.length > 0 ? 'st-scroll-data' : ''"
    />
  </st-modal>
</template>
<script>
import { SaleCommissionService } from './sale-commission.service'
import { columns } from './sale-commission.config'
export default {
  name: 'ModalBrandFinanceClassCommission',
  bem: {
    b: 'modal-brand-finance'
  },
  serviceInject() {
    return {
      saleCommissionService: SaleCommissionService
    }
  },
  rxState() {
    return {
      loading: this.saleCommissionService.loading$,
      info: this.saleCommissionService.info$,
      list: this.saleCommissionService.list$,
      page: this.saleCommissionService.page$
    }
  },
  computed: {
    columns,
    title() {
      return this.info.royalty_mode_text
        ? `销售提成(${this.info.royalty_mode_text})`
        : '销售提成'
    }
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
      return this.saleCommissionService.getList(query).subscribe()
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
