<template>
  <st-modal :title="isOut ? '出库' : '入库'" @ok="onSubmit" v-model="show">
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
        <st-input-number
          v-model="record.remark"
          :float="true"
          style="width:110px;"
        ></st-input-number>
      </template>
    </st-table>
  </st-modal>
</template>
<script>
import { columns } from './put-in.config.ts'
import { PutInService } from './put-in.service.ts'
export default {
  serviceInject() {
    return {
      putInService: PutInService
    }
  },
  rxState() {
    return {
      loading: this.putInService.loading$
    }
  },
  data() {
    return {
      show: false
    }
  },
  props: {
    isOut: {
      type: Boolean,
      default: false
    },
    skuList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: { columns },
  methods: {
    onSubmit() {
      if (this.isOut) {
        console.log('这是出库参数', this.skuList)
        this.putInService.stockOutbound(this.skuList).subscribe(res => {
          this.show = false
        })
      } else {
        console.log('这是入库参数', this.skuList)
        this.putInService.stockWarehouse(this.skuList).subscribe(res => {
          this.show = false
        })
      }
      this.show = false
    }
  }
}
</script>
