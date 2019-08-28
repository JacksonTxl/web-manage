<template>
  <st-modal
    title="上课节数（团）"
    size="small"
    v-model="show"
    wrapClassName="modal-shop-stat-team-course"
  ></st-modal>
</template>

<script>
export default {
  name: 'TeamCourse',
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
