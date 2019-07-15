<template>
  <st-modal
  :title="title"
  v-model="show"
  :footer="null"
  wrapClassName="st-modal-map"
  width="484px">
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
      <div :class="map('search-input')">
        <a-dropdown :trigger="['click']" v-model="dropdownVisible">
          <a-input-search @change="onChange" @input="searchInput" :class="{error:!latlngIsOk}" placeholder="请输入街道、小区或商圈名称" v-model="searchText" @search="onSearch"/>
          <ul slot="overlay" :class="map('search-menu')" v-scrollBar='{stopPropagation:true}'>
            <li :class="map('search-faild')" v-if="!poisList.length">无结果</li>
            <template v-if="poisList.length">
              <li @click="selectLocation(item)" :class="map('search-item')" v-for="(item,index) in poisList" :key="index">
                <p :class="map('search-title')">{{item.name}}</p>
                <span :class="map('search-describe')" v-if="item.location">{{item.location.detail.detail.split(',').reverse().join('')}}</span>
              </li>
            </template>
          </ul>
        </a-dropdown>
      </div>
    </div>
    <div :class="map('map')" id="mapcontainer"></div>
    <div :class="map('address')">
      <a-textarea :class="{error:!addressIsOk}" placeholder="详细地址，例：16号楼5层502" v-model="st_address" :rows="3"/>
    </div>
    <div :class="map('button')">
      <span v-if="!latlngIsOk||!addressIsOk" :class="map('error-info')">{{errorText}}</span>
      <st-button type="primary" @click="handleOk">提交</st-button>
    </div>
  </st-modal>
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
      dropdownVisible: false,
      errorText: '',
      latlngIsOk: true,
      addressIsOk: true,
      fieldNames: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      regions: [],
      searchText: '',
      selectCity: '上海市',
      PC: [310000, 310100],
      st_address: '',
      st_province: {},
      st_city: {},
      st_district: {},
      // 定位data
      locationData: {},
      // 注释以下三个对象，提升vue性能
      // mapObject: null,
      // markerObject: null,
      // searchServiceObject: null,
      locationObject: null,
      // 检索列表
      poisList: [],
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
  watch: {
    st_address(newVal, oldVal) {
      this.selectData.address = newVal
      this.addressIsOk = true
      this.errorText = this.latlngIsOk ? '' : '请选择具体地址!'
    }
  },
  methods: {
    init() {
      // 获取省市区
      this.getRegions()
      this.st_address = this.address
      this.st_province = cloneDeep(this.province)
      this.st_city = cloneDeep(this.city)
      this.st_district = cloneDeep(this.district)
      if (this.isAdd) {
        this.mapService
          .getLocation(`https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&key=${this.appConfig.QQ_MAP_KEY}&callback=`)
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
              this.locationData = cloneDeep(res.result)
            } else {
              // 定位失败,设置为上海市政府
              this.locationFailed()
              this.locationData = {
                location: {
                  lat: '31.230350',
                  lng: '121.473720'
                }
              }
            }
            // 实例化map
            this.initMap()
            this.initSearch({ location: this.selectCity })
          })
      } else {
        this.selectData.province = cloneDeep(this.st_province)
        this.selectData.city = cloneDeep(this.st_city)
        this.PC = [this.st_province.id, this.st_city.id]
        this.selectCity = this.st_city.name
        this.locationData = {
          location: {
            lat: this.lat,
            lng: this.lng
          }
        }
        // 实例化map
        this.initMap()
        this.initSearch({ location: this.selectCity })
      }
    },
    getRegions() {
      this.regionService.getRegionPC().subscribe(res => {
        this.regions = res
      })
    },
    // 定位失败
    locationFailed() {
      this.selectData.province = {
        id: 310000,
        name: '上海市'
      }
      this.selectData.city = {
        id: 310100,
        name: '上海市'
      }
      this.selectCity = '上海市'
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
      this.searchText = ''
      this.poisList = []
      this.selectData.address = this.st_address = ''
      this.selectData.lat = ''
      this.selectData.lng = ''
    },
    // 实例化地图
    initMap() {
      let center = new qq.maps.LatLng(this.locationData.location.lat, this.locationData.location.lng)
      this.mapObject = new qq.maps.Map(document.getElementById('mapcontainer'), {
        center,
        zoom: 13,
        disableDefaultUI: true
      })
      this.resetMap(center)
    },
    // 实例化检索服务
    initSearch({ location }) {
      let that = this
      this.searchServiceObject = new qq.maps.SearchService({
        location: '上海市',
        autoExtend: false,
        // eslint-disable-next-line
        error: function(error) {
          that.poisList = []
        },
        complete: function(results) {
          if (results.type === 'POI_LIST') {
            if (results.detail.pois.length) {
              results.detail.pois.forEach((i, index) => {
                let latLng = new qq.maps.LatLng(i.latLng.lat, i.latLng.lng)
                that.initLocation(index).searchCityByLatLng(latLng)
              })
            }
            that.poisList = cloneDeep(results.detail.pois)
          } else {
            that.poisList = []
          }
        }
      })
    },
    // 实例化坐标定位服务
    initLocation(index) {
      let that = this
      return new qq.maps.CityService({
        complete: function(results) {
          that.$set(that.poisList[index], 'location', results)
        }
      })
    },
    onSearch(data) {
      this.dropdownVisible = true
      this.searchServiceObject.setLocation(this.selectCity)
      this.searchServiceObject.search(data)
    },
    onChange(data) {
      this.dropdownVisible = true
      this.searchServiceObject.setLocation(this.selectCity)
      this.searchServiceObject.search(data.target.value)
    },
    selectLocation(data) {
      this.dropdownVisible = false
      this.searchText = data.name
      this.selectData.address = this.st_address = data.address
      let position = new qq.maps.LatLng(data.latLng.lat, data.latLng.lng)
      this.resetMap(position)
      this.selectData.lat = String(data.latLng.lat)
      this.selectData.lng = String(data.latLng.lng)
    },
    // 重置地图
    resetMap(position) {
      let anchor = new qq.maps.Point(8, 16)
      let size = new qq.maps.Size(16, 16)
      let origin = new qq.maps.Point(0, 0)
      let icon = new qq.maps.MarkerImage(require('@/assets/img/map_location.png'), size, origin, anchor, size)
      this.markerObject && this.markerObject.setMap(null)
      this.markerObject = new qq.maps.Marker({
        position,
        icon: icon,
        animation: qq.maps.MarkerAnimation.DROP,
        map: this.mapObject
      })
      this.mapObject.panTo(position)
    },
    searchInput() {
      this.latlngIsOk = true
      this.errorText = this.addressIsOk ? '' : '请输入详细地址！'
    },
    handleOk() {
      this.latlngIsOk = this.selectData.lat !== '' && this.selectData.lng !== ''
      this.addressIsOk = this.selectData.address !== ''
      if (!this.latlngIsOk && !this.addressIsOk) {
        this.errorText = '请选择具体地址并输入详细地址!'
      } else {
        if (!this.latlngIsOk) {
          this.errorText = '请选择具体地址!'
        } else if (!this.addressIsOk) {
          this.errorText = '请输入详细地址!'
        } else {
          this.mapService
            .getLocation(`https://apis.map.qq.com/ws/geocoder/v1/?location=${this.selectData.lat},${this.selectData.lng}&output=jsonp&key=${this.appConfig.QQ_MAP_KEY}&callback=`)
            .subscribe(res => {
              this.selectData.district.id = +res.result.ad_info.adcode
              this.selectData.district.name = res.result.ad_info.district
              this.$emit('ok', this.selectData)
              this.show = false
            })
        }
      }
    }
  }
}
</script>
