<template>
  <st-modal
    title="出库"
    @ok="onSubmit"
    v-model="show"
    :loading="loading.stockOutbound"
  >
    <st-container>
      <st-table
        :columns="columns"
        :dataSource="skuList"
        rowKey="sku_id"
        :page="false"
      >
        <template slot="stock_amount" slot-scope="customRender, record">
          <st-input-number
            v-model="record.stock_amount"
            :float="true"
            style="width:110px;"
          ></st-input-number>
        </template>
        <template slot="remark" slot-scope="customRender, record">
          <a-input
            v-model="record.remark"
            :float="true"
            style="width:110px;"
          ></a-input>
        </template>
      </st-table>
    </st-container>
  </st-modal>
</template>
<script>
import { columns } from './put-out.config.ts'
import { PutOutService } from './put-out.service.ts'
import { cloneDeep } from 'lodash-es'
import { NotificationService } from '@/services/notification.service'
export default {
  serviceInject() {
    return {
      putOutService: PutOutService,
      notificationService: NotificationService
    }
  },
  rxState() {
    return {
      loading: this.putOutService.loading$
    }
  },
  data() {
    return {
      show: false,
      columns,
      skuList: []
    }
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
    console.log(this.list, 'list')
    this.skuList = cloneDeep(this.list)
  },
  methods: {
    onSubmit() {
      let isError = this.skuList.some(
        item => !item.stock_amount || item.stock_amount === '0'
      )
      if (isError) {
        this.notificationService.error({
          title: '保存失败',
          content: '请正确填写出库数'
        })
        return
      }
      this.putOutService
        .stockOutbound({ stock: this.skuList })
        .subscribe(res => {
          this.$emit('success')
          this.show = false
        })
    }
  }
}
</script>
