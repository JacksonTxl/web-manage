<template>
  <div class="ground-cards-table-price">
    <a-table :dataSource="value" :columns="columns" :pagination="false" rowKey="id">
      <span
        slot="sale_price"
        slot-scope="text,record"
        href="javascript:;"
        @click="memberFun(text,record)"
      >
        <template v-if="typeof(text) !== 'string'">
          <a-input placeholder="1000-2000" style="width:140px" v-model="record.type"/>
          <span class="money">元</span>
        </template>
        <template v-else>{{text}}</template>
      </span>
    </a-table>
  </div>
</template>
<script>
export default {
  name: 'ground-cards-table-price',
  model: {
    prop: 'value',
    event: 'dataChange'
  },
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      columns: [
        {
          title: '有效期',
          dataIndex: 'validity_period'
        },
        {
          title: '售卖价格',
          dataIndex: 'sale_price',
          scopedSlots: { customRender: 'sale_price' }
        },
        {
          title: '允许冻结',
          dataIndex: 'frozen_day'
        },
        {
          title: '赠送上限',
          dataIndex: 'gift_unit'
        }
      ]
    }
  },
  methods: {
    memberFun(text, record) {
      console.log(text, record)
    }
  }
}
</script>
