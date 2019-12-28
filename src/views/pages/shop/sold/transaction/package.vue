<template>
  <sold-transaction :product_type="PRODUCT_TYPE.PACKAGE"></sold-transaction>
</template>
<script>
import SoldTransaction from './list'
import { PRODUCT_TYPE } from '@/constants/sold/transaction'
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
