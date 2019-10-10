<template>
  <st-mina-panel :class="bPage()">
    <div slot="view" :class="bPage('left')">
      <h5-view :stepInfo="stepInfo"></h5-view>
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
      <st-t3>1</st-t3>
      <step1-form
        v-if="currentStep === 0"
        @change="onChangeStep1Form"
      ></step1-form>
      <st-t3>2</st-t3>
      <step2-form
        v-if="currentStep === 1"
        @change="onChangeStep2Form"
      ></step2-form>
      <st-t3>3</st-t3>
      <step3-form
        v-if="currentStep === 2"
        @change="onChangeStep2Form"
      ></step3-form>
    </div>
  </st-mina-panel>
</template>
<script>
import Step1Form from './components#/step1-form'
import Step2Form from './components#/step2-form'
import Step3Form from './components#/step3-form'
import H5View from './components#/h5-view'
export default {
  name: 'AddActivity',
  bem: {
    bPage: 'page-plugin-form-activity'
  },
  components: {
    H5View,
    Step1Form,
    Step3Form,
    Step2Form
  },
  data() {
    return {
      stepInfo: {},
      steps: [
        { title: '活动信息' },
        { title: '活动信息' },
        { title: '活动信息' }
      ],
      currentStep: 0
    }
  },
  methods: {
    onChangeStep1Form(formObj) {
      this.stepInfo = formObj
    },
    onClickStep(idx) {
      this.currentStep = idx
    }
  }
}
</script>
