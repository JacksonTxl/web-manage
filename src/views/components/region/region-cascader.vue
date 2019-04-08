<template>
<div>
  <a-cascader
  :fieldNames="{label:'name',value:'id',children:'children'}"
  :options="province"
  :defaultValue="values | parseStringData"
  :showSearch="{filter}"
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
  filters: {
    parseStringData(values) {
      return parseStringData(values)
    }
  },
  data(vm) {
    return {
      province: [],
      DValues: vm.values || []
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
    getRegions() {
      this.regionService.getRegions().subscribe(res => {
        this.province = res
      })
    },
    filter(inputValue, path) {
      if (!isSearch) return
      return (path.some(option => (option.name).indexOf(inputValue) > -1))
    },
    onChange(value) {
      this.$emit('change', parseIntData(value))
    }
  },
  mounted() {
    this.getRegions()
  }
}
</script>
