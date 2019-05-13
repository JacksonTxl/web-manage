<template>
  <st-modal title="添加预约" @ok="save" v-model="show">
    <st-form :form="form">
      <st-form-item label="会员名称" required>
        <a-auto-complete
        :dataSource="memberList"
        style="width: 200px"
        placeholder="input here"
        @change="onChange"/>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select @change="onChange" />
      </st-form-item>
      <st-form-item label="消费方式" required>
        <a-select @change="onChange" />
      </st-form-item>
      <st-form-item label="上课教练" required>
        <a-select @change="onChange" />
      </st-form-item>
      <st-form-item label="预约时间" required>

        <a-date-picker @change="onChange" />
      </st-form-item>
    </st-form>
  </st-modal>
</template>

<script>
import { ScheduleService } from './schedule.service.ts'
export default {
  name: 'AddOrder',
  serviceInject() {
    return {
      scheduleService: ScheduleService
    }
  },
  rxState() {
    return {
      loading: this.scheduleService.loading$
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      memberList: []
    }
  },
  methods: {
    onChange(val) {
      this.scheduleService.getMemberByMemberName({ member_name: val }).subscribe(res => {
        this.memberList = res.list
      })
    },
    save() {
      this.emit('')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
