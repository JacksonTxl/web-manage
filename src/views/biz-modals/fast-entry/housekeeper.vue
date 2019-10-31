<template>
  <st-modal
    title="三体云管家"
    class="modal-fast-entry-housekeeper"
    v-model="show"
    :footer="null"
    width="504px"
  >
    <div>
      <div :class="b('wrapper')">
        <div :class="b('code_pic')">
          <img
            :class="b('code-img')"
            src="@/assets/img/fast-entry/android.png"
            alt="扫描二维码"
          />
          <img
            :class="b('code-img')"
            src="@/assets/img/fast-entry/ios.png"
            alt="扫描二维码"
          />
        </div>
        <p class="mg-t24">扫描二维码，下载三体云管家App</p>
      </div>
    </div>
  </st-modal>
</template>
<script>
export default {
  name: 'FastEntryHousekeeper',
  bem: {
    b: 'modal-fast-entry-housekeeper'
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    cancel() {
      this.show = false
    }
  }
}
</script>
