<template>
<div>
  <a-cascader
  :fieldNames="{label:'name',value:'id',children:'children'}"
  :options="province"
  :defaultValue="values"
  :loadData="loadData"
  @change="onChange"
  placeholder="请选择"/>
</div>

</template>

<script>
import { RegionService } from '../../../services/region.service'
import { forkJoin } from 'rxjs'

export default {
  name: 'StRegionCascader',
  serviceInject() {
    return {
      regionService: RegionService
    }
  },
  data(vm) {
    return {
      province: [],
      DValues: vm.values || []
    }
  },
  props: {
    isLoadData: {
      type: Boolean,
      default: false
    },
    values: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    model: {
      get() {
        return this.DValues.length > 0 ? this.DValues : this.values
      },
      set(newVal) {
        this.DValues = newVal
      }
    }
  },
  methods: {
    initRegionsTree() {
      forkJoin(this.getRegionProvinces(), this.getRegionCitys({ value: values[1] }), this.getRegionCitys({ value: values[2] })).subscribe()
    },
    getRegionCitys(targetOption) {
      targetOption.loading = true
      return this.regionService.getRegionCitys(targetOption.value).subscribe(res => {
        targetOption.loading = false
        targetOption.children = res.city_source[0].city.map(item => {
          return {
            tag: 'city',
            item,
            label: item.city_name,
            value: item.city_id + ''
          }
        })
        this.province = [...this.province]
      })
    },
    getRegions() {
      this.regionService.getRegions().subscribe(res => {
        this.province = res
      })
    },
    getRegionDistricts(targetOption) {
      targetOption.loading = true
      this.regionService.getRegionDistricts(targetOption.value).subscribe(res => {
        targetOption.loading = false
        targetOption.children = res.district_source[0].district.map(item => {
          return {
            tag: 'district',
            item,
            label: item.district_name,
            value: item.district_id + ''
          }
        })
        this.province = [...this.province]
      })
    },
    getRegionProvinces() {
      this.regionService.getRegionProvinces().subscribe(res => {
        this.province = res.province_source.map(item => {
          const targetOption = { item, tag: 'province', label: item.province_name, value: item.province_id + '' }
          this.getRegionCitys(targetOption)
          return targetOption
        })
      })
    },
    loadData(selectedOptions) {
      if (!this.isLoadData) return
      const targetOption = selectedOptions[selectedOptions.length - 1]
      console.log(targetOption)
      if (targetOption.tag === 'city') {
        this.getRegionDistricts(targetOption)
      } else if (targetOption.tag === 'province') {
        this.getRegionCitys(targetOption)
      }
    },
    onChange(value) {
      console.log(value)
      this.$emit('change', value)
    }
  },
  mounted() {
    this.getRegions()
  }
}
</script>
