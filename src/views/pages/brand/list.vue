<template>
  <div>
    <ul>
      <li v-for='item in list'
        :key='item'>{{item}}</li>
    </ul>
    <a-input></a-input>
    <a-button @click='onSearch'>search</a-button>
  </div>
</template>
<script>
import { ListService } from './list.service'
export default {
  serviceInject() {
    return {
      listService: ListService
    }
  },
  subscriptions() {
    return {
      list: this.listService.list$
    }
  },
  methods: {
    onSearch() {}
  }
}
</script>
