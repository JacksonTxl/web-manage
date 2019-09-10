<template>
  <st-modal :title="title" v-model="show" width="400px" :footer="null">
    <div :class="basic()">
      <p>{{ message }}</p>
      <img v-if="!isLoading" :src="url" :class="activeClass" />
      <div v-else class="loading-state">
        <a-spin size="large" />
      </div>
      <div>
        <st-button
          block
          pill
          type="primary"
          icon="download"
          size="large"
          @click="downloadPoster"
        >
          {{ button }}
        </st-button>
      </div>
    </div>
  </st-modal>
</template>
<script>
import { PosterService } from './poster.service'
import { AppConfig } from '@/constants/config'
import { OssService } from '@/services/oss.service'
import { ShsService } from '@/services/shs.service'
import { POSTER } from '@/constants/brand/marketing'
export default {
  name: 'BrandMarketingPoster',
  bem: {
    basic: 'brand-marketing-poster'
  },
  serviceInject() {
    return {
      posterService: PosterService,
      appConfig: AppConfig,
      shsService: ShsService
    }
  },
  serviceProviders() {
    return [ShsService]
  },
  rxState() {
    return {
      loading: this.posterService.loading$,
      isLoading: this.shsService.loading$,
      token: this.posterService.token$,
      info: this.posterService.info$,
      qrcode: this.posterService.qrcode$
    }
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    id: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      POSTER,
      show: false,
      url: '',
      title: '分享海报',
      message:
        '复制和下载二维码，推广至微信朋友圈、微博等，或打印活动海报，张贴至门店，吸引顾客参与活动。',
      button: '下载海报',
      activeClass: 'poster'
    }
  },
  created() {
    if (this.type === this.POSTER.COUPON_TYPE) {
      this.posterService.getPosterInfo(this.id).subscribe(() => {
        this.shsService
          .getShsImage(
            {
              qrcode_url: this.info.qrcode_url,
              sub_name: this.info.sub_name
            },
            '/saas/lottery_poster'
          )
          .subscribe(res => {
            this.url = res
          })
      })
    } else if (this.type === this.POSTER.QRCODE_TYPE) {
      this.activeClass = 'qrcode'
      this.title = '小程序码'
      this.message =
        '将小程序码贴在宣城刊物、店内等任何地方，用户用手机扫一扫后，即可参与活动转化下单。'
      this.button = '下载小程序码'
      this.posterService.getQrcode(this.id).subscribe(res => {
        this.isLoading = false
        this.url = res.qrcode
      })
    }
  },

  methods: {
    downloadPoster() {
      const a = document.createElement('a')
      a.href = this.url
      a.target = '_blank'
      a.download = 'poster.png'
      a.click()

      // let image = new Image()
      // // 解决跨域 Canvas 污染问题
      // image.onload = function() {
      //   let canvas = document.createElement("canvas");
      //   canvas.width = image.width;
      //   canvas.height = image.height;
      //   let context = canvas.getContext("2d");
      //   context.drawImage(image, 0, 0, image.width, image.height);
      //   let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
      //   console.log('url', url)
      //   let a = document.createElement("a"); // 生成一个a元素
      //   let event = new MouseEvent("click"); // 创建一个单击事件
      //   a.download = "poster.png"; // 设置图片名称
      //   a.href = url; // 将生成的URL设置为a.href属性
      //   a.dispatchEvent(event); // 触发a的单击事件
      // }
      // image.src = this.url
    }
  }
}
</script>
