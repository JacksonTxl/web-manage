
<template>
  <div>
    <st-t4 style="margin-bottom:16px">{{value.title}}</st-t4>
    <div
      style="display: flex;justify-content: space-between; padding-bottom:16px;   flex-direction: row;    flex-wrap: wrap;"
    >
      <st-button
        :style="{width:value.width+'px',marginBottom: '16px'}"
        :class="value.selectionData.indexOf(item)>=0?'active':''"
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
    value: {
      type: Object
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    selectionFun(item) {
      if (this.value.selectionData.indexOf(item) < 0) {
        if (this.flag) {
          this.value.selectionData.push(item)
        }
      } else {
        this.value.selectionData.splice(
          this.value.selectionData.indexOf(item),
          1
        )
      }
      this.$emit('dataChangge', this.value)
    }
  },
  mounted() {}
}
</script>
