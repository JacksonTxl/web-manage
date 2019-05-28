<template>
  <st-form-item label="租赁柜号">
    <a-cascader :options="options" placeholder="选择XXX" v-decorator="value.sell_name"/>
  </st-form-item>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: ['value'],
  data() {
    return {
      options: [
        {
          value: '1',
          label: '女更区域',
          children: [
            {
              value: '11',
              label: 'A001'
            },
            {
              value: '12',
              label: 'A002'
            }
          ]
        },
        {
          value: '2',
          label: '男更区域',
          children: [
            {
              value: '21',
              label: 'B001'
            },
            {
              value: '22',
              label: 'B002'
            },
            {
              value: '23',
              label: 'B003'
            }
          ]
        }
      ]
    }
  }
}
</script>
