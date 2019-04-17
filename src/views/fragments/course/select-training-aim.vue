<template>
  <div>
    <a-select mode="tags" placeholder="请选择训练目的" @change="change">
      <a-select-option v-for="item in list" :key="`${item.id}`">{{item.setting_name}}</a-select-option>
    </a-select>
  </div>
</template>

<script>
import { SelectTrainingAimService } from './select-training-aim.service'
export default {
  name: 'StSelectTrainingAim',
  serviceInject() {
    return {
      selectTrainingAimService: SelectTrainingAimService
    }
  },
  data() {
    return {
      list: []
    }
  },
  subscriptions() {
    return {
      list: this.selectTrainingAimService.list$
    }
  },
  created() {
    this.selectTrainingAimService.getTrainingAims().subscribe()
  },
  methods: {
    change(val) {
      this.$emit('change', val)
    }
  }
}
</script>
