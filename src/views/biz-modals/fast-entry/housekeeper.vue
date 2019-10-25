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
        <!-- <img :class="b('code-img')" src="@/assets/img/fast-entry/code.png" alt="扫描二维码" /> -->
        <p class="mg-t16">
          扫描二维码
          <br />
          下载三体云管家App
        </p>
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
