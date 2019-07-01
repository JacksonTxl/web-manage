<template>
  <div :class="rowcont()">
      <st-t4>{{title}}<span v-if="subTitle">{{subTitle}}</span></st-t4>
      <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'RowContainerComponent',
  props: {
    title: String,
    subTitle: String
  },
  bem: {
    rowcont: 'row-container-component'
  },
  methods: {
  }
}

</script>
