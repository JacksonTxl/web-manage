<template>
  <st-modal
    :wrapClassName="b()"
    title="公告详情"
    v-model="show"
    width="728px"
    @cancel="onCancel"
    :footer="null"
  >
    <div :class="b('title-fixed')">
      <st-t2 :class="b('title')">{{ info$.title }}</st-t2>
      <div :class="b('item')" class="mg-t8">
        <span :class="b('item-img')" class="mg-r8">
          <img src="~@/assets/img/notify_logo.png" alt="" />
        </span>
        <span :class="b('item-type')" class="mg-r8">
          {{ info$.notify_type }}
        </span>
        <span :class="b('item-time')">{{ info$.send_time }}</span>
      </div>
    </div>

    <div :class="b('content')" class="mg-t24" v-html="info$.content"></div>
  </st-modal>
</template>

<script>
import { InfoService } from './info.service'

export default {
  name: 'ModalNoticeDetail',
  bem: {
    b: 'modal-common-notify-info'
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
      return '~@/assets/img/notify_logo.png'
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
  methods: {
    onCancel() {
      this.$emit('cancel')
    }
  },
  created() {
    const { id, notify_type } = this.record
    this.service
      .getAnnouncementInfo({ id, notify_type: notify_type.id })
      .subscribe()
  }
}
</script>
