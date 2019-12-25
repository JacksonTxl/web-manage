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
        this.putInService
          .stockOutbound({ stock: this.skuList })
          .subscribe(res => {
            this.$emit('success')
            this.show = false
            // this.$router.reload()
          })
      } else {
        this.putInService
          .stockWarehouse({ stock: this.skuList })
          .subscribe(res => {
            console.log('数据请求回来了')
            this.$emit('success', res)
            this.show = false
            // this.$router.reload()
          })
      }
      this.show = false
    }
  }
}
</script>
