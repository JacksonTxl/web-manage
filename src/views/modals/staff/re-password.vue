<template>
  <st-modal class="modal-staff-delete"
    title='管理登录账号'
    @ok='onSubmit'
    size="small"
    v-model='show'>
    <staff-info :staff="staff"></staff-info>
    {{rePasswordInfo.QQ}}
    <div>
      <st-form>
        <st-form-item label="系统权限">
          <a-radio v-model="isSetAccount">开通系统使用权限</a-radio>
        </st-form-item>
        <st-form-item label="登录账号" v-if="rePasswordInfo.is_permission">
          <span>{{rePasswordInfo.account_name}}</span>
          <a href="javascript:;" @click="onClickRePassword">重置密码</a>
        </st-form-item>
        <st-form-item label="绑定微信号" v-if="rePasswordInfo.wechat">
          <span>{{rePasswordInfo.wechat?'已绑定':'未绑定'}}</span>
        </st-form-item>
        <st-form-item label="绑定邮箱" v-if="rePasswordInfo.mail">
          <span>{{rePasswordInfo.mail}}</span>
        </st-form-item>
        <st-form-item label="绑定手机" v-if="rePasswordInfo.phone">
          <span>{{rePasswordInfo.phone}}</span>
        </st-form-item>
        <st-form-item label="绑定qq" v-if="rePasswordInfo.QQ">
          <span>{{rePasswordInfo.QQ?'已绑定':'未绑定'}}</span>
        </st-form-item>
      </st-form>
      <st-form v-show="isSetAccount" labelWidth='88px' :form="form" class="modal-bind-entity-card__form">
        <st-form-item v-if="!rePasswordInfo.is_permission" label="登录账号" required >
          <a-input placeholder="6～18个字符，可使用字母，数字，下划线" v-decorator="[
          'name',
          {rules: [{ required: true, message: '登录账号不能为空' }]}
        ]"/>
        </st-form-item>
        <st-form-item label="登录密码" required>
          <a-input type="password" v-decorator="[
          'password',
          {rules: [{ required: true, message: '请输入物理ID' }], initialValue: rePasswordInfo.password}
        ]" placeholder="6~15个字符，区分大小写"/>
        </st-form-item>
        <st-form-item label="确认密码" required>
          <a-input type="password" v-decorator="[
          'repeat_password',
          {rules: [{ required: true, message: '请输入物理ID' }], initialValue: rePasswordInfo.repeat_password}
        ]" placeholder="请再次填写密码"/>
        </st-form-item>
      </st-form>
    </div>

  </st-modal>
</template>

<script>
import StaffInfo from './staff-info'
import { RePasswordService } from './re-password.service'
export default {
  name: 'RePassword',
  serviceInject() {
    return {
      rePasswordService: RePasswordService
    }
  },
  props: {
    staff: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    StaffInfo
  },
  data() {
    return {
      isSetAccount: 0,
      show: false,
      form: this.$form.createForm(this),
      rePasswordInfo: {}
    }
  },
  // watch: {
  //   rePasswordInfo(newVal) {
  //     this.isSetAccount = !!newVal.is_permission
  //   }
  // },
  computed() {

  },
  methods: {
    getPasswordInfo() {
      this.rePasswordService.getRePassword(this.staff.id).subscribe(res => {
        this.rePasswordInfo = res.account
      })
    },
    onClickRePassword() {
      this.isSetAccount = true
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        const form = { id: this.staff.id, ...values }
        if (!err) {
          if (this.rePasswordInfo.is_permission) {
            this.rePasswordService.rePassword(form).subscribe()
          } else {
            this.rePasswordService.setAccount(form).subscribe()
          }
        }
        this.show = false
      })
    }
  },
  mounted() {
    this.getPasswordInfo()
  }
}
</script>

<style lang="scss" scoped>

</style>
