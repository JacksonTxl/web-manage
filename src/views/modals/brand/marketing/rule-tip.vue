<template>
  <st-modal
    title="规则说明"
    v-model="show"
    @ok="handleOk"
    :footer="null"
  >
    <p v-html="contents"></p>
  </st-modal>
</template>
<script>
export default {
  name: 'BrandMarketingRuleTip',
  serviceInject() {
    return {
    }
  },
  props: {
    contents: {
      type: String
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {
  },
  methods: {
    handleOk() {
      this.show = false
    }
  }
}
</script>
