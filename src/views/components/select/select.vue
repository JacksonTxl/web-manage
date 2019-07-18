<template>
  <div :class="select()">
    <a-select
     v-bind="$attrs"
     v-on="$listeners"
     @change="onChange">
      <a-select-option
        v-for="(item, index) in list"
        :key="index"
        :value="item.value"
      >{{item.label}}</a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  name: 'StSelect',
  bem: {
    select: 'st-select'
  },
  data() {
    return {
      radioChecked: null
    }
  },
  // model: {
  //   prop: 'checked',
  //   event: 'change'
  // },
  // watch: {
  //   checked(newVal) {
  //     this.radioChecked = newVal
  //   }
  // },
  created() {
  },
  methods: {
    onChange(data) {
      console.log(data)
      this.selected = data
      this.$emit('change', this.data)
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    selected: {
      type: Number || String,
      default() {
        return 0
      }
    }
  }
}
</script>
