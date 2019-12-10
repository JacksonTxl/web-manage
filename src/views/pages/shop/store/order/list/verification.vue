<template>
  <div>
    <st-input-search
      v-model="$searchQuery.card_name"
      v-di-view="{ name: SHOP_STORE_ORDER_KEYWORDS_SEARCH }"
      @search="onKeywordsSearch('card_name', $event)"
      placeholder="请输入订单编号、会员姓名或手机号查找"
      maxlength="50"
    />
  </div>
</template>
<script>
import { SHOP_STORE_ORDER_KEYWORDS_SEARCH } from '@/constants/events'
export default {
  data() {
    return { SHOP_STORE_ORDER_KEYWORDS_SEARCH, name: '' }
  }
}
</script>
