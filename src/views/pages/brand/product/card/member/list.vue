<template>
  <st-panel
    :tabs="[
          { label: '会员卡项', route: { name: 'brand-product-card-member-list-member-list' } },
          { label: '门店上架卡项', route: { name: 'brand-product-card-member-list-stop-sale-list' } }
        ]"
    @change="handleChange"
  >
    <div slot="actions">
      <a-input-search placeholder="会员卡名称" v-model="cardName" @search="onSearch" maxlength="50"></a-input-search>
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
      cardName: ''
    }
  },
  methods: {
    onSearch(value) {
      this.cardName = value
      this.$router.push({ query: { cardName: value } })
    },
    handleChange(data) {
      this.cardName = ''
    }
  }
}
</script>
