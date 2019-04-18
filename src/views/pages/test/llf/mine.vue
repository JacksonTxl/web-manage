<template>
  <st-panel app>
    <draggable v-model="arr">
      <transition-group>
        <div v-for="item in arr" :key="item.id">{{item.name}}</div>
      </transition-group>
    </draggable>
  </st-panel>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data() {
    return {
      arr: [
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
