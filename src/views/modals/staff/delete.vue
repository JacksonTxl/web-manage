<template>
  <a-modal class="modal-staff-delete"
    title='删除员工'
    confirmLoading
    @ok='onSubmit'
    v-model='show'>
    <section>
      <div class="modal-staff-delete__tag mg-b24">
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r8" type="role-staff"/>
      </div>
    </section>
    <section>
      <div class="modal-staff-delete__tip modal-staff-tip">
        <p>无法删除员工，该员工有以下几个事项待处理</p>
        <ul>
          <li v-for="(tip, index) in tips" :key="index" class="item"><span class="count">{{index + 1}}</span> {{tip}}</li>
        </ul>
      </div>
    </section>
    <section>
      <div class="modal-staff-delete__sub-tip">
        删除员工后，将暂停进行中的服务，同时将无法恢复，确认删除？
      </div>
    </section>
  </a-modal>
</template>
<script>
export default {
  name: 'DeleteStaff',
  data() {
    return {
      show: false,
      tips: ['5节未上的团体课程', '5个服务中的私教课程', '5个服务中的私教课程']
    }
  },
  methods: {
    onSubmit() {
      console.log('ok')
    }
  }
}
</script>
