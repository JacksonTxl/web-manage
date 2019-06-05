<template>
  <st-panel
    :tabs="tabs"
    @change="handleChange">
    <div slot="actions">
      <a-input-search placeholder="请输入" v-model="card_name" @search="onSearch" maxlength="50"></a-input-search>
    </div>
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { ListService } from './list.service'
export default {
  serviceInject() {
    return {
      listService: ListService
    }
  },
  rxState() {
    return {
      tabs: this.listService.tabs$
    }
  },
  data() {
    return {
      card_name: ''
    }
  },
  methods: {
    onSearch(value) {
      this.card_name = value
      this.$router.push({ query: { card_name: value } })
    },
    handleChange(data) {
      this.cardName = ''
    }
  }
}
</script>
