<template>
  <st-modal
    title="通知设置"
    :class="b()"
    v-model="show"
    width="370px"
    :footer="null"
  >
    <div :class="b('item')" v-for="item in notifyTypes$" :key="item.key">
      <span>{{ item.name }}</span>
      <st-switch
        v-model="item.is_open"
        @change="onChangeSetConfig()"
      ></st-switch>
    </div>
  </st-modal>
</template>

<script>
import { ConfigService } from './config.service'
export default {
  name: 'ModalNotifyConfig',
  bem: {
    b: 'modal-notify-config'
  },
  serviceInject() {
    return {
      service: ConfigService
    }
  },
  rxState() {
    const { notifyTypes$ } = this.service
    return { notifyTypes$ }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    onChangeSetConfig() {
      // 更新通知设置
      this.service.updateNoticeSetting(this.notifyTypes$).subscribe()
    },
    init() {
      // 获取通知设置回显
      this.service.getNoticeSettingInfo().subscribe()
    }
  },
  created() {
    this.init()
  }
}
</script>
