<template>
  <div class="pages-test-store">
    <a-row>
      <a-col :span="24">
        <div class="pages-test-store__img-box">
          <img
            class="pages-test-store__sign-img pages-test-store__img"
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=234634259,4236876085&fm=27&gp=0.jpg"
            alt
          >
          <img
            class="pages-test-store__bg-img pages-test-store__img"
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1986179278,1118313821&fm=27&gp=0.jpg"
            alt
          >
          <span class="pages-test-store__sign-icon">店招</span>
        </div>
      </a-col>
      <a-col :span="24">
        <div>营业时间</div>
        <slider class="pages-test-store__slider"></slider>
        <slider class="pages-test-store__slider"></slider>
        <slider class="pages-test-store__slider"></slider>
        <slider class="pages-test-store__slider"></slider>
        <slider class="pages-test-store__slider"></slider>
      </a-col>
    </a-row>
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
      disabled: true
    }
  },
  methods: {
    formatter(value) {
      return `${value}:00`
    }
  }
}
</script>
