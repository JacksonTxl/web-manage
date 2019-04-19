<template>
  <div class="pages-brand-shop-info container-basis">
    <div class="pages-brand-shop-info__container">
      <div class="pages-brand-shop-info__img-box">
        <img
          class="pages-brand-shop-info__sign-img pages-brand-shop-info__img"
          :src="shopInfo.shop_info.shop_images[0].image_url"
          alt
        >
        <div class="pages-brand-shop-info__Identification">
          <st-tag :type="shopStatusFun(shopInfo.shop_info.shop_status)"/>
        </div>
        <span class="pages-brand-shop-info__sign-icon">
          <span>
            <st-icon type="image-count"></st-icon>
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
          <span>{{shopInfo.shop_info.shop_phones.join(' ，')}}</span>
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
            <div
              v-for="(item,index) in shopInfo.shop_info.shop_services"
              :key="index"
              class="facilities"
            >
              <st-icon :type="item.img_url"></st-icon>
              <p>{{item.service_name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="shopInfo.shop_info.business_time.length">
      <div class="pages-brand-shop-info__time">营业时间</div>
      <a-row
        v-for="item in getSlider.business_time"
        class="pages-brand-shop-info-slider"
        :key="item.week_day"
      >
        <a-col :span="2" class="pages-brand-shop-info-slider-title">
          <span class="slider__title">{{WEEK[item.week_day]}}</span>
        </a-col>
        <a-col :span="18">
          <a-slider
            range
            :min="0"
            :max="24"
            :step="0.5"
            :defaultValue="getSliderInfoList(item)"
            :tipFormatter="formatter"
            :tooltipVisible="true"
            disabled
          />
        </a-col>
      </a-row>
    </template>
  </div>
</template>

<script>
import { InfoService } from '@/views/pages/brand/shop/info.service'
import { cloneDeep } from 'lodash-es'
export default {
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      shopInfo: this.infoService.shopInfo$
    }
  },
  data() {
    return {
      WEEK: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
  created() {
    this.getSlider.business_time = this.shopInfo.shop_info.business_time
  },
  methods: {
    shopStatusFun(flag) {
      const flagData = [
        'shop-trial',
        'shop-opening',
        'shop-presale',
        'shop-close'
      ]
      return flagData[flag - 1]
    },
    getSliderInfoList(item) {
      return [
        item.start_time.replace(/:00/gi, '').replace(/:30/gi, '.5') - 0,
        item.end_time.replace(/:00/gi, '').replace(/:30/gi, '.5') - 0
      ]
    },
    formatter(value) {
      const valueHalf =
        value > 9 ? `${parseInt(value)}:30` : `0${parseInt(value)}:30`
      const valueInt = value > 9 ? `${value}:00` : `0${value}:00`
      return value % 1 === 0 ? valueInt : valueHalf
    }
  }
}
</script>
