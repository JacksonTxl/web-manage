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
        num: 'A001'
      }, {
        num: 'A002'
      }, {
        num: 'A003'
      }]
    }
  }
}
</script>
