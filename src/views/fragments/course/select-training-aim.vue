<template>
  <div>
    <a-select mode="tags" :defaultValues="checkedIds" placeholder="请选择训练目的" @change="change">
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
  props: {
    checkedIds: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      list: []
    }
  },
  rxState() {
    return {
      list: this.selectTrainingAimService.list$
    }
  },
  created() {
    this.selectTrainingAimService.getTrainingAimList().subscribe()
  },
  methods: {
    change(val) {
      val = val.map(v => +v)
      this.$emit('change', val)
    }
  }
}
</script>
