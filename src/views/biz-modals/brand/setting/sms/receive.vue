<template>
  <st-modal
    title="接受人"
    v-model="show"
    :footer="null"
    wrapClassName="scroll-modal"
  >
    <st-table
      rowKey="key"
      :loading="loading.getReceiveNumListt"
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
import { SmsReceiveNumService } from './receive.service'
import { columns } from './receive.config'
export default {
  name: 'ModalSettingSmsShop',
  serviceInject() {
    return {
      smsReceiveNumService: SmsReceiveNumService
    }
  },
  rxState() {
    return {
      loading: this.smsReceiveNumService.loading$,
      list: this.smsReceiveNumService.list$,
      page: this.smsReceiveNumService.page$
    }
  },
  computed: {
    columns
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {
    this.getReceiveNumList({
      size: 20,
      current_page: 1
    })
  },
  methods: {
    getReceiveNumList() {
      return this.smsReceiveNumService.getReceiveNumList(this.id).subscribe()
    },
    onPageChange(data) {
      this.getReceiveNumList({
        size: data.pageSize,
        current_page: data.current
      })
    }
  }
}
</script>
