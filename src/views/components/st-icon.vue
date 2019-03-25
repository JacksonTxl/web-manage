<template>
  <svg v-if='!isAntIcon'
    class="st-icon"
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
      return `#sticon-${this.type}`
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
