<template>
  <section class="sg-section">
    <h3>pagination</h3>
    <st-pagination :page="page" @change="onChange"/>
  </section>
</template>
<script>
export default {
  data() {
    return {
      page: {
        current_page: 1,
        size: 20,
        total_counts: 100,
        total_pages: 5
      }
    }
  },
  methods: {
    onChange(current, size) {
      console.log('current page and page size:', current, size)
    }
  }
}
</script>
