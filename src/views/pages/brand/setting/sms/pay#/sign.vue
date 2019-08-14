<template>
  <div :class="bComponent()">
    <div :class="bComponent('setting')" v-if="!isShowSmsSetting">
      <div class="mg-b8">[短信签名]</div>
      <span>{{ signVal }}</span>
      <div class="ta-r">
        <span class="color-primary" @click="goSetting(1)">
          去设置
        </span>
      </div>
    </div>
    <div :class="bComponent('setting')" v-if="isShowSmsSetting">
      <div>[短信签名]</div>
      <a-input
        class="mg-t8 mg-b8"
        v-model="newSignVal"
        placeholder="请设置短信签名"
      />
      <div class="ta-r">
        <span class="mg-r8 color-primary" @click="goSetting(0)">取消</span>
        <span class="color-primary" @click="saveSign">保存</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BrandSettingSmsSign',
  bem: {
    bComponent: 'brand-setting-sms-sign'
  },
  data() {
    return {
      isShowSmsSetting: false,
      newSignVal: ''
    }
  },
  props: {
    signVal: {
      default: ''
    }
  },
  methods: {
    saveSign() {
      this.$emit('SmsSign', this.newSignVal)
      this.newSignVal = ''
      this.isShowSmsSetting = false
    },
    goSetting(para) {
      this.isShowSmsSetting = para
    }
  }
}
</script>
