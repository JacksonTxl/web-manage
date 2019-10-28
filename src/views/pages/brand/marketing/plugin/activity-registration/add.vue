<template>
  <st-mina-panel :class="bPage()">
    <div slot="preview">
      <activity-h5-view
        v-if="currentStep === 0"
        :stepInfo="step1Info"
      ></activity-h5-view>
      <ticket-h5-view
        v-if="currentStep === 1"
        :stepInfo="step2Info"
      ></ticket-h5-view>
      <signup-h5-view
        v-if="currentStep === 2"
        :stepInfo="step3Info"
      ></signup-h5-view>
    </div>
    <a-steps :current="currentStep" size="small">
      <a-step v-for="(info, idx) in steps" :key="idx" :title="info.title" />
    </a-steps>
    <div :class="bPage('form')">
      <step1-form
        v-show="currentStep === 0"
        :show="currentStep === 0"
        :isCopy="isCopy"
        :isEdit="isEdit"
        @step-submit="onSubmitGetStep1Form"
        @change="onChangeStep1Form"
      ></step1-form>
      <step2-form
        v-show="currentStep === 1"
        :show="currentStep === 1"
        :isCopy="isCopy"
        @back="onBack"
        :isEdit="isEdit"
        @step-submit="onSubmitGetStep2Form"
        @change="onChangeStep2Form"
      ></step2-form>
      <step3-form
        v-show="currentStep === 2"
        :show="currentStep === 2"
        :isCopy="isCopy"
        :isEdit="isEdit"
        @back="onBack"
        @release="onReleaseActivity"
        @save-draft="onSaveDraftActivity"
        @change="onChangeStep3Form"
      ></step3-form>
    </div>
    <div slot="actions">
      <di-view name="step"></di-view>
    </div>
  </st-mina-panel>
</template>
<script>
import Step1Form from './components#/step1-form'
import Step2Form from './components#/step2-form'
import Step3Form from './components#/step3-form'
import ActivityH5View from './components#/activity-h5-view'
import TicketH5View from './components#/ticket-h5-view'
import SignupH5View from './components#/signup-h5-view'
import { AddService } from './add.service'
export default {
  name: 'AddActivity',
  bem: {
    bPage: 'page-plugin-form-activity'
  },
  serviceInject() {
    return {
      service: AddService
    }
  },
  components: {
    ActivityH5View,
    TicketH5View,
    SignupH5View,
    Step1Form,
    Step3Form,
    Step2Form
  },
  data() {
    return {
      step1Info: {},
      step2Info: [],
      step3Info: [],
      stepForm: {},
      steps: [
        { title: '活动信息' },
        { title: '票种信息' },
        { title: '报名信息' }
      ],
      currentStep: 0
    }
  },
  props: {
    isCopy: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onBack(step) {
      this.currentStep = step
    },
    onChangeStep1Form(formObj) {
      this.step1Info = formObj
    },
    onChangeStep2Form(ticketList) {
      this.step2Info = [...ticketList]
    },
    onChangeStep3Form(signUpList) {
      this.step3Info = [...signUpList]
    },
    onSubmitGetStep1Form(form) {
      this.currentStep = 1
      this.stepForm = form
    },
    onSubmitGetStep2Form(form) {
      this.currentStep = 2
      this.$set(this.stepForm, 'tickets', form)
    },
    // 发布活动
    onReleaseActivity(form) {
      this.stepForm.is_draft = 0
      this.$set(this.stepForm, 'rule_settings', JSON.stringify(form))
      // 发布
      if (this.isEdit) {
        this.service.updateActivity(this.stepForm).subscribe(res => {
          this.$router.push({
            path: '/brand/marketing/plugin/activity-registration/success'
          })
        })
      } else if (this.isCopy) {
        this.service.copyActivity(this.stepForm).subscribe(res => {
          this.$router.push({
            path: '/brand/marketing/plugin/activity-registration/success'
          })
        })
      } else {
        this.service.addActivity(this.stepForm).subscribe(res => {
          this.$router.push({
            path: '/brand/marketing/plugin/activity-registration/success'
          })
        })
      }
    },
    // 存草稿
    onSaveDraftActivity(form) {
      debugger
      this.stepForm.is_draft = 1
      this.$set(this.stepForm, 'rule_settings', JSON.stringify(form))
      debugger
      this.service.releaseActivity(this.stepForm).subscribe()
    },
    onClickStep(idx) {
      this.currentStep = idx
    }
  }
}
</script>
