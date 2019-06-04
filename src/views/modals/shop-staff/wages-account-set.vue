<template>
  <st-modal title="工资账户设置" size="small" v-model="show" @ok="onSubmit">
    <section>
      <div >
         <template v-for="item in data.identity">
          <st-tag :key="item" v-if="item === 4" class="mg-r4" type="coach-personal"/>
          <st-tag :key="item" v-if="item === 3" class="mg-r4" type="coach-team"/>
          <st-tag :key="item" v-if="item === 1" class="mg-r4" type="role-staff"/>
          <st-tag :key="item" v-if="item === 2" class="mg-r4" type="role-saler"/>
        </template>
        <span>{{ data.staff_name }}</span>
      </div>
    </section>
    <section>
      <st-form
        labelWidth="66px"
        :form="form"
        @submit="onSubmit"
        class="mg-t24"
      >
      <st-form-item label="姓名" required>
          <a-input placeholder="请输入姓名" v-decorator="['account_name',{ rules: [{ required: true, message: '请输入姓名' }]}]"/>
        </st-form-item>
        <st-form-item label="银行卡号" required>
          <a-input placeholder="请输入银行卡号" v-decorator="['card_number',{ rules: [{ required: true, message: '请输入银行卡号' }]}]"/>
        </st-form-item>
        <st-form-item label="开户银行" required>
          <a-input placeholder="请输入开户银行" v-decorator="['bank_name',{ rules: [{ required: true, message: '请输入开户银行' }]}]"/>
        </st-form-item>
      </st-form>
    </section>
  </st-modal>
</template>
<script>

import { BindService } from './bind.service'
import { MessageService } from '@/services/message.service'

export default {
  serviceInject() {
    return {
      service: BindService,
      message: MessageService
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.service.bindbank(this.data.id, values).subscribe(res => {
            this.message.success({ content: '绑卡成功' })
            this.show = false
          })
        }
      })
    }
  }
}
</script>
