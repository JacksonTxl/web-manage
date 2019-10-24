<template>
  <st-modal
    title="三体云管家"
    class="modal-fast-entry-housekeeper"
    v-model="show"
    :footer="null"
    width="320px"
  >
    <div>
      <div :class="b('wrapper')">
        <img :class="b('code-img')" :src="pic" alt="扫描二维码" />
        <p :class="b('tips')" class="mg-t16">
          扫描二维码
          <br />
          下载三体云管家App
        </p>
      </div>
    </div>
  </st-modal>
</template>
<script>
import codeImg from '@/assets/img/fast-entry/code.png'
export default {
  name: 'FastEntryHousekeeper',
  bem: {
    b: 'modal-fast-entry-housekeeper'
  },
  serviceInject() {
    return {}
  },
  rxState() {
    return {}
  },
  data() {
    return {
      show: false,
      pic: codeImg
    }
  },
  created() {},
  methods: {
    cancel() {
      this.show = false
    }
  }
}
</script>
