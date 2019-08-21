<template>
  <div>
    A
    <router-link to="/test/b">test/b</router-link>
    <ul>
      <li v-for="item in list" :key="item.id">
        {{ item.title }} {{ item.id }}
      </li>
    </ul>
  </div>
</template>

<script>
import container from '@/container'
import { AService } from './a.service.ts'

export default {
  data() {
    return {
      // list: []
    }
  },
  // serviceProviders() {
  //   return [AService]
  // },
  serviceInject() {
    return {
      aService: AService
    }
  },
  rxState() {
    return {
      list: this.aService.list$
    }
  }
  // beforeDestroy() {
  //   container.destroy(AService)
  // }
}
</script>
