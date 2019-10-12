<template>
  <st-mina-panel :class="bPage()">
    <div slot="view" :class="bPage('left')">
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
    <div slot="form" :class="bPage('right')">
      <a-steps :current="currentStep" size="small">
        <a-step
          v-for="(info, idx) in steps"
          @click="onClickStep(idx)"
          :key="idx"
          :title="info.title"
        />
      </a-steps>
      <div :class="bPage('form')">
        <step1-form
          v-if="currentStep === 0"
          @change="onChangeStep1Form"
        ></step1-form>
        <step2-form
          v-if="currentStep === 1"
          @change="onChangeStep2Form"
        ></step2-form>
        <step3-form
          v-if="currentStep === 2"
          @change="onChangeStep2Form"
        ></step3-form>
      </div>
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
export default {
  name: 'AddActivity',
  bem: {
    bPage: 'page-plugin-form-activity'
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
      step2Info: {},
      step3Info: {},
      steps: [
        { title: '活动信息' },
        { title: '票种信息' },
        { title: '报名信息' }
      ],
      currentStep: 0
    }
  },
  methods: {
    onChangeStep1Form(formObj) {
      this.step1Info = formObj
    },
    onClickStep(idx) {
      this.currentStep = idx
    }
  }
}
</script>
