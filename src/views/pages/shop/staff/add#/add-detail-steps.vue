<template>
    <a-steps :current="currentIndex">
        <a-step title="基础信息" />
        <a-step title="详细信息" />
        <a-step title="教练信息" />
    </a-steps>
</template>
<script>
export default {
  name: 'AddStep',
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>
