<template>
  <div class="pages-test-store container-basis">
    <div class="pages-test-store__container">
      <div class="pages-test-store__img-box">
        <img class="pages-test-store__sign-img pages-test-store__img" :src="signUrl" alt>
        <!-- <img class="pages-test-store__bg-img pages-test-store__img" :src="bgUrl" alt> -->
        <span class="pages-test-store__sign-icon">
          <span>
            <st-icon type="home"></st-icon>
          </span>
          666
        </span>
      </div>
      <div class="pages-test-store__info">
        <div class="pages-test-store__info-title">
          <span>营业中</span>
          <h2>上海旗舰店</h2>
        </div>
        <div class="pages-test-store__info-list">
          <span>门店电话</span>
          <span>400-888999, 182520899999</span>
        </div>
        <div class="pages-test-store__info-list">
          <span>门店邮箱</span>
          <span>hurong@styd.cn</span>
        </div>
        <div class="pages-test-store__info-list">
          <span>门店地址</span>
          <span>上海市 徐汇区 徐汇区中山南二路107号抽换大厦3楼</span>
          <a>查看定位</a>
        </div>
        <div class="pages-test-store__info-list">
          <span class="pages-test-store__info-facilities">门店设施</span>
          <div class="pages-test-store__info-facilities-list">
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
    <div class="pages-test-store__time">营业时间</div>
    <slider class="pages-test-store__slider" :getSlider="getSlider"></slider>
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
      sliderArr: [],
      getSlider: {
        disabled: false,
        infoList: [
          {
            title: '周一',
            value: [0.5, 13],
            week: [
              {
                key: '周一',
                disabled: true
              },
              {
                key: '周二',
                disabled: false
              },
              {
                key: '周三',
                disabled: false
              },
              {
                key: '周四',
                disabled: false
              },
              {
                key: '周五',
                disabled: true
              },
              {
                key: '周六',
                disabled: true
              },
              {
                key: '周日',
                disabled: true
              }
            ]
          },
          {
            title: '周二',
            value: [6, 13],
            week: [
              {
                key: '周一',
                disabled: true
              },
              {
                key: '周二',
                disabled: false
              },
              {
                key: '周三',
                disabled: false
              },
              {
                key: '周四',
                disabled: false
              },
              {
                key: '周五',
                disabled: true
              },
              {
                key: '周六',
                disabled: true
              },
              {
                key: '周日',
                disabled: true
              }
            ]
          },
          {
            title: '周三',
            value: [12, 13.5]
          },
          {
            title: '周四',
            value: [18, 24]
          }
          // {
          //   title: '周五',
          //   value: [9, 13]
          // },
          // {
          //   title: '周六',
          //   value: [5, 13]
          //   // week: [
          //   //   {
          //   //     key: '周一',
          //   //     disabled: false
          //   //   },
          //   //   {
          //   //     key: '周二',
          //   //     disabled: false
          //   //   },
          //   //   {
          //   //     key: '周三',
          //   //     disabled: true
          //   //   },
          //   //   {
          //   //     key: '周四',
          //   //     disabled: true
          //   //   },
          //   //   {
          //   //     key: '周五',
          //   //     disabled: false
          //   //   },
          //   //   {
          //   //     key: '周六',
          //   //     disabled: true
          //   //   },
          //   //   {
          //   //     key: '周日',
          //   //     disabled: true
          //   //   }
          //   // ]
          // },
          // {
          //   title: '周日',
          //   value: [6, 24]
          // }
        ]
      },
      signUrl:
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=234634259,4236876085&fm=27&gp=0.jpg',
      bgUrl:
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1986179278,1118313821&fm=27&gp=0.jpg'
    }
  },
  created() {
    this.tooltip()
  },
  methods: {
    formatter(value) {
      return `${value}:00`
    },
    tooltip() {
      let self = this
      this.$nextTick(function() {
        setTimeout(() => {
          let tooltipEle = document.getElementsByClassName(
            'ant-tooltip-placement-top'
          )
          for (let i = 0; i <= tooltipEle.length; i++) {
            if (tooltipEle[i]) {
              tooltipEle[i].classList.add('st-slider')
            }
          }
        })
      })
    }
  }
}
</script>
