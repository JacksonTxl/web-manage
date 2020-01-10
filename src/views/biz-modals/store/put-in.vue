<template>
  <st-modal
    title="入库"
    @ok="onSubmit"
    v-model="show"
    :loading="loading.stockWarehouse"
  >
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
import { cloneDeep } from 'lodash-es'
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
    this.skuList = cloneDeep(this.list)
  },
  methods: {
    onSubmit() {
      this.putInService
        .stockWarehouse({ stock: this.skuList })
        .subscribe(res => {
          this.$emit('success')
          this.show = false
        })
    }
  }
}
</script>
