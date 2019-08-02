<template>
  <div>
    <a-pagination
      :pageSizeOptions="value.pageSizeOptions"
      :total="value.total"
      showSizeChanger
      :pageSize="value.pageSize"
      v-model="value.current"
      @showSizeChange="onShowSizeChange"
      :showTotal="total => `共 ${total} 条`"
      @change="onShowSizeChange1"
      v-if="value.total"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span>{{ props.value }}条/页</span>
      </template>
    </a-pagination>
  </div>
</template>
<script>
export default {
  model: {
    type: 'value',
    event: 'dataChange'
  },
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    onShowSizeChange(a, b) {
      this.value.current = a
      this.value.pageSize = b
      this.$emit('dataChange', this.value)
    },
    onShowSizeChange1(a, b, c) {
      this.value.current = a
      this.value.pageSize = b
      this.$emit('dataChange', this.value)
    }
  }
}
</script>
