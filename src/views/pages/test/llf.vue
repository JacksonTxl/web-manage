<template>
  <div>
    <st-status-text :status="{ success: 1 }">
      123456
    </st-status-text>
  </div>
</template>

<script>
import H5Container from '@/views/biz-components/h5/h5-container.vue'
export default {
  data() {
    return {
      select: ''
    }
  }
}
</script>
