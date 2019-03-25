<template>
  <svg v-if='!isAntIcon'
    class="oa-icon"
    aria-hidden="true">
    <use :xlink:href="linkHref">
    </use>
  </svg>
  <a-icon v-else
    :type='antType' />
</template>

<script>
export default {
  name: 'StIcon',
  props: {
    type: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    linkHref() {
      return `#icon-${this.type}`
    },
    isAntIcon() {
      return this.type.indexOf('anticon:') > -1
    },
    antType() {
      return this.type.split(':')[1]
    }
  }
}
</script>
