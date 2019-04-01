<template>
  <a-modal class="modal-turnover" title='员工离职'
    confirmLoading
    @ok='onSubmit'
    okText="保存"
    v-model='show'>
    <section>
      <div class="modal-turnover-tag mg-b24">
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r8" type="role-staff"/>
      </div>
      <div class="modal-turnover-tip">
        <p>该员工有以下几个事项待处理，无法进行离职</p>
        <ul>
          <li v-for="(tip, index) in tips" :key="index" class="modal-turnover-tip__item"><span class="modal-turnover-tip__count">{{index + 1}}</span> {{tip}}</li>
        </ul>
      </div>
      <st-form labelWidth='60px'>
        <st-form-item  labelWidth='60px' label="复职日期">
          <a-input placeholder="支持中英文、数字,不超过10个字" />
        </st-form-item>
      </st-form>
    </section>
  </a-modal>
</template>
<script>
export default {
  name: 'Reinstatement',
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
