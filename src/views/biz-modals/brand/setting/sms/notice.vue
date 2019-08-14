<template>
  <st-modal
    :bModal="bModal()"
    title="预览"
    v-model="show"
    @ok="save"
    width="450px"
    @cancel="cancel"
    :footer="null"
  >
    <div>
      <img :class="bModal('img')" :src="img" />
    </div>
  </st-modal>
</template>
<script>
export default {
  name: 'SettingSmsNotice',
  bem: {
    bModal: 'setting-sms-notice'
  },
  props: {
    img: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    save() {},
    cancel() {}
  }
}
</script>
