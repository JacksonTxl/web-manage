<template>
  <div :class="b()">
    <a-input
      :class="b('input')"
      v-model="areaName"
      placeholder="输入名称，不超过15个字"
    />
    <span :class="b('action')">
      <a @click="onSumbit" :loading="loading.add">保存</a>
      <a @click="cancel">
        <st-icon type="close" class="mg-l8" :class="b('close')" />
      </a>
    </span>
  </div>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { CabinetAreaService as AreaService } from './area.service'
import { PatternService } from '@/services/pattern.service'
export default {
  name: 'AddCabinetArea',
  bem: {
    b: 'st-cabinet-area-add'
  },
  serviceInject() {
    return {
      messageService: MessageService,
      areaService: AreaService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.areaService.loading$
    }
  },
  data() {
    return {
      areaName: ''
    }
  },
  methods: {
    cancel() {
      this.$emit('change', 'cancel')
    },
    onSumbit() {
      if (!this.inputCheck()) {
        return
      }
      const params = {
        area_name: this.areaName
      }
      this.areaService.add(params).subscribe(this.onAddSuccess)
    },
    inputCheck() {
      if (!this.areaName.length) {
        this.messageService.error({
          content: '请输入场地名称'
        })
        return false
      }
      if (!this.pattern.CN_EN_NUM_SPACE('1-15').test(this.areaName)) {
        this.messageService.error({
          content: '输入的场地名称格式错误，请重新输入'
        })
        return false
      }
      return true
    },
    onAddSuccess() {
      this.messageService.success({
        content: '添加成功'
      })
      this.$emit('change')
    }
  }
}
</script>
