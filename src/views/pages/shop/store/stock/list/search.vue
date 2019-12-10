<template>
  <div>
    <st-input-search
      v-model="$searchQuery.card_name"
      v-di-view="{ name: SHOP_STORED_STOCK_KEYWORDS_SEARCH }"
      @search="onKeywordsSearch('card_name', $event)"
      :placeholder="`请输入${$c('member_card')}名称查找`"
      maxlength="50"
    />
  </div>
</template>
<script>
import SHOP_STORED_STOCK_KEYWORDS_SEARCH from '@/constants/events'
export default {
  data() {
    return { SHOP_STORED_STOCK_KEYWORDS_SEARCH, name: '' }
  }
}
</script>
