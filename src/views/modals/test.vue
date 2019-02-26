<template>
  <a-modal title='账单来看'
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
