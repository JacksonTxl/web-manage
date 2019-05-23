<template>
  <div>
    <a-row :gutter="16">
      <a-col v-for="(item, index) in list" :key="index" :md="6" :lg="4" :xl="3" :xxl="2">
        <cabinet-item :value="item"></cabinet-item>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import CabinetItem from '../cabinet#/cabinet-item'
export default {
  components: {
    CabinetItem
  },
  data() {
    return {
      list: [{
        status: 'available',
        num: 'A001',
        price: '¥2/天'
      }, {
        status: 'inuse',
        num: 'A002',
        name: 'lily',
        date: '2019-08-22',
        time: '10:00',
        price: '¥5/天'
      }, {
        status: 'unavailable',
        num: 'A003',
        name: 'marry',
        date: '2019-08-23',
        time: '10:00',
        price: '¥10/天'
      }]
    }
  }
}
</script>
