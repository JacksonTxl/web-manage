<template>
  <st-modal
    class="modal-staff-delete"
    title="管理登录账号"
    @ok="onSubmit"
    size="small"
    :confirmLoading="
      openRepassword ? loading.getRePassword : loading.setAccount
    "
    v-model="show"
  >
    <staff-info :staff="staff"></staff-info>
    <div>
      <st-form :form="form">
        <st-form-item label="系统权限">
          <a-checkbox
            :checked="openJurisdiction"
            @change.stop="changePermission"
          >
            开通系统使用权限
          </a-checkbox>
        </st-form-item>
        <!-- 账号重置 -->
        <st-form-item label="登录账号" v-if="hasAccountName">
          <span>{{ rePasswordInfo.account_name }}</span>
          <span style="color: #1890FF" @click="onClickRePassword">
            重置密码
          </span>
        </st-form-item>
        <!-- 新账号注册 -->
        <st-form-item
          label="登录账号"
          v-show="!hasAccountName && openJurisdiction"
          required
        >
          <a-input
            placeholder="6～18个字符，可使用字母，数字，下划线"
            v-decorator="decorators.name"
            autocomplete="off"
          />
        </st-form-item>
        <st-form-item
          label="登录密码"
          v-show="!hasAccountName && openJurisdiction"
          required
        >
          <a-input
            type="password"
            autocomplete="new_password"
            v-decorator="decorators.password"
            placeholder="6~15个字符，区分大小写"
          />
        </st-form-item>
        <st-form-item
          label="确认密码"
          v-show="!hasAccountName && openJurisdiction"
          required
        >
          <a-input
            type="password"
            autocomplete="new_password"
            v-decorator="decorators.repeat_password"
            placeholder="请再次填写密码"
          />
        </st-form-item>
        <!-- 登录重置密码 -->
        <st-form-item label="登录密码" v-show="openRepassword" required>
          <a-input
            v-decorator="decorators.password"
            placeholder="6~15个字符，区分大小写"
            type="password"
            autocomplete="new_password"
          />
        </st-form-item>
        <st-form-item label="确认密码" v-show="openRepassword" required>
          <a-input
            v-decorator="decorators.repeat_password"
            placeholder="请再次填写密码"
            type="password"
            autocomplete="new_password"
          />
        </st-form-item>
        <!-- 绑定账号 -->
        <st-form-item label="账号绑定" v-if="bindAccount">
          <div v-if="rePasswordInfo.wechat">
            <span>绑定微信号</span>
            <span>{{ rePasswordInfo.wechat }}</span>
          </div>
          <div v-if="rePasswordInfo.mail">
            <span>绑定邮箱</span>
            <span>{{ rePasswordInfo.mail }}</span>
          </div>
          <div v-if="rePasswordInfo.phone">
            <span>绑定手机</span>
            <span>{{ rePasswordInfo.phone }}</span>
          </div>
          <div v-if="rePasswordInfo.QQ">
            <span>绑定qq</span>
            <span>{{ rePasswordInfo.QQ }}</span>
          </div>
        </st-form-item>
      </st-form>
    </div>
  </st-modal>
</template>

<script>
import StaffInfo from './staff-info'
import { RePasswordService } from './re-password.service'
import { ruleOptions } from './re-password.config'
export default {
  name: 'RePassword',
  serviceInject() {
    return {
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
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      openJurisdiction: false,
      openRepassword: false, // 重置密码
      show: false
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
      return (
        this.rePasswordInfo &&
        (this.rePasswordInfo.wechat &&
          this.rePasswordInfo.mail &&
          this.rePasswordInfo.phone &&
          this.rePasswordInfo.QQ)
      )
    }
  },
  mounted() {
    this.init()
  },
  methods: {
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
      this.form.validate().then(values => {
        const form = {
          id: this.staff.id,
          is_permission: +this.openJurisdiction,
          ...values
        }
        if (!this.hasAccountName) {
          if (values.name && values.password && values.repeat_password) {
            this.rePasswordService.setAccount(form).subscribe(() => {
              this.show = false
            })
          } else {
            this.rePasswordService
              .updatepermission(this.staff.id, {
                is_permission: +this.openJurisdiction
              })
              .subscribe(() => {
                this.show = false
              })
          }
        } else {
          if (values.password && values.repeat_password) {
            this.rePasswordService.rePassword(form).subscribe(() => {
              this.show = false
            })
          } else {
            this.rePasswordService
              .updatepermission(this.staff.id, {
                is_permission: +this.openJurisdiction
              })
              .subscribe(() => {
                this.show = false
              })
          }
        }
      })
    }
  }
}
</script>
