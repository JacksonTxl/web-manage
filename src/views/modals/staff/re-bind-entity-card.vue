<template>
  <a-modal title='重新绑定实体卡'
    confirmLoading
    @ok='onSubmit'
    v-model='show'>
    <section>
      <div class="staff-tag">
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r8" type="role-staff"/>
      </div>
    </section>
    <section>
      <div class="staff-tip-containerb">
          <div class="staff-tip-container__itemb">
             <span class="staff-tip-container__sameb">当前绑定实体卡号：</span>23456783435</div>
          <div class="staff-tip-container__itemb">
            <span class="staff-tip-container__sameb">当前物理ID：</span>213212</div>
      </div>
    </section>
    <section>
      <st-form :form="form" @submit="save" class="page-add-container">
        <st-form-item label="实体卡号" >
          <a-input placeholder="请输入实体卡号"  v-decorator="entityCardIdRule"/>
        </st-form-item>
        <st-form-item label="物理ID" class="mg-b0">
          <a-input placeholder="请将实体卡置于读卡器上" v-decorator="physicalIdRule"/>
        </st-form-item>
      </st-form>
    </section>
  </a-modal>
</template>
<script>
export default {
  name: 'ReBindEntityCard',
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
