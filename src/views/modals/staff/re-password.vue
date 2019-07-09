<template>
  <st-modal class="modal-staff-delete"
    title='管理登录账号'
    @ok='onSubmit'
    size="small"
    :confirmLoading="openRepassword ? loading.getRePassword : loading.setAccount"
    v-model='show'>
    <staff-info :staff="staff"></staff-info>
    <div>
      <st-form :form="form">
        <st-form-item label="系统权限">
          <a-checkbox :checked="openJurisdiction" @change="changeJurisdiction">开通系统使用权限</a-checkbox>
        </st-form-item>
        <!-- 账号重置 -->
        <st-form-item label="登录账号" v-if="is_permission">
          <span>{{account.account_name}}</span>
          <span style="color: #1890FF" @click="onClickRePassword">重置密码</span>
        </st-form-item>
        <!-- 新账号注册 -->
        <st-form-item label="登录账号" v-if="is_creatAccount" required>
          <a-input placeholder="6～18个字符，可使用字母，数字，下划线" v-decorator="[
          'name',
          {rules: [{ required: true, message: '登录账号不能为空' }]}
        ]"/>
        </st-form-item>
        <st-form-item label="登录密码" v-if="is_creatAccount" required>
          <a-input type="password" v-decorator="['password', {rules: [{ required: true, message: '请输入物理ID' }]}
        ]" placeholder="6~15个字符，区分大小写"/>
        </st-form-item>
        <st-form-item label="确认密码" v-if="is_creatAccount" required>
          <a-input type="password" v-decorator="['repeat_password', {rules: [{ required: true, message: '请再次填写密码' }]}
        ]" placeholder="请再次填写密码"/>
        </st-form-item>
        <!-- 登录重置密码 -->
        <st-form-item label="登录密码" v-if="openRepassword" required>
          <a-input type="password" v-decorator="['password', {rules: [{ required: true, message: '请输入登录密码'}]}
        ]" placeholder="6~15个字符，区分大小写"/>
        </st-form-item>
        <st-form-item label="确认密码" v-if="openRepassword" required>
          <a-input type="password" v-decorator="['repeat_password', {rules: [{ required: true, message: '请再次填写密码' }]}
        ]" placeholder="请再次填写密码"/>
        </st-form-item>
        <!-- 绑定账号 -->
        <st-form-item label="账号绑定" v-if="bindAccount">
          <div v-if="account.wechat">
            <span>绑定微信号</span>
            <span>{{account.wechat}}</span>
          </div>
          <div v-if="account.mail">
            <span>绑定邮箱</span>
            <span>{{account.mail}}</span>
          </div>
          <div v-if="account.phone">
            <span>绑定手机</span>
            <span>{{account.phone}}</span>
          </div>
          <div v-if="account.QQ">
            <span>绑定qq</span>
            <span>{{account.QQ}}</span>
          </div>
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
  rxState() {
    return {
      loading: this.rePasswordService.loading$
    }
  },
  components: {
    StaffInfo
  },
  props: {
    staff: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      openJurisdiction: false, // 是否开启系统权限
      openRepassword: false, // 重置密码
      rePasswordInfo: {},
      show: false,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    account() {
      return this.rePasswordInfo && this.rePasswordInfo.account
    },
    is_permission() {
      return this.account && !!this.account.is_permission
    },
    is_creatAccount() {
      return !this.is_permission && this.openJurisdiction && !this.openRepassword
    },
    bindAccount() {
      return this.account && (this.account.wechat && this.account.mail && this.account.phone && this.account.QQ)
    }
  },
  mounted() {
    this.getStaffPassword()
  },
  methods: {
    changeJurisdiction(ev) {
      console.log('changeJurisdiction', ev)
      this.openJurisdiction = ev.target.checked
    },
    getStaffPassword() {
      this.rePasswordService.getRePassword(this.staff.id).subscribe(res => {
        this.rePasswordInfo = res
        this.form.setFieldsValue({
          name: res.account_name,
          password: res.password,
          repeat_password: res.repeat_password
        })
      })
    },
    onClickRePassword() {
      this.openRepassword = true
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        console.log('onSubmit', values)
        const form = { id: this.staff.id, ...values }
        if (!err) {
          if (this.is_creatAccount) {
            this.rePasswordService.setAccount(form).subscribe()
          } else {
            this.rePasswordService.rePassword(form).subscribe()
          }
        }
        this.show = false
      })
    }
  }
}
</script>
