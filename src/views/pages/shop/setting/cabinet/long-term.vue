<template>
  <div>
    <cabinet :value="list"/>
  </div>
</template>
<script>
import Cabinet from '../cabinet#/cabinet'
export default {
  components: {
    Cabinet
  },
  data() {
    return {
      list: [{
        num: 'A001',
        price: '¥2/天'
      }, {
        num: 'A002',
        price: '¥5/天'
      }, {
        num: 'A003',
        price: '¥10/天'
      }]
    }
  }
}
</script>
