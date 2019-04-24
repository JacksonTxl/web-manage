<template>
  <a-modal
      :title="title"
      :class="map()"
      v-model="show"
      :footer="null"
      :width="484"
      @ok="handleOk"
    >
      <div :class="map('search')">
        <a-cascader :class="map('cascader')" :options="regions" :fieldNames="fieldNames" @change="onChange">
          <a href="javascript:void(0)" :class="map('cascader__btn')">{{selectCity}}<st-icon type="down" size="12px" :class="map('icon')"></st-icon></a>
        </a-cascader>
        <a-input-search
          placeholder="请输入街道、小区或商圈名称"
          @search="onSearch"
        />
      </div>
      <div :class="map('map')">
        map
      </div>
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
export default {
  bem: {
    map: 'st-modal-map'
  },
  name: 'StModalMap',
  serviceInject() {
    return {
      regionService: RegionService
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
      st_address: '',
      fieldNames: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      regions: [],
      selectCity: '上海',
      PC: []

    }
  },
  mounted() {
    this.init()
    this.getRegions()
    console.log(this.st_city)
  },
  methods: {
    init() {
      // 获取省市区
      this.getRegions()
      this.st_address = this.address
    },

    handleOk() {

    },
    onChange(data) {
      console.log(data)
    },
    onSearch(data) {
      console.log(data)
    },
    getRegions() {
      this.regionService.getRegionPC().subscribe(res => {
        this.regions = res
        console.log(this.regions)
      })
    }
  }
}
</script>
