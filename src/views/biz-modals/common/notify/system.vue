<template>
  <st-modal
    :wrapClassName="b()"
    v-model="show"
    @ok="onOk"
    width="640px"
    :footer="null"
  >
    <div :class="b('info')">
      <div :class="b('info-header')">
        <img
          src="https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/10000/2020-01-02/fhdsja___31695faaace9___.png"
          alt=""
        />
      </div>
      <div :class="b('info-content')">
        <st-t3 :class="b('title')">{{ info.title || '还没数据' }}</st-t3>
        <div :class="b('content')" class="mg-t16">
          {{ info.contnet || '还没数据' }}
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
          image_key:
            'http://sports.gtimg.com/shequ/duc2TvpEgSRpS2A8tEIc2eueTPusgmpzYZWUKu4mZqGmbfMR2HQRaibyapBpazeKh/0/0',
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
