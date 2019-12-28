<template>
  <sold-transaction :product_type="PRODUCT_TYPE.MEMBER_CARD"></sold-transaction>
</template>
<script>
import { PRODUCT_TYPE } from '@/constants/sold/transaction'
import SoldTransaction from './list'
export default {
  data() {
    return {
      PRODUCT_TYPE
    }
  },
  components: {
    SoldTransaction
  }
}
</script>
