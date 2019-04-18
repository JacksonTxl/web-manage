<template>
  <st-panel
    :tabs="[
          { label: '会员卡项', route: { name: 'brand-product-card-member-list-member-list' } },
          { label: '门店售卖卡项', route: { name: 'brand-product-card-member-list-stop-sale-list' } }
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
export default {
  name: 'list',
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
