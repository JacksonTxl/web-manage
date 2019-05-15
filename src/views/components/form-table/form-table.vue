<template>
  <a-spin :spinning="loading">
    <table :class="b({striped,hoverable})">
      <slot></slot>
    </table>
    <st-pagination v-if="page.total_counts" :page="page" @change="onChange"/>
  </a-spin>
</template>

<script>
export default {
  name: 'StFormTable',
  bem: {
    b: 'st-form-table'
  },
  props: {
    hoverable: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    onChange(current, pageSize) {
      this.$emit('change', {
        current,
        pageSize
      })
    }
  }
}
</script>
