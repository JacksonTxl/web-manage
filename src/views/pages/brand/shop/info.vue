<template>

  <div class="pages-brand-shop-info container-basis">
    <div class="pages-brand-shop-info__container">
      <div class="pages-brand-shop-info__img-box">
        <img class="pages-brand-shop-info__sign-img pages-brand-shop-info__img" :src="shopInfo.shop_info.shop_images[0].image_url" alt>
        <div class="pages-brand-shop-info__Identification">
          <st-tag type="shop-trial" />
        </div>
        <span class="pages-brand-shop-info__sign-icon">
          <span>
            <st-icon type="home"></st-icon>
          </span>
          {{shopInfo.shop_info.shop_images.length}}
        </span>
      </div>
      <div class="pages-brand-shop-info__info">
        <div class="pages-brand-shop-info__info-title">
            <st-t3 style="display:inline-block">{{shopInfo.shop_info.shop_name}}</st-t3>
        </div>
        <div class="pages-brand-shop-info__info-list">
          <span>门店电话</span>
          <span>{{shopInfo.shop_info.shop_phones.join(', ')}}</span>
        </div>
        <div class="pages-brand-shop-info__info-list">
          <span>门店邮箱</span>
          <span>{{shopInfo.shop_info.email}}</span>
        </div>
        <div class="pages-brand-shop-info__info-list">
          <span>门店地址</span>
          <span>{{shopInfo.shop_info.shop_position.address_detail}}</span>
          <a>查看定位</a>
        </div>
        <div class="pages-brand-shop-info__info-list">
          <span class="pages-brand-shop-info__info-facilities">门店设施</span>
          <div class="pages-brand-shop-info__info-facilities-list">
            <div>
              <st-icon type="home"></st-icon>
              <p>Wi-Fi</p>
            </div>
            <div>
              <st-icon type="home"></st-icon>
              <p>空调</p>
            </div>
            <div>
              <st-icon type="home"></st-icon>
              <p>充电宝</p>
            </div>
            <div>
              <st-icon type="home"></st-icon>
              <p>无烟区</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pages-brand-shop-info__time">营业时间</div>
    <st-slider class="pages-brand-shop-info__slider" :getSlider="getSlider"></st-slider>
    {{shopInfo}}
  </div>
</template>

<script>
import { InfoService } from '@/views/pages/brand/shop/info.service'
export default {
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  subscriptions() {
    return {
      shopInfo: this.infoService.shopInfo$
    }
  },
  data() {
    return {
      sliderArr: [],
      getSlider: {
        disabled: true,
        infoList: [
          {
            title: '周一',
            value: [0, 13]
          },
          {
            title: '周二',
            value: [6, 13]
          },
          {
            title: '周三',
            value: [12, 13.5]
          },
          {
            title: '周四',
            value: [18, 24]
          }
        ],
        business_time: [
          {
            week_day: 2,
            start_time: '10:00',
            end_time: '24:00'
          },
          {
            week_day: 5,
            start_time: '22:30',
            end_time: '24:00'
          }
        ]
      },
      signUrl:
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=234634259,4236876085&fm=27&gp=0.jpg',
      bgUrl:
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1986179278,1118313821&fm=27&gp=0.jpg'
    }
  },
  created() {},
  methods: {}
}
</script>
