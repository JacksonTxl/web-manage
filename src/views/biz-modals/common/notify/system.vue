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
export default {
  name: 'ModalNoticeSystem',
  bem: {
    b: 'modal-notice-system'
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
      this.$modalRouter.push({
        name: 'common-notify-info',
        props: {
          record: {
            id: this.info.announcement_id,
            notify_type: { id: 1, name: '系统公告' }
          }
        },
        on: {
          cancel: () => {
            this.show = false
            this.setRead()
          }
        }
      })
    },
    onCancel() {
      this.setRead()
    }
  }
}
</script>
