<template>
  <st-modal
    title="任务明细"
    v-model="show"
    :footer="null"
    wrapClassName="scroll-modal"
  >
    <st-table
      rowKey="id"
      :loading="loading.getDetailList"
      :dataSource="list"
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
import { DetailService } from './detail.service'
import { columns } from './detail.config'
export default {
  name: 'ModalSettingTaskDetail',
  serviceInject() {
    return {
      detailService: DetailService
    }
  },
  rxState() {
    return {
      loading: this.detailService.loading$,
      list: this.detailService.list$,
      page: this.detailService.page$
    }
  },
  computed: {
    columns
  },
  props: {
    task_id: {
      type: [String, Number]
    },
    popup_type: {
      type: String
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {
    this.getDetailList({
      task_id: this.task_id,
      popup_type: this.popup_type,
      size: 20,
      current_page: 1
    })
  },
  methods: {
    getDetailList(query) {
      return this.detailService.getDetailList(query).subscribe()
    },
    onPageChange(data) {
      this.getDetailList({
        task_id: this.task_id,
        popup_type: this.popup_type,
        size: data.pageSize,
        current_page: data.current
      })
    }
  }
}
</script>
