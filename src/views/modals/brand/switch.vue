<template>
  <a-modal
    title="请选择品牌"
    width="80%"
    :footer="null"
    class="modal-brand-switch"
    v-model="show"
  >
    <div class="brand-content">
      <a-row :gutter="80">
        <a-col :lg="8" v-for="n in 3" :key="n">
          <div class="brand-item">
            <img
              class="brand-item__img"
              src="~@/assets/img/logo.png"
              alt="brand-logo"
            />
            <st-t3 class="brand-item__title">KING KONG KIT</st-t3>
            <p class="brand-item__desc">门店数量：7</p>
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
  </a-modal>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    onClickItem() {
      console.log('click')
    }
  }
}
</script>
