<template>
<div>
  <st-icon type="alipay" size="24px" />
  <st-form :form="formTime">
  <st-table :columns="columns"
    :pagination="false"
    :dataSource="data"
  >
    <template slot="time">
        <st-form-item label="">
          <a-input  v-decorator="[
            'note1',
            {rules: [{ required: true, message: 'Please input your note!' }]}
          ]"/>
        </st-form-item>
    </template>
    <template slot="rally_price">
        <st-form-item label="">
          <a-input  v-decorator="[
            'note2',
            {rules: [{ required: true, message: 'Please input your note!' }]}
          ]"/>
        </st-form-item>
    </template>
    <template slot="frozen_day">
        <st-form-item label="">
          <a-input  v-decorator="[
            'note3',
            {rules: [{ required: true, message: 'Please input your note!' }]}
          ]"/>
        </st-form-item>
    </template>
    <template slot="gift_unit">
        <st-form-item label="">
          <a-input  v-decorator="[
            'note4',
            {rules: [{ required: true, message: 'Please input your note!' }]}
          ]"/>
        </st-form-item>
    </template>
    <template slot="operation">
        <st-form-item label="">
          <a-input/>
        </st-form-item>
    </template>
  </st-table>
  </st-form>
</div>

</template>
<script>
const columns = [
  {
    title: '期限',
    scopedSlots: { customRender: 'time' },
    dataIndex: 'time',
    width: 200
  },
  {
    title: '售价范围',
    scopedSlots: { customRender: 'rally_price' },
    dataIndex: 'rally_price',
    width: 200
  },
  {
    title: '允许冻结天数',
    scopedSlots: { customRender: 'frozen_day' },
    dataIndex: 'frozen_day',
    width: 200
  },
  {
    title: '赠送上限',
    scopedSlots: { customRender: 'gift_unit' },
    dataIndex: 'gift_unit',
    width: 200
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  data() {
    return {
      formTime: this.$form.createForm(this),
      data: [{ gift_unit: 'edrqased' }, { gift_unit: 'edrqased' }],
      columns
    }
  }
}
</script>
