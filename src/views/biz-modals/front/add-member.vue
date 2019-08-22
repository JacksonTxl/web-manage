<template>
  <st-modal
    title="添加用户"
    v-model="show"
    width="484px"
    wrapClassName="modal-front-add-member"
  >
    <st-form :form="form" labelWidth="66px">
      <st-form-item label="用户姓名" required>
        <a-input
          v-decorator="decorators.name"
          placeholder="请输入用户姓名"
        ></a-input>
      </st-form-item>
      <st-form-item label="手机号" required>
        <a-input
          v-decorator="decorators.mobile"
          placeholder="请输入手机号"
        ></a-input>
      </st-form-item>
    </st-form>
    <template slot="footer">
      <st-button @click="show = false">取消</st-button>
      <st-button @click="onSubmit" :loading="loading.addMember" type="primary">
        确定
      </st-button>
    </template>
  </st-modal>
</template>
<script>
import { AddMemberService } from './add-member.service'
import { RuleConfig } from '@/constants/rule'
import { ruleOptions } from './add-member.config'
export default {
  name: 'ModalShopFrontAddMember',
  bem: {
    add: 'modal-front-add-member'
  },
  serviceInject() {
    return {
      rules: RuleConfig,
      addMemberService: AddMemberService
    }
  },
  rxState() {
    return {
      loading: this.addMemberService.loading$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        this.addMemberService
          .addMember({
            member_name: values.name,
            mobile: values.mobile
          })
          .subscribe(res => {
            this.show = false
            this.$emit('success', {
              id: res.info.member_id,
              name: values.name
            })
          })
      })
    }
  }
}
</script>
