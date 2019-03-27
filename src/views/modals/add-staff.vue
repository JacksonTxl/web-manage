<template>
  <a-modal title='添加员工'
    confirmLoading
    @ok='onSubmit'
    v-model='show'>
    <a-row>
      <a-col :span='16'
        :offset='4'>
        Hello world
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
export default {
  name: 'AddStaffModal',
  data() {
    return {
      show: false
    }
  },
  methods: {
    onSubmit() {
      console.log('ok')
    }
  }
}
</script>
