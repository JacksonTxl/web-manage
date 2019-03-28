<template>
  <div class="pages-test-store container-basis">
    <div class="pages-test-store__container">
      <div class="pages-test-store__img-box">
        <img class="pages-test-store__sign-img pages-test-store__img" :src="signUrl" alt>
        <img class="pages-test-store__bg-img pages-test-store__img" :src="bgUrl" alt>
        <span class="pages-test-store__sign-icon">店招</span>
      </div>
      <div class="pages-test-store__info">
        <div class="pages-test-store__info-title">
          <span>营业中</span>
          <h2>上海旗舰店</h2>
        </div>
        <div class="pages-test-store__info-list">
          <span>门店电话</span>
          <span>1234568909753246</span>
        </div>
        <div class="pages-test-store__info-list">
          <span>门店电话</span>
          <span>1234568909753246</span>
        </div>
        <div class="pages-test-store__info-list">
          <span>门店电话</span>
          <span>1234568909753246</span>
        </div>
      </div>
    </div>

    <div>营业时间</div>
    <slider class="pages-test-store__slider"></slider>
    <slider class="pages-test-store__slider"></slider>
    <slider class="pages-test-store__slider"></slider>
    <slider class="pages-test-store__slider"></slider>
    <slider class="pages-test-store__slider"></slider>
  </div>
</template>

<script>
import slider from '../../components/slider/slider.vue'
export default {
  components: {
    slider
  },
  data() {
    return {
      disabled: true,
      signUrl:
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=234634259,4236876085&fm=27&gp=0.jpg',
      bgUrl:
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1986179278,1118313821&fm=27&gp=0.jpg'
    }
  },
  methods: {
    formatter(value) {
      return `${value}:00`
    }
  }
}
</script>
