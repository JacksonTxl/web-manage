<template>
  <section class="sg-section">
    <h3>st-input-search</h3>
    <p>
      属性和a-input-search一致，只是变更了样式
    </p>
    <div>
      <st-input-search @search="onSearch" />
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    onSearch(data) {
      console.log(data)
    }
  }
}
</script>
