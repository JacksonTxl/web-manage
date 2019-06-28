<template>
  <st-modal
    title="分享海报"
    v-model="show"
    @ok="handleOk"
    :footer="null"
  >
    <div>

    </div>
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
      default: () => {
        return ['1、客户可以凭券抵扣相同面值的现金', '2、客户可以凭券抵扣相同面值的现金', '3、客户可以凭券抵扣相同面值的现金']
      }
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
