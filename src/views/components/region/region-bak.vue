<template>
<div>
  <a-cascader
  :fieldNames="{label:'name',value:'id',children:'children'}"
  :options="COptions"
  :showSearch="{filterRegionsName}"
  :defaultValue="value"
  v-model="model"
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
      valueSelf: [],
      regions: []
    }
  },
  watch: {
    value(newVal) {
      this.valueSelf = newVal
    }
  },
  props: {
    form: {
      type: Object
    },
    fileds: {
      type: Array,
      default: () => {
        return []
      }
    },
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
    dasdsa: String,
    options: {
      type: Array
    }
  },
  computed: {
    COptions() {
      return this.isAutoInitOptions ? this.options : this.regions
    },
    model: {
      get() {
        return this.value
      },
      set(newVal) {
        const form = {}
        newVal.forEach((item, index) => {
          form[`${this.fileds[index]}`] = item
        })
        if (this.fileds.length) {
          this.form.setFieldsValue({
            ...form
          })
        }
      }
    }
  },
  methods: {
    getRegions() {
      if (typeof this.$props.options !== 'undefined') return
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
