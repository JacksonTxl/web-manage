<template>
<div>
  <a-cascader
  :fieldNames="{label:'name',value:'id',children:'children'}"
  :options="regions"
  :showSearch="{filterRegionsName}"
  :defaultValue="value"
  v-model="model"
  @change="onChange"
  :placeholder="placeholder"/>
</div>

</template>

<script>
import { RegionService } from '../../../services/region.service'
export default {
  name: 'StRegionCascader',
  serviceInject() {
    return {
      regionService: RegionService
    }
  },
  data(vm) {
    return {
      valueSelf: [],
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
    options: {
      type: Array
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(newVal) {
        this.valueSelf = newVal
      }
    }
  },
  methods: {
    getRegions() {
      // 如果options传了则不去拿全量options
      if (typeof this.$props.options !== 'undefined') {
        this.regions = this.options
        return
      }
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
