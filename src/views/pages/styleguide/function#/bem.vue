<template>
  <section class="sg-section">
    <h3>bem辅助函数</h3>
    <div>
      <label>块 b()</label>
      {{ b() }}
    </div>
    <div>
      <label>块元素title b('title')</label>
      {{ b('title') }}
    </div>
    <div>
      <label>块元素desc b('desc')</label>
      {{ b('desc') }}
    </div>
    <div>
      <label>块元素title 并且为active状态 b('title',{active:true})</label>
      {{ b('title', { active: true }) }}
    </div>
    <div>
      <label>块状态为small b({small:true})</label>
      {{ b({ small: true }) }}
    </div>
  </section>
</template>
<script>
export default {
  bem: {
    b: 'page-dashboard'
  }
}
</script>

<style scoped>
label {
  display: inline-block;
  width: 350px;
  margin-right: 8px;
}
label:after {
  content: ' -> ';
}
</style>
