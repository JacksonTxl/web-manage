<template>
  <a-modal :title="title" :class="map()" v-model="show" :footer="null" :width="484" @ok="handleOk">
    <div :class="map('search')">
      <a-cascader
        :class="map('cascader')"
        :options="regions"
        :fieldNames="fieldNames"
        v-model="PC"
        @change="cascaderChange"
      >
        <a href="javascript:void(0)" :class="map('cascader__btn')">
          {{selectCity}}
          <st-icon type="down" size="12px" :class="map('icon')"></st-icon>
        </a>
      </a-cascader>
      <a-input-search placeholder="请输入街道、小区或商圈名称" @search="onSearch"/>
    </div>
    <div :class="map('map')" id="mapcontainer"></div>
    <div :class="map('address')">
      <a-textarea placeholder="详细地址，例：16号楼5层502" v-model="st_address" :rows="3"/>
    </div>
    <div :class="map('button')">
      <st-button type="primary">提交</st-button>
    </div>
  </a-modal>
</template>
<script>
import { RegionService } from '../../../services/region.service'
import { MapService } from './map.service.ts'
import { AppConfig } from '@/constants/config'
import { findIndex, cloneDeep } from 'lodash-es'
export default {
  bem: {
    map: 'st-modal-map'
  },
  name: 'StModalMap',
  serviceInject() {
    return {
      regionService: RegionService,
      appConfig: AppConfig,
      mapService: MapService
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
  props: {
    title: {
      type: String,
      default() {
        return '门店定位'
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
  data() {
    return {
      show: false,
      fieldNames: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      regions: [],
      selectCity: '北京市',
      // selectCity: '上海',
      PC: [110000, 110100],
      // PC: [310000,310100],
      st_address: '',
      // 定位data
      locationData: {},
      mapObject: null,
      markerObject: null,
      selectData: {
        province: {},
        city: {},
        district: {},
        address: '',
        lat: '',
        lng: ''
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 获取省市区
      this.getRegions()
      this.st_address = this.address
      if (this.isAdd) {
        this.mapService
          .getLocation(`https://apis.map.qq.com/ws/location/v1/ip?ip=118.250.155.34&output=jsonp&key=${this.appConfig.QQ_MAP_KEY}&callback=`)
          .subscribe(res => {
            if (res.status === 0) {
            // 定位成功
              this.selectData.province = {
                id: ~~(res.result.ad_info.adcode / 10000) * 10000,
                name: res.result.ad_info.province
              }
              this.selectData.city = {
                id: ~~(res.result.ad_info.adcode / 100) * 100,
                name: res.result.ad_info.city
              }
              this.PC = [~~(res.result.ad_info.adcode / 10000) * 10000, ~~(res.result.ad_info.adcode / 100) * 100, res.result.ad_info.adcode]
              this.selectCity = res.result.ad_info.city
            } else {
            // 定位失败
              this.locationFailed()
            }
            this.locationData = cloneDeep(res.result)
            // 实例化map
            this.initMap()
            // this.loadJs(`https://map.qq.com/api/js?v=2.exp&key=${this.appConfig.QQ_MAP_KEY}&libraries=drawing,geometry,place,convertor,visualization`)
            // .then(res => {

          // })
          })
      } else {

      }
    },
    loadJs(src) {
      const s = document.createElement('script')
      if (document.querySelector(`script[src='${src}']`)) {
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
        s.src = src
        document.head.appendChild(s)
        s.onload = () => {
          resolve()
        }
        s.onerror = err => {
          reject(err)
        }
      })
    },
    getRegions() {
      this.regionService.getRegionPC().subscribe(res => {
        this.regions = res
      })
    },
    // 定位失败
    locationFailed() {
      this.selectData.province = {
        id: 110000,
        name: '北京市'
      }
      this.selectData.city = {
        id: 110100,
        name: '北京市市辖区'
      }
      this.selectCity = '北京市'
    },
    // 省市change
    cascaderChange(data) {
      let province = cloneDeep(this.regions[findIndex(this.regions, o => o.id === data[0])])
      let city = cloneDeep(province.children[findIndex(province.children, o => o.id === data[1])])
      this.selectData.province = {
        id: data[0],
        name: province.name
      }
      this.selectData.city = {
        id: data[1],
        name: city.name
      }
      this.selectCity = city.name
    },
    // 实例地图
    initMap() {
      console.log(this.locationData)
      let center = new qq.maps.LatLng(this.locationData.location.lat, this.locationData.location.lng)
      this.mapObject = new qq.maps.Map(document.getElementById('mapcontainer'), {
        center,
        zoom: 13,
        disableDefaultUI: true
      })
      let anchor = new qq.maps.Point(8, 16)
      let size = new qq.maps.Size(16, 16)
      let origin = new qq.maps.Point(0, 0)
      let icon = new qq.maps.MarkerImage(require('@/assets/img/map_location.png'), size, origin, anchor, size)
      var markerObject = new qq.maps.Marker({
        position: center,
        icon: icon,
        animation: qq.maps.MarkerAnimation.DROP,
        map: this.mapObject
      })
    },
    // 重置地图
    resetMap() {

    },

    handleOk() {},
    onChange(data) {
      // console.log(data)
    },
    onSearch(data) {
      // console.log(data)
    }
  }
}
</script>
