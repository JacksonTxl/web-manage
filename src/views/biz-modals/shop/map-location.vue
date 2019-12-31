<template>
  <st-modal
    title="查看门店定位"
    :class="map()"
    v-model="show"
    :footer="null"
    wrapClassName="modal-map-location"
    width="484px"
  >
    <div :class="map('map')" class="mg-b8" id="mapcontainer"></div>
    <p :class="map('lat-lng')" class="mg-b0">({{ lat }}，{{ lng }})</p>
  </st-modal>
</template>
<script>
import { QqMapService } from '@/services/qq-map.service'
import { AppConfig } from '@/constants/config'
export default {
  bem: {
    map: 'modal-map-location'
  },
  name: 'StModalMapLocation',
  serviceInject() {
    return {
      appConfig: AppConfig,
      qqMapService: QqMapService
    }
  },
  props: {
    lat: {
      type: String,
      required: true
    },
    lng: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.qqMapService.init({
      lat: this.lat,
      lng: this.lng
    })
  }
}
</script>
