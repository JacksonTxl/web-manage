<template>
  <st-modal
    title="规则说明"
    v-model="show"
    @ok="handleOk"
    :footer="null"
  >
    <ul>
      <li v-for="(item, index) in contents" :key="index">{{item}}</li>
    </ul>
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
      type: Array,
      default: () => []
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
