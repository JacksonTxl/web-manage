<template>
  <div class="ground-cards-table-price">
    <a-table :dataSource="value.data" :columns="value.columns" :pagination="false" rowKey="id">
      <span
        slot="type"
        slot-scope="text,record"
        href="javascript:;"
        @click="memberFun(text,record)"
      >
        <a-input placeholder="1000-2000" style="width:140px" v-model="record.type"/>
        <span class="money">元</span>
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
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    memberFun(text, record) {
      console.log(text, record)
    }
  }
}
</script>
