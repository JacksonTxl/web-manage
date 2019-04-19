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
import { BehaviorSubject } from 'rxjs'

let forceCount = 0
export default {
  serviceInject() {
    return {
      routeService: RouteService,
      mineService: MineService
    }
  },
  rxState() {
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
      const to = {
        query: {
          a: 1,
          b: 2,
          c: 6
        }
      }
      to.query = to.query || {}
      const finalQuery = {
        ...to.query,
        __force: forceCount++
      }
      const originalHref = this.$router.resolve(to).href
      to.query = finalQuery
      this.$router.push(to)
      const originalState = window.history.state
      window.history.replaceState(originalState, null, originalHref)
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
