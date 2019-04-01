<template>
  <a-modal class="modal-turnover" title='员工离职'
    confirmLoading
    @ok='onSubmit'
    v-model='show'>
    <section>
      <div class="staff-tag">
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r8" type="role-staff"/>
      </div>
      <div class="staff-tip">
        <p>该员工有以下几个事项待处理，无法进行离职</p>
        <ul>
          <li v-for="(tip, index) in tips" :key="index"></li>
        </ul>
        <p>① 5节未上的团体课程，</p>
        <p>② 5个服务中的私教课程，</p>
        <p>② 5个服务中的私教课程，</p>
      </div>
    </section>
  </a-modal>
</template>
<script>
export default {
  name: 'turnover',
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
