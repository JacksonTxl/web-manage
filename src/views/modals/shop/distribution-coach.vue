<template>
  <st-modal title="分配教练" @ok="save" v-model="show" size="small">
    <!-- <section>content</section> -->
    <st-form :form="form" @submit="save" labelWidth="56px">
      <a-row :gutter="8">
        <a-col :lg="24" style="padding: 0;">
          <a-input-search
            size="large"
            placeholder="搜索私教教练姓名，手机号，昵称"
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
  title: '员工姓名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '成单率（近30天）',
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
  name: 'distributionCoach',
  props: {},
  data() {
    return {
      form: this.$form.createForm(this),
      show: false,
      columns
    }
  },
  created() {},
  methods: {
    onSearch(e) {

    },
    save(e) {
      e.preventDefault()
      console.log(e)
    }
  },
  watch: {}
}
</script>
