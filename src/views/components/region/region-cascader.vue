<template>
<div>
  <a-cascader
  :fieldNames="{label:'name',value:'id',children:'children'}"
  :options="COptions"
  :showSearch="{filterRegionsName}"
  :defaultValue="value"
  @change="onChange"
  :placeholder="placeholder"/>
</div>

</template>

<script>
import { RegionService } from '../../../services/region.service'
const parseStringData = (data) => {
  return data.map(item => item.toString())
}
const parseIntData = (data) => {
  return data.map(item => parseInt(item))
}
export default {
  name: 'StRegionCascader',
  serviceInject() {
    return {
      regionService: RegionService
    }
  },
  data(vm) {
    return {
      regions: []
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array
    },
    isAutoInitOptions: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    COptions() {
      return this.isAutoInitOptions ? this.options : this.regions
    }
  },
  methods: {
    getRegions() {
      if (this.isAutoInitOptions) return
      this.regionService.getRegions().subscribe(res => {
        this.regions = res
      })
    },
    filterRegionsName(inputValue, path) {
      if (!isSearch) return
      return (path.some(option => (option.name).indexOf(inputValue) > -1))
    },
    onChange(value) {
      this.$emit('change', value)
    }
  },
  mounted() {
    this.getRegions()
  }
}
</script>
