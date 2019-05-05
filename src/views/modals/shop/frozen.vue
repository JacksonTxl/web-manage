<template>
  <st-modal title="冻结" @ok="save" :footer="null" v-model="show" size="small">
    <st-form :form="form" @submit="save" labelWidth="75px">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-info>
            <st-info-item label="姓名">孙乐乐</st-info-item>
            <st-info-item label="手机号">12345678901</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-t4 class="mg-b8">选择需要冻结的卡或课</st-t4>
      <a-row :gutter="8">
        <a-col
          :lg="24"
          class="distribution-container"
          style="padding-left:12px;padding-right:12px;"
        >
          <a-table
            :rowSelection="rowSelection"
            :pagination="false"
            size="middle"
            :columns="columns"
            :dataSource="data"
          ></a-table>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="冻结日期" required>
            <a-range-picker @change="onccccChange"/>
            <br>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="手续费">
            <a-range-picker @change="onccccChange"/>
            <br>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="支付方式">
            <a-range-picker @change="onccccChange"/>
            <br>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="收款人员">
            <a-range-picker @change="onccccChange"/>
            <br>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item class="mg-l24 " style="text-align:right;" labelOffset>
            <st-button type="primary" ghost html-type="submit">确认提交</st-button>
          </st-form-item>
          </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
const columns = [
  {
    title: '卡课',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '剩余',
    dataIndex: 'age'
  },
  {
    title: '有效期',
    dataIndex: 'address'
  }
]
const data = [
  {
    key: '1',
    name: '塑形拉伸私教课',
    age: '12次',
    address: '2019-01-23 ~ 1233-23-23'
  },
  {
    key: '2',
    name: '一年会员卡',
    age: '12次',
    address: '2019-01-23 ~ 1233-23-23'
  }
]
export default {
  name: 'frozen',
  props: {},
  data() {
    return {
      form: this.$form.createForm(this),
      columns,
      data,
      show: false
    }
  },
  created() {},
  methods: {
    save(e) {
      e.preventDefault()
      console.log(e)
    },
    onccccChange(date, dateString) {
      console.log(date, dateString)
    }
  },
  computed: {

    rowSelection() {
      const { selectedRowKeys } = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          )
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        })
      }
    }
  },
  watch: {}
}
</script>
