<template>
  <div :class="mapButton()" @click="map">
    <div :class="mapButton('add')" v-if="isAdd">
      <st-icon type="location" size="32px" :class="mapButton('icon')"></st-icon>
      <p>{{addText}}</p>
    </div>
    <div :class="mapButton('update')" v-else>
      <p>{{`${province.name} ${city.name} ${district.name}`}}</p>
      <p>{{address}}</p>
    </div>
  </div>
</template>
<script>
export default {
  bem: {
    mapButton: 'st-map-button'
  },
  name: 'StMapButton',
  props: {
    addText: {
      type: String,
      default() {
        return '设置门店地址'
      }
    },
    address: {
      type: String,
      default() {
        return '无'
      }
    },
    province: {
      type: Object,
      default() {
        return {}
      }
    },
    city: {
      type: Object,
      default() {
        return {}
      }
    },
    district: {
      type: Object,
      default() {
        return {}
      }
    },
    lat: {
      type: String,
      default() {
        return ''
      }
    },
    lng: {
      type: String,
      default() {
        return ''
      }
    }
  },
  computed: {
    isAdd() {
      return this.lat === '' || this.lng === ''
    },
    st_province() {
      return this.province
    },
    st_city() {
      return this.city
    },
    st_district() {
      return this.district
    }
  },
  methods: {
    map() {
      this.$modalRouter.push({
        name: 'shop-map',
        props: {
          lat: this.lat,
          lng: this.lng,
          province: this.st_province,
          city: this.st_city,
          district: this.st_district,
          address: this.address
        }
      })
    }
  }
}
</script>
