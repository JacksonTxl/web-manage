<template>
  <div :class="b()">
    <p :class="b('tip')">
      正在为账号名{{
        bindInfo.account
      }}找回密码，为确实是您本人操作，请完成以下身份验证：
    </p>
    <div v-if="bindInfo.is_bind === IS_BIND.NO_BIND">
      <p :class="b('update-text')">如需修改密码，请联系管理员</p>
      <p class="mg-b8">
        您当前暂未绑定手机号码,
        <a @click="goBind">
          去绑定
        </a>
      </p>
    </div>
    <div :class="b('bind-info')" v-if="bindInfo.is_bind === IS_BIND.BIND">
      <p class="mg-b8">当前绑定手机号：{{ bindInfo.phone }}</p>
      <p :class="b('bind-waring')">手机号码若已停用，联系管理人员修改密码</p>
    </div>

    <st-form
      v-if="bindInfo.is_bind === IS_BIND.BIND"
      :form="form"
      @submit.prevent="next"
      :class="b('form')"
    >
      <st-form-item>
        <input-phone-code
          v-decorator="decorators.captcha"
          @click="getCaptcha"
          placeholder="请输入验证码"
          :isCountTime="isCountTime"
          @endCount="endCount"
        ></input-phone-code>
      </st-form-item>
      <st-form-item :class="b('button-wrap')">
        <st-button
          :class="b('button')"
          :loading="loading.checkCaptcha"
          pill
          block
          size="large"
          type="primary"
          html-type="submit"
        >
          下一步
        </st-button>
      </st-form-item>
    </st-form>
  </div>
</template>

<script>
import { FindService } from '../find.service'
import { ruleOptions } from './find.config'
import { PatternService } from '@/services/pattern.service'
import InputPhoneCode from '@/views/biz-components/input-phone-code/input-phone-code'
import { IS_BIND } from '@/constants/account'

export default {
  bem: {
    b: 'page-find-account-valid-id'
  },
  name: 'FindAccountValidId',
  components: {
    InputPhoneCode
  },
  serviceInject() {
    return {
      findService: FindService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.findService.loading$
    }
  },
  props: {
    isBind: Boolean,
    bindInfo: {
      type: Object
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      IS_BIND,
      form,
      decorators,
      isCountTime: false
    }
  },
  methods: {
    getCaptcha() {
      const params = {
        account: this.bindInfo.account
      }
      this.findService.sendCaptcha(params).subscribe(res => {
        this.isCountTime = true
      })
    },
    endCount() {
      this.isCountTime = false
    },
    next() {
      this.form.validate().then(values => {
        values.account = this.bindInfo.account
        this.$emit('next', values)
      })
    },
    goBind() {
      this.$router.push({
        path: '/account/login',
        query: {
          isBind: true
        }
      })
    }
  }
}
</script>
