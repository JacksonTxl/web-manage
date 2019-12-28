<template>
  <st-modal :class="b()" v-model="show" width="728px" :footer="null">
    {{ info$ }}
    <st-t2 :class="b('title')">{{ info$.title }}</st-t2>
    <div :class="b('item')" class="mg-t8">
      <span :class="b('item-img')"><img :src="logo" alt="" /></span>
      <span :class="b('item-type')">{{ info$.notice_type }}</span>
      <span :class="b('item-time')">{{ info$.notice_time }}</span>
    </div>
    <div :class="b('content')">
      {{ info$.content }}
    </div>
  </st-modal>
</template>

<script>
import { InfoService } from './info.service'

export default {
  name: 'ModalNoticeDetail',
  bem: {
    b: 'modal-notice-detail'
  },
  serviceInject() {
    return {
      service: InfoService
    }
  },
  rxState() {
    const { info$, brand$ } = this.service
    return {
      info$,
      brand$
    }
  },
  computed: {
    logo() {
      return this.brand$.logo
    }
  },
  props: {
    record: Object
  },
  data() {
    return {
      show: false,
      notifyConfig: {}
    }
  },
  created() {
    const { id, notify_type } = this.record
    this.service
      .getAnnouncementInfo({ id, notify_type: notify_type.key })
      .subscribe()
  }
}
</script>
