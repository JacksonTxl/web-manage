<template>
  <a-popover placement="bottomRight" trigger="click" class="slider-copy-bottom">
    <template slot="content">
      <a-checkbox-group
        class="slider-copy"
        v-model="checkedCondition"
        @change="onChange"
      >
        <div v-for="(item, index) in list" :key="index">
          <a-checkbox :value="item.condition_id">
            {{item.condition_text}}
          </a-checkbox>
        </div>
      </a-checkbox-group>
    </template>
    <a href="javascript: void(0);">
      任选其一即升级
      <st-icon type="down"></st-icon>
    </a>
  </a-popover>
</template>
<script>
import { SelectConditionService } from './select-condition.service'
export default {
  name: 'SelectCondition',
  serviceInject() {
    return {
      selectService: SelectConditionService
    }
  },
  rxState() {
    return {
      resData: this.selectService.resData$
    }
  },
  computed: {
    list() {
      console.log(this.resData)
      return this.resData.list
    },
    checked() {
      return this.resData.checked
    }
  },
  watch: {
    checked(val) {
      this.checkedCondition = val
    }
  },
  data() {
    return {
      checkedCondition: []
    }
  },
  created() {
    this.selectService.getCondition().subscribe()
  },
  methods: {
    onChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
