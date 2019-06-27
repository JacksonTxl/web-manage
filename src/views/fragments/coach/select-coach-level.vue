<template>
  <div>
    <a-select :defaultValue="value" @change="(val) => onChange(val)" placeholder="请选择等级"
      class="page-set-sell-price__select">
      <a-select-option :value="-1">请选择等级</a-select-option>
      <a-select-option :value="item.id" v-for="item in list" :key="item.id">
        {{item.setting_name}}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
import { SelectCoachLevelService } from './select-coach-level.service'
export default {
  name: 'SelectCoachLevel',
  serviceInject() {
    return {
      selectCoachLevelService: SelectCoachLevelService
    }
  },
  props: {
    value: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.selectCoachLevelService.getCoachLevelList().subscribe(res => {
      this.list = res.list
    })
  },
  methods: {
    onChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
