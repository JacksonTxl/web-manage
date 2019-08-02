<template>
  <svg
    v-if="!isAntIcon"
    class="st-icon"
    :style="{ 'font-size': size, color: color }"
    aria-hidden="true"
  >
    <use :xlink:href="linkHref"></use>
  </svg>
  <a-icon v-else v-on="$listeners" :type="antType" />
</template>

<script>
export default {
  name: 'StIcon',
  props: {
    type: {
      type: String,
      required: true,
      default: ''
    },
    size: {
      type: String,
      default: '1em'
    },
    color: {
      type: String,
      default: 'currentColor'
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
