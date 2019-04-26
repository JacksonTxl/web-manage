<template>
  <st-panel app>
    <st-map-button
    :lat="update.lat"
    :lng="update.lng"
    :address="update.address"
    :province="update.province"
    :city="update.city"
    :district="update.district"
    @change="change"
    ></st-map-button>
    <br>
    <p v-for="(item,index) in Object.entries(update)" :key="index+`update`">{{item[0]}}---{{item[1]}}</p>
    <st-map-button
    :lat="add.lat"
    :lng="add.lng"
    :address="add.address"
    :province="add.province"
    :city="add.city"
    :district="add.district"
    @change="addchange"
    ></st-map-button>
    <br>
    <p v-for="(item,index) in Object.entries(add)" :key="index">{{item[0]}}---{{item[1]}}</p>
  </st-panel>
</template>
<script>
import StMapButton from '@/views/components/map-button/map-button.vue'
export default {
  components: {
    StMapButton
  },
  data() {
    return {
      update: {
        lat: '39.915370',
        lng: '116.426050',
        address: '北京市东城区金宝街52号',
        province: { id: 110000, name: '北京市' },
        city: { id: 110100, name: '北京市市辖区' },
        district: { id: 110101, name: '东城区' }
      },
      add: {
        lat: '',
        lng: '',
        address: '',
        province: {},
        city: {},
        district: {}
      }
    }
  },
  methods: {
    change(data) {
      console.log(data)
    },
    addchange(data) {
      console.log(data)
    }
  }
}
</script>
