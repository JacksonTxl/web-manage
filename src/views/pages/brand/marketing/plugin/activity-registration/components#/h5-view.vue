<template>
  <div :class="bComponent()">
    <h5-container>
      <template v-slot:title>
        活动报名
      </template>
      <div :class="bComponent('content')">
        <img src="" alt="" />
        <div class="title"></div>
      </div>
    </h5-container>
  </div>
</template>

<script>
import H5Container from '@/views/biz-components/h5/h5-container'
export default {
  name: 'h5-view',
  bem: {
    bComponent: 'activity-h5-view'
  },
  components: {
    H5Container
  },
  props: {
    stepInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style></style>
