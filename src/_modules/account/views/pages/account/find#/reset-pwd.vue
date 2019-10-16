<template>
  <div :class="b()">
    <st-form :form="form" @submit.prevent="next" :class="b('form')">
      <st-form-item>
        <input-pwd-strength
          v-decorator="decorators.pwd"
          placeholder="请输入新密码"
          :validStatus="validStatus"
          :strength="strength"
        ></input-pwd-strength>
      </st-form-item>
      <st-form-item>
        <a-input
          size="large"
          type="password"
          placeholder="请再输入一次新密码"
          v-decorator="decorators.repeat_pwd"
        />
      </st-form-item>
      <st-form-item :class="b('button-wrap')">
        <st-button
          :class="b('button')"
          :loading="loading.repairPwd"
          pill
          block
          size="large"
          type="primary"
          html-type="submit"
        >
          确认
        </st-button>
      </st-form-item>
    </st-form>
  </div>
</template>

<script>
import { FindService } from '../find.service'
import { ruleOptions } from './find.config'
import { PatternService } from '@/services/pattern.service'
import InputPwdStrength from '@/views/biz-components/input-pwd-strength/input-pwd-strength'

export default {
  bem: {
    b: 'page-find-account-reset-pwd'
  },
  name: 'FindAccountResetPwd',
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
  components: {
    InputPwdStrength
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      validStatus: 0,
      strength: ''
    }
  },
  methods: {
    next() {
      this.form.validate().then(values => {
        this.$emit('reset', values)
      })
    }
  }
}
</script>
