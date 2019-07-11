<template>
  <div class="modal-staff">
    <a-row class="staff-info mg-b16" type="flex">
      <a-col class="staff-info__img" v-if="staff.avatar">
        <img :src="staff.avatar" alt="">
      </a-col>
      <a-col class="staff-info__content">
        <st-t3>{{staff.staff_name}}</st-t3>
        <div class="staff-identity">
          <span v-for="item in identity" :key="item.id" class="staff-identity__item mg-r8">{{item.name}}</span>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'StaffInfo',
  computed: {
    identity() {
      return this.staff.identity
    }
  },
  props: {
    staff: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
