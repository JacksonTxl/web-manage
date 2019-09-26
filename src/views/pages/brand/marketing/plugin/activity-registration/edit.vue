<template>
  <st-panel app :class="bPage()" initial>
    <div :class="bPage('left')">
      <h5-container>
        <template v-slot:title>
          我的优惠券
        </template>
      </h5-container>
    </div>
    <div :class="bPage('right')">
      <a-steps :current="1" size="small">
        <a-step title="活动信息" />
        <a-step title="票种信息" />
        <a-step title="报名信息" />
      </a-steps>
    </div>
  </st-panel>
</template>
<script>
import H5Container from '@/views/biz-components/h5/h5-container'
export default {
  name: 'EditActivity',
  bem: {
    bPage: 'page-plugin-form-activity'
  },
  components: {
    H5Container
  }
}
</script>
