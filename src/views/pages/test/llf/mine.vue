<template>
  <st-panel app>
    {{query}}
    <a-input v-model="query.courseName"></a-input>{
    <a-button @click="onSearch">搜索</a-button>

    {{list}}
  </st-panel>
</template>

<script>
import draggable from 'vuedraggable'
import { RouteService } from '@/services/route.service'
import { MineService } from './mine.service'
export default {
  serviceInject() {
    return {
      routeService: RouteService,
      mineService: MineService
    }
  },
  subscriptions() {
    return {
      query: this.routeService.query$,
      list: this.mineService.list$
    }
  },
  methods: {
    onMove(e) {
      console.log(e.draggedContext)
      return false
    },
    onSearch() {
      this.$router.push({
        query: this.query
      })
    }
  },
  mounted() {
    console.log(this)
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
