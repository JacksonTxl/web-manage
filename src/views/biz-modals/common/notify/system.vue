<template>
  <st-modal
    :wrapClassName="b()"
    v-model="show"
    @ok="onOk"
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
        <div :class="b('content')" class="mg-t16">
          {{ info.content }}
        </div>
        <div :class="b('button-wapper')">
          <st-button type="primary" class="mg-t24" @click="onOk">
            我知道了
          </st-button>
        </div>
      </div>
    </div>
  </st-modal>
</template>

<script>
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
    onOk() {
      this.show = false
      this.$emit('success')
    }
  }
}
</script>
