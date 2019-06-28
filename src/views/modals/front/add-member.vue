<template>
  <st-modal
  title="添加用户"
  size="small"
  v-model="show"
  wrapClassName="modal-front-add-member">
    <st-form :form="form" labelWidth="66px">
        <st-form-item label="用户姓名" required>
            <a-input
            v-decorator="['name',{rules:[{required: true,message:'请输入用户姓名'}]}]"
            placeholder="请输入用户姓名"></a-input>
        </st-form-item>
        <st-form-item label="手机号" required>
            <a-input
            v-decorator="['mobile',{rules:[{validator:mobile_validator}]}]"
            placeholder="请输入手机号"></a-input>
        </st-form-item>
    </st-form>
    <template slot="footer">
      <st-button @click="show=false">取消</st-button>
      <st-button @click="onSubmit" :loading="loading.addMember" type="primary">确定</st-button>
    </template>
  </st-modal>
</template>
<script>
import { AddMemberService } from './add-member.service'
import { RuleConfig } from '@/constants/rule'
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
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    mobile_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
                callback('请输入手机号')
      } else if (value && !this.rules.mobile.test(value)) {
        // eslint-disable-next-line
                callback('输入的手机号格式错误，请重新输入')
      } else {
        // eslint-disable-next-line
                callback()
      }
    },
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.addMemberService.addMember({
            member_name: values.name,
            mobile: values.mobile
          }).subscribe(res => {
            this.show = false
            this.$emit('success', { id: res.info.member_id })
          })
        }
      })
    }
  }
}
</script>
