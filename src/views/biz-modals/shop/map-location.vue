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
import { MapService } from './map.service.ts'
import { AppConfig } from '@/constants/config'
export default {
  bem: {
    map: 'modal-map-location'
  },
  name: 'StModalMapLocation',
  serviceInject() {
    return {
      appConfig: AppConfig,
      mapService: MapService
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
    this.initMap()
  },
  methods: {
    // 实例化地图
    initMap() {
      let center = new qq.maps.LatLng(this.lat, this.lng)
      this.mapObject = new qq.maps.Map(
        document.getElementById('mapcontainer'),
        {
          center,
          zoom: 13,
          disableDefaultUI: true
        }
      )
      this.resetMap(center)
    },
    // 重置地图
    resetMap(position) {
      let anchor = new qq.maps.Point(8, 16)
      let size = new qq.maps.Size(16, 16)
      let origin = new qq.maps.Point(0, 0)
      let icon = new qq.maps.MarkerImage(
        require('@/assets/img/map_location.png'),
        size,
        origin,
        anchor,
        size
      )
      this.markerObject && this.markerObject.setMap(null)
      this.markerObject = new qq.maps.Marker({
        position,
        icon: icon,
        animation: qq.maps.MarkerAnimation.DROP,
        map: this.mapObject
      })
      this.mapObject.panTo(position)
    }
  }
}
</script>
