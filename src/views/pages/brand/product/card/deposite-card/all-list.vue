<template>
  <st-panel
    :tabs="[
          { label: '全部储值卡项', route: { name: 'brand-product-card-deposite-card-all-list-member-list' } },
          { label: '门店上架储值卡', route: { name: 'brand-product-card-deposite-card-all-list-stop-sale-list' } }
        ]"
    @change="handleChange">
    <div slot="actions">
      <a-input-search placeholder="请输入" v-model="card_name" @search="onSearch" maxlength="50"></a-input-search>
    </div>
    <router-view></router-view>
  </st-panel>
</template>

<script>
export default {
  name: 'all-list',
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
