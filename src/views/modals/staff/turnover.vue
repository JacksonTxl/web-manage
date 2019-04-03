<template>
  <a-modal class="modal-staff-turnover" title='员工离职'
    confirmLoading
    @ok='onSubmit'
    okText="保存"
    v-model='show'>
    <section>
      <div class="modal-staff-turnover__tag mg-b24">
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r8" type="role-staff"/>
      </div>
      <div class="modal-staff-turnover__tip modal-staff-tip mg-b24">
        <p>该员工有以下几个事项待处理，无法进行离职</p>
        <ul>
          <li v-for="(tip, index) in tips" :key="index" class="item"><span class="count">{{index + 1}}</span> {{tip}}</li>
        </ul>
      </div>
      <st-form class="modal-staff-turnover__form" labelWidth='60px'>
        <st-form-item  labelWidth='60px' label="离职日期" class="mg-b0">
          <a-input placeholder="支持中英文、数字,不超过10个字" />
        </st-form-item>
      </st-form>
    </section>
  </a-modal>
</template>
<script>
export default {
  name: 'turnover',
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
