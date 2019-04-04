<template>
<div>
  <a-cascader
  :fieldNames="{label:'name',value:'id',children:'children'}"
  :options="province"
  :defaultValue="values"
  :showSearch="{filter}"
  @change="onChange"/>
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
      console.log(value)
      this.$emit('change', value)
    }
  },
  mounted() {
    this.getRegions()
  }
}
</script>
