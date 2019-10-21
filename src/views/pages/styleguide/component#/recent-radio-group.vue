<template>
  <div>
    <p>报表筛选时常用</p>
    <div>
      <st-recent-radio-group @change="onChange"></st-recent-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onChange(model) {
      console.log(model)
    }
  }
}
</script>
