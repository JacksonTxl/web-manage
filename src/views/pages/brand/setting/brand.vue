<template>
  <st-panel app>
    <a-row :gutter="8" class="page-brand-info">
      <a-col :span="14" :push="5" align="center">
        <p v-viewer="{ url: 'data-src' }">
          <img :src="brand.image_url|imgFilter({ w: 200 })" class="page-brand-info__brand-logo"
            :data-src="brand.image_url|imgFilter({ w: 800 })">
        </p>
        <h2 class="page-brand-info__brand-name">{{brand.brand_name}}</h2>
        <p class="page-brand-info__certification">
          <i class="st-icon-certified"></i>
          <span class="page-brand-info__certification-text mg-l4">已认证</span>
        </p>
        <p class="page-brand-info__des">{{brand.description}}</p>
        <p class="page-brand-info__contact">{{brand.staff_name}}</p>
        <p class="page-brand-info__tel">{{brand.mobile}}</p>
        <st-button type="primary" ghost class="mg-t32" @click="onEdit">编辑</st-button>
      </a-col>
    </a-row>
  </st-panel>
</template>
<script>
import { imgFilter } from '@/filters/resource.filters'
import { BrandService } from './brand.service'
export default {
  serviceInject() {
    return {
      brandService: BrandService
    }
  },
  filters: {
    imgFilter
  },
  data() {
    return {
      brand: {}
    }
  },
  subscriptions() {
    return {
      brand: this.brandService.brand$
    }
  },
  methods: {
    onEdit() {
      this.$router.push('/brand/setting/set')
    }
  }
}

</script>
