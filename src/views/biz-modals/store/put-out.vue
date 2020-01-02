<template>
  <st-modal title="出库" @ok="onSubmit" v-model="show">
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
  </st-modal>
</template>
<script>
import { columns } from './put-out.config.ts'
import { PutOutService } from './put-out.service.ts'
export default {
  serviceInject() {
    return {
      putOutService: PutOutService
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
      columns
    }
  },
  props: {
    skuList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    onSubmit() {
      this.putOutService
        .stockOutbound({ stock: this.skuList })
        .subscribe(res => {
          console.log('1111111111====')
          this.$emit('success')
          this.show = false
        })
    }
  }
}
</script>
