<template>
  <st-modal title="入库" @ok="onSubmit" v-model="show">
    <st-table :columns="columns" :dataSource="tableData">
      <template slot="group_status" slot-scope="customRender, record">
        <st-input-number
          v-model="record.group_price"
          :float="true"
          style="width:110px;"
        ></st-input-number>
      </template>
      <template slot="shop_name" slot-scope="customRender, record">
        <st-input-number
          v-model="record.group_price"
          :float="true"
          style="width:110px;"
        ></st-input-number>
      </template>
    </st-table>
  </st-modal>
</template>
<script>
import { columns } from './put-in.config.ts'
export default {
  data() {
    return { show: false, tableData: [{ group_price: '' }] }
  },
  props: {
    isOut: {
      type: Boolean,
      default: false
    }
  },
  computed: { columns },
  methods: {
    onSubmit() {
      console.log('点击了确定')
    }
  }
}
</script>
