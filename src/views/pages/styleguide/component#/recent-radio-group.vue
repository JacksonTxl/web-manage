<template>
  <section class="sg-section">
    <h3>st-recent-radio-group</h3>
    <p>报表筛选时常用</p>
    <div>
      <st-recent-radio-group @change="onChange"></st-recent-radio-group>
    </div>
  </section>
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
