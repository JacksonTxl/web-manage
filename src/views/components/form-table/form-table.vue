<template>
  <a-spin :spinning="loading">
    <table :class="b({ striped, hoverable })">
      <slot></slot>
    </table>
    <div v-if="isNoData">
      <st-no-data />
      <st-hr></st-hr>
    </div>
    <st-pagination v-if="page.total_counts" :page="page" @change="onChange" />
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
    },
    isEmpty: {
      type: [Boolean, Number],
      default: false
    }
  },
  computed: {
    isNoData() {
      return this.isEmpty || this.page.total_counts === 0
    }
  },
  methods: {
    onChange(pagination) {
      this.$emit('change', pagination)
    }
  }
}
</script>
