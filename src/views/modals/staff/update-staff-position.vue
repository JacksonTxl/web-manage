<template>
  <a-modal title='更改员工职位'
    confirmLoading
    @ok='onSubmit'
    v-model='show'>
    <section>
      <div class="staff-tag mg-b24">
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r8" type="role-staff"/>
      </div>
    </section>
    <st-form labelWidth='60px'>
      <st-form-item   label="工作性质">
        <a-input placeholder="支持中英文、数字,不超过10个字" />
      </st-form-item>
      <st-form-item label="教练等级">
        <a-input placeholder="支持中英文、数字,不超过10个字" />
      </st-form-item>
      <st-form-item  label="薪资模板">
        <a-input placeholder="支持中英文、数字,不超过10个字" class="mg-b8"/>
        <a-input placeholder="支持中英文、数字,不超过10个字" />
      </st-form-item>
    </st-form>
  </a-modal>
</template>
<script>
import { Updatepostion } from './update-staff-postiton.service'
export default {
  serviceInject() {
    return {
      updatepostion: Updatepostion
    }
  },
  name: 'UpdateStaffPosition',
  data() {
    return {
      show: false,
      formdata: null
    }
  },
  props: {
    staffId: {
      type: Number,
      default: -1
    }
  },
  methods: {
    onSubmit() {
      console.log('ok')
    }
  },
  mounted() {
    this.updatepostion.updateStaffPostion(this.staffId).subscribe(res => {
      this.formdata = res.position
      console.log('==============', this.formdata)
    })
  }
}
</script>
