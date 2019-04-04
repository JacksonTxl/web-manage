<template>
    <a-steps :current="value">
        <a-step  v-for="(item,index) in stepArr" :title="item.title" :key="item.key" @click="skip(index)"/>
    </a-steps>
</template>
<script>
export default {
  name: 'StSteps',
  props: {
    stepArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    skip(idx) {
      this.$emit('skip', {
        index: idx
      })
    }
  }
}
</script>
