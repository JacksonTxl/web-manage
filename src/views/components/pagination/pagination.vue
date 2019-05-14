<template>
  <a-pagination
    class="st-pagination"
    :total="total"
    :pageSize="size"
    :defaultCurrent="defaultCurrent"
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
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 20
    },
    defaultCurrent: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      showSizeChanger: true,
      showTotal(total) {
        return `共${total}条`
      },
      size: 20
    }
  },
  methods: {
    onPageChange(p) {
      this.$emit('change', p, this.size)
    },
    onShowSizeChange(p, size) {
      this.size = size
      this.$emit('change', p, size)
    }
  }
}
</script>
