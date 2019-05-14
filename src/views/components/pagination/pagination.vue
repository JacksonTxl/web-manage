<template>
  <a-pagination
    class="st-pagination mg-t24"
    :total="total"
    :pageSize="pageSize"
    :defaultCurrent="current"
    :showTotal="showTotal"
    :showSizeChanger="showSizeChanger"
    @change="onPageChange"
    @showSizeChange="onShowSizeChange"
  />
</template>

<script>
export default {
  name: 'StPagination',
  props: {
    page: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showSizeChanger: true,
      showTotal(total) {
        return `共${total}条`
      },
      current: 0,
      pageSize: 20,
      total: 0
    }
  },
  watch: {
    page(page) {
      this.initPage(page)
    }
  },
  created() {
    this.initPage(this.page)
  },
  methods: {
    initPage(page) {
      this.current = page.current_page
      this.pageSize = page.size
      this.total = page.total_counts
    },
    onPageChange(p) {
      this.$emit('change', p, this.pageSize)
    },
    onShowSizeChange(p, pageSize) {
      this.pageSize = pageSize
      this.$emit('change', p, pageSize)
    }
  }
}
</script>
