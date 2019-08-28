<template>
  <st-modal
    title="上课节数（私）"
    size="small"
    v-model="show"
    wrapClassName="modal-shop-stat-personal-course"
  ></st-modal>
</template>

<script>
export default {
  name: 'PersonalCourse',
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
