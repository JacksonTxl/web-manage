<template>
  <a-checkbox-group
    v-model="checkedRights"
    @change="onChange"
  >
    <a-checkbox
      v-for="(item, index) in list"
      :key="index"
      :value="item.rights_id">
      {{item.rights_text}}
    </a-checkbox>
  </a-checkbox-group>
</template>
<script>
import { SelectRightsService } from './select-rights.service'
export default {
  name: 'SelectRights',
  serviceInject() {
    return {
      selectService: SelectRightsService
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
      this.checkedRights = val
    }
  },
  data() {
    return {
      checkedRights: []
    }
  },
  created() {
    this.selectService.getRights().subscribe()
  },
  methods: {
    onChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
