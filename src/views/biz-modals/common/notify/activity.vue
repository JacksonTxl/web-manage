<template>
  <st-modal :wrapClassName="b()" v-model="show" width="728px" :footer="null">
    <div :class="b('arrow-left')" @click="onClickLeft">
      <st-icon type="arrow-left" class="arrow-left-out" />
    </div>
    <div :class="b('notify-img')">
      {{ list$ }}
      <swiper :options="sliderOptions">
        <swiper-slide v-for="(item, index) in showData" :key="index">
          <div>
            <img :src="item.src" alt="" width="728" height="400" />
          </div>
        </swiper-slide>
        <div
          class="swiper-pagination swiper-pagination-h"
          slot="pagination"
        ></div>
        <div
          class="swiper-notify-button-prev swiper-button-prev"
          slot="button-prev"
        >
          <st-icon type="arrow-left" color="#fff" class="arrow-left" />
        </div>
        <div
          class="swiper-notify-button-next swiper-button-next"
          slot="button-next"
        >
          <st-icon type="arrow-right" color="#fff" class="arrow-right" />
        </div>
      </swiper>
    </div>
    <div :class="b('arrow-right')" @click="onClickRight">
      <st-icon type="arrow-right" class="arrow-left-out" />
    </div>
  </st-modal>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { ActivityService } from './activity.service'
export default {
  name: 'ModalActivity',
  bem: {
    b: 'modal-activity'
  },
  components: {
    swiper,
    swiperSlide
  },
  serviceInject() {
    return {
      service: ActivityService
    }
  },
  rxState() {
    const { list$ } = this.service
    return {
      list$
    }
  },
  computed: {
    sliderOptions() {
      return {
        navigation: {
          nextEl: '.swiper-notify-button-next',
          prevEl: '.swiper-notify-button-prev'
        },
        pagination: {
          el: '.swiper-pagination-h',
          clickable: true
        },
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false
        // },
        spaceBetween: 30,
        centeredSlides: true
      }
    }
  },
  data() {
    return {
      show: true,
      notifyConfig: {},
      showData: [
        {
          src: 'https://b-gold-cdn.xitu.io/v3/static/img/frontend.1dae74a.png'
        },
        {
          src: 'https://b-gold-cdn.xitu.io/v3/static/img/frontend.1dae74a.png'
        },
        { src: 'https://b-gold-cdn.xitu.io/v3/static/img/frontend.1dae74a.png' }
      ]
    }
  },
  methods: {
    onClickLeft() {
      const $s = this.$el.querySelector.bind(this.$el)
      console.log(this)
      $s('.swiper-notify-button-prev').onClick()
    },
    onClickRight() {
      this.$el.querySelector('.swiper-notify-button-next').onClick()
    }
  },
  created() {
    this.service.getNoticeList().subscribe()
  }
}
</script>
