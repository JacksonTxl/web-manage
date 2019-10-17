<template>
  <div :class="b()">
    <a-steps :current="currentIndex">
      <a-step
        v-for="item in stepArr"
        :key="item.key"
        :title="item.title"
        class="cursor-pointer"
      />
      <!-- NOTE: 不支持切换步骤 -->
      <!-- @click="changeStep(item.key)" -->
    </a-steps>
    <valid-id
      v-if="currentIndex === 0"
      :bindInfo="bindInfo"
      @next="onNext"
    ></valid-id>
    <reset-pwd v-if="currentIndex === 1" @reset="onReset"></reset-pwd>
    <div v-if="currentIndex === 2" class="compelete">
      <st-icon type="success" class="compelete-img" color="#01ca92" />
      <p class="compelete-text">密码更新成功</p>
      <st-button
        type="primary"
        class="compelete-button"
        size="large"
        @click="goLogin"
      >
        立即登录
      </st-button>
    </div>
  </div>
</template>

<script>
import { FindService } from '../find.service'
import { ruleOptions } from './find.config'
import { PatternService } from '@/services/pattern.service'
import { stepArr } from './step.config'
import ValidId from './valid-id'
import ResetPwd from './reset-pwd'

export default {
  bem: {
    b: 'page-find-account-step'
  },
  name: 'FindAccountStep',
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
    bindInfo: {
      type: Object
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      stepArr,
      currentIndex: 0
    }
  },
  components: {
    ValidId,
    ResetPwd
  },
  methods: {
    changeStep(event) {
      this.currentIndex = event
    },
    onNext(params) {
      this.findService.checkCaptcha(params).subscribe(res => {
        this.currentIndex = 1
      })
    },
    onReset(params) {
      params.account = this.bindInfo.account
      this.findService.repairPwd(params).subscribe(res => {
        this.currentIndex = 2
      })
    },
    goLogin() {
      this.$router.push({
        path: '/account/login'
      })
    }
  }
}
</script>
