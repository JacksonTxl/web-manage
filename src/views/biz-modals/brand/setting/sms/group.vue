<template>
  <st-modal
    :bModal="bModal()"
    title="群发短信"
    v-model="show"
    @ok="save"
    @cancel="cancel"
    :footer="null"
  >
    <div>
      e w s
    </div>
  </st-modal>
</template>
<script>
export default {
  name: 'SettingSmsGroup',
  bem: {
    bModal: 'setting-sms-group'
  },
  props: {},

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
