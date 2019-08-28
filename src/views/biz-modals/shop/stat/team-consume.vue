<template>
  <st-modal
    title="消课价值（团）"
    size="small"
    v-model="show"
    wrapClassName="modal-shop-stat-team-consume"
  ></st-modal>
</template>

<script>
export default {
  name: 'ModalShopFinanceOrderCancel',
  bem: {
    basic: 'modal-shop-finance-order-cancel'
  },
  serviceInject() {
    return {}
  },
  rxState() {
    return {}
  },
  props: ['id'],
  data() {
    return {
      show: false
    }
  },
  computed: {},
  methods: {
    onSubmit() {}
  }
}
</script>
