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
          <a-checkbox :checked="openJurisdiction" @change.stop="changePermission">开通系统使用权限</a-checkbox>
        </st-form-item>
        <!-- 账号重置 -->
        <st-form-item label="登录账号" v-if="hasAccountName">
          <span>{{rePasswordInfo.account_name}}</span>
          <span style="color: #1890FF" @click="onClickRePassword">重置密码</span>
        </st-form-item>
        <!-- 新账号注册 -->
        <st-form-item label="登录账号" v-if="!hasAccountName && openJurisdiction" required>
          <a-input placeholder="6～18个字符，可使用字母，数字，下划线" v-decorator="rules.name"/>
        </st-form-item>
        <st-form-item label="登录密码" v-if="!hasAccountName && openJurisdiction" required>
          <a-input type="password" v-decorator="['password', { rules: [{validator: validatorPassword}]
          }]" placeholder="6~15个字符，区分大小写"/>
        </st-form-item>
        <st-form-item label="确认密码" v-if="!hasAccountName && openJurisdiction" required>
          <a-input type="password" v-decorator="['repeat_password', { rules: [{validator: validatorPassword}] }]" placeholder="请再次填写密码"/>
        </st-form-item>
        <!-- 登录重置密码 -->
        <st-form-item label="登录密码" v-if="openRepassword" required>
          <a-input type="password" v-decorator="['password', { rules: [{validator: validatorPassword}]
          }]" placeholder="6~15个字符，区分大小写"/>
        </st-form-item>
        <st-form-item label="确认密码" v-if="openRepassword" required>
          <a-input type="password" v-decorator="['repeat_password', { rules: [{validator: validatorPassword}] }]" placeholder="请再次填写密码"/>
        </st-form-item>
        <!-- 绑定账号 -->
        <st-form-item label="账号绑定" v-if="bindAccount">
          <div v-if="rePasswordInfo.wechat">
            <span>绑定微信号</span>
            <span>{{rePasswordInfo.wechat}}</span>
          </div>
          <div v-if="rePasswordInfo.mail">
            <span>绑定邮箱</span>
            <span>{{rePasswordInfo.mail}}</span>
          </div>
          <div v-if="rePasswordInfo.phone">
            <span>绑定手机</span>
            <span>{{rePasswordInfo.phone}}</span>
          </div>
          <div v-if="rePasswordInfo.QQ">
            <span>绑定qq</span>
            <span>{{rePasswordInfo.QQ}}</span>
          </div>
        </st-form-item>
      </st-form>
    </div>
  </st-modal>
</template>

<script>
import StaffInfo from './staff-info'
import { RePasswordService } from './re-password.service'
import { RuleConfig } from '@/constants/staff/rule'

export default {
  name: 'RePassword',
  serviceInject() {
    return {
      rules: RuleConfig,
      rePasswordService: RePasswordService
    }
  },
  rxState() {
    return {
      loading: this.rePasswordService.loading$,
      rePasswordInfo: this.rePasswordService.rePasswordInfo$
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
      openJurisdiction: false,
      openRepassword: false, // 重置密码
      show: false,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    is_permission() {
      return this.rePasswordInfo.is_permission
    },
    hasAccountName() {
      return this.rePasswordInfo.account_name
    },
    bindAccount() {
      return this.rePasswordInfo && (this.rePasswordInfo.wechat && this.rePasswordInfo.mail && this.rePasswordInfo.phone && this.rePasswordInfo.QQ)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    validatorPassword(rule, value, callback) {
      console.log('value', value)
      if (value === undefined || value === '') {
        // eslint-disable-next-line
        callback('请输入登录密码')
      } else if (value.length < 6 || value.length > 15) {
        // eslint-disable-next-line
        callback('请输入正确格式登录密码')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    validatorRePassword(rule, value, callback) {
      if (value === undefined || value === '') {
        // eslint-disable-next-line
        callback('请输入登录密码')
      } else if (value.length < 6 || value.length > 15) {
        // eslint-disable-next-line
        callback('请输入正确格式登录密码')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    changePermission(e) {
      this.openJurisdiction = e.target.checked
    },
    init() {
      this.rePasswordService.getRePassword(this.staff.id).subscribe(res => {
        res = res.account
        this.openJurisdiction = !!res.is_permission
        let form = {
          password: res.password,
          repeat_password: res.repeat_password
        }
        if (this.hasAccountName) {
          form = Object.assign(form, {
            name: res.account_name
          })
        }
        this.form.setFieldsValue(form)
      })
    },
    onClickRePassword() {
      this.openRepassword = true
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('onSubmit', values)
          const form = { id: this.staff.id, is_permission: +this.openJurisdiction, ...values }
          // 未创建账号
          console.log('hasAccountName', this.hasAccountName)
          if (!this.hasAccountName) {
            if (values.name && values.password && values.repeat_password) {
              this.rePasswordService.setAccount(form).subscribe(() => {
                this.show = false
              })
            } else {
              this.rePasswordService.updatepermission(this.staff.id, {
                is_permission: +this.openJurisdiction
              }).subscribe(() => {
                this.show = false
              })
            }
          } else {
            // 填写了账号
            if (values.password && values.repeat_password) {
              this.rePasswordService.rePassword(form).subscribe(() => {
                this.show = false
              })
            } else {
              this.rePasswordService.updatepermission(this.staff.id, {
                is_permission: +this.openJurisdiction
              }).subscribe(() => {
                this.show = false
              })
            }
          }
        }
      })
    }
  }
}
</script>
