<template>
  <st-modal
    :wrapClassName="b()"
    v-model="show"
    @ok="onOk"
    @cancel="onCancel"
    width="640px"
    :footer="null"
  >
    <div
      :class="b('info')"
      :style="
        `background: url(${info.image_key}) no-repeat;background-size: cover`
      "
    >
      <div :class="b('info-content')">
        <st-t3 :class="b('title')">{{ info.title }}</st-t3>
        <div
          :class="b('content')"
          v-scrollBar="{ stopPropagation: true }"
          class="mg-t16"
          v-html="info.content"
        ></div>
        <div :class="b('button-wapper')">
          <st-button type="primary" class="mg-t8" @click="onOk">
            查看详情
          </st-button>
        </div>
      </div>
    </div>
  </st-modal>
</template>

<script>
import CommonNotifyInfo from '@/views/biz-modals/common/notify/info'
import { InfoService } from './info.service'
export default {
  name: 'ModalNoticeSystem',
  bem: {
    b: 'modal-notice-system'
  },
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  data() {
    return {
      show: false
    }
  },
  modals: {
    CommonNotifyInfo
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          title: '还没',
          image_key: '',
          contnet: '还没'
        }
      }
    }
  },
  methods: {
    setRead() {
      this.show = false
      this.$emit('success')
    },
    onOk() {
      this.infoService
        .getAnnouncementInfo({
          id: this.info.announcement_id,
          notify_type: 1
        })
        .subscribe(res => {
          this.$modalRouter.push({
            name: 'common-notify-info',
            on: {
              cancel: () => {
                this.show = false
                this.setRead()
              }
            }
          })
        })
    },
    onCancel() {
      this.setRead()
    }
  }
}
</script>
