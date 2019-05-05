<template>
  <st-modal title="分配销售" @ok="save" v-model="show" size="small">
    <st-form :form="form" @submit="save" labelWidth="56px">
      <a-row :gutter="8">
        <a-col :lg="24" style="padding: 0;">
          <a-input-search
            size="large"
            placeholder="搜索会籍销售姓名，手机号，昵称"
            style="width: 100%;"
            @search="onSearch"
          />
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="24" class="distribution-container" style="padding-left:12px;padding-right:12px;">
          <a-table :columns="columns" :dataSource="data" :rowSelection="rowSelection" />
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
const columns = [{
  title: '会籍销售姓名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '签单率（近30天）',
  dataIndex: 'age',
  key: 'age',
  width: '40%'
}, {
  title: '分配',
  dataIndex: 'address',
  width: '15%',
  key: 'address'
}]
export default {
  name: 'distributionAles',
  props: {},
  data() {
    return {
      columns,
      show: false
    }
  },
  created() {},
  methods: {
    save(e) {
      e.preventDefault()
      console.log(e)
    }
  },
  watch: {}
}
</script>
