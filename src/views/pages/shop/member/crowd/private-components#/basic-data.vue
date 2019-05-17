
<template>
  <div>
    <st-t4 style="margin-bottom:16px">{{value.title}}</st-t4>
    <div
      style="display: flex;justify-content: space-between; padding-bottom:16px;   flex-direction: row;    flex-wrap: wrap;"
    >
      <st-button
        :style="{width:value.width+'px',marginBottom: '16px'}"
        :class="value.selectionData ===item ?'active':''"
        v-for="(item,index) in value.value"
        :key="index"
        @click="selectionFun(item)"
      >{{item}}</st-button>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    type: 'value',
    event: 'dataChangge'
  },
  props: {
    value: Object
  },
  data() {
    return {}
  },
  methods: {
    selectionFun(item) {
      this.value.selectionData = item
      this.$emit('dataChangge', this.value)
    }
  },
  mounted() {}
}
</script>
