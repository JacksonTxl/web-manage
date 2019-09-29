<template>
  <st-mina-panel :class="bPage()">
    <div slot="view" :class="bPage('left')">
      <h5-container>
        <template v-slot:title>
          我的优惠券
        </template>
        <div>
          {{ stepInfo.name }}
        </div>
      </h5-container>
    </div>
    <div slot="form" :class="bPage('right')">
      <a-steps :current="1" size="small">
        <a-step title="活动信息" />
        <a-step title="票种信息" />
        <a-step title="报名信息" />
      </a-steps>
      <step1-form ref="step1" @change="onChangeStep1Form"></step1-form>
    </div>
  </st-mina-panel>
</template>
<script>
import H5Container from '@/views/biz-components/h5/h5-container'
import Step1Form from './components#/step1-form'
export default {
  name: 'AddActivity',
  bem: {
    bPage: 'page-plugin-form-activity'
  },
  components: {
    H5Container,
    Step1Form
  },
  data() {
    return {
      stepInfo: {}
    }
  },
  methods: {
    onChangeStep1Form(formObj) {
      this.stepInfo = formObj
    }
  }
}
</script>
