<template>

  <div class="pages-brand-shop-info container-basis">
    <div class="pages-brand-shop-info__container">
      <div class="pages-brand-shop-info__img-box">
        <img class="pages-brand-shop-info__sign-img pages-brand-shop-info__img" :src="signUrl" alt>
        <div class="pages-brand-shop-info__Identification">
          <st-tag type="shop-trial" />
        </div>
        <span class="pages-brand-shop-info__sign-icon">
          <span>
            <st-icon type="home"></st-icon>
          </span>
          666
        </span>
      </div>
      <div class="pages-brand-shop-info__info">
        <div class="pages-brand-shop-info__info-title">
            <st-t3 style="display:inline-block">上海旗舰店</st-t3>
        </div>
        <div class="pages-brand-shop-info__info-list">
          <span>门店电话</span>
          <span>400-888999, 182520899999</span>
        </div>
        <div class="pages-brand-shop-info__info-list">
          <span>门店邮箱</span>
          <span>hurong@styd.cn</span>
        </div>
        <div class="pages-brand-shop-info__info-list">
          <span>门店地址</span>
          <span>上海市 徐汇区 徐汇区中山南二路107号抽换大厦3楼</span>
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
    <!-- {{shopInfo}} -->
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
      data: {
        code: 0,
        msg: 'success',
        data: {
          shop_name: '更新测试',
          shop_status: 0,
          lat: 2.374767,
          lng: 6.24567,
          business_status: '正常营业',
          shop_position: {
            province_id: 1,
            city_id: 2,
            district_id: 810012,
            address: '越界创意园',
            province_name: '香港特别行政区',
            city_name: '香港特别行政区',
            district_name: '元朗区',
            address_detail: '香港特别行政区香港特别行政区元朗区越界创意园'
          },
          email: 'test@gmail.com',
          shop_phones: ['13900000001', '13800000001'],
          business_time: [
            {
              week_day: 2,
              start_time: '10:00',
              end_time: '24:00'
            },
            {
              week_day: 5,
              start_time: '22:00',
              end_time: '24:00'
            }
          ],
          shop_services: [
            {
              service_id: 2,
              service_name: '停车场',
              img_url: ''
            },
            {
              service_id: 3,
              service_name: '桑拿房',
              img_url: 'xxxxxx'
            }
          ],
          'shop_image]': [
            {
              image_id: 7,
              image_url:
                'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/xxx.xxx.com/xxxx',
              cover_type: 2,
              image_key: 'xxx.xxx.com/xxxx'
            },
            {
              image_id: 8,
              image_url:
                'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/xxx.xxx.com/xxxx',
              cover_type: 2,
              image_key: 'xxx.xxx.com/xxxx'
            }
          ]
        }
      },
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
