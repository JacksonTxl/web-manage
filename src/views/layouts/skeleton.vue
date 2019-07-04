<template>
  <component :is="layoutComponent" class="layout-skeleton"></component>
</template>

<script>
import SkeletonBrand from './skeleton#/brand.vue'
import SkeletonShop from './skeleton#/shop.vue'

export default {
  components: {
    SkeletonBrand,
    SkeletonShop
  },
  computed: {
    type() {
      return 'brand'
    },
    layoutComponent() {
      return 'skeleton-' + this.type
    }
  }
}
</script>
