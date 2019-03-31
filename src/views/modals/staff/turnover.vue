<template>
  <a-modal title='员工离职'
    confirmLoading
    @ok='onSubmit'
    v-model='show'>
    <section>
      <st-tag type="coach-personal"/>
      <st-tag type="coach-team"/>
      <st-tag type="role-staff"/>
    </section>
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
