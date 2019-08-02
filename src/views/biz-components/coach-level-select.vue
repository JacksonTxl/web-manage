<template>
  <a-select
    :mode="mode"
    allowClear
    :placeholder="placeholder || '全部'"
    :value="value"
    @change="onChange"
  >
    <a-select-option
      :value="coachLevel.id"
      v-for="coachLevel in coachLevelOptions"
      :key="coachLevel.id"
    >
      {{ coachLevel.name }}
    </a-select-option>
  </a-select>
</template>

<script>
import { CoachLevelApi } from '../../api/v1/setting/coach/level'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  name: 'CoachLevelSelect',
  data() {
    return {
      coachLevelOptions: []
    }
  },
  serviceInject() {
    return {
      coachLevelApi: CoachLevelApi
    }
  },
  props: {
    mode: {
      type: String
    },
    placeholder: {
      type: String
    },
    useType: {
      type: String
    },
    value: {
      type: [Number, String, Array]
    }
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    },
    getShopList() {
      this.coachLevelApi.getCoachLevelListAll().subscribe(res => {
        const defaultOption =
          this.useType === 'form' ? {} : { id: -1, name: ' 全部' }
        this.coachLevelOptions = [defaultOption, ...res.list]
      })
    }
  },
  created() {
    this.getShopList()
  }
}
</script>
