<template>
  <st-panel app>
    <draggable v-model='list' :move='onMove'>
        <li v-for='item in list' :key="item.id">
          {{item.name}}
        </li>
    </draggable>
  </st-panel>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  methods: {
    onMove(e) {
      console.log(e.draggedContext)
      return false
    }
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: '1'
        },
        {
          id: 2,
          name: '2'
        }
      ]
    }
  }
}
</script>
<style>
.item {
  background: lightblue;
  border: 1px solid #d9d9d9;
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>
