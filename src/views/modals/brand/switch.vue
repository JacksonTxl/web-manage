<template>
  <st-modal
    title="请选择品牌"
    width="960px"
    :footer="null"
    wrapClassName="modal-brand-switch"
    v-model="show"
  >
    <div class="brand-content">
      <a-row :gutter="24">
        <a-col :lg="8" v-for="(brand, index) in brandInfo" :key="index">
          <div class="brand-item">
            <img
              class="brand-item__img"
              :src="brand.image_url | imgFilter({ w: 200 })"
              alt="brand-logo"
            />
            <st-t3 class="brand-item__title">{{ brand.brand_name }}</st-t3>
            <p class="brand-item__desc">门店数量：{{ brand.shop_num }}</p>
            <st-button
              @click="onClickItem"
              class="brand-item__btn"
              type="primary"
              >进入品牌</st-button
            >
          </div>
        </a-col>
      </a-row>
    </div>
  </st-modal>
</template>
<script>
import { SwitchService } from './switch.service'
import { Action } from 'rx-state'
import { switchMap, catchError, filter } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
export default {
  serviceInject() {
    return {
      switchService: SwitchService
    }
  },
  data() {
    return {
      show: false,
      brandInfo: []
    }
  },
  created() {
    this.switchService.getBrands().subscribe(res => {
      this.brandInfo = res.brand_info
    })
  },
  methods: {
    onClickItem() {
      console.log('click')
      this.$emit('change', { a: 1 })
    }
  }
}
</script>
