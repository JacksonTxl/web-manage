import BrandMarketingBind from '@/views/biz-modals/brand/marketing/bind'
import MarketingSharePoster from '@/views/biz-modals/brand/marketing/share-poster'
import MarketingQrCode from '@/views/biz-modals/brand/marketing/qr-code'
/**
 * 小程序营销插件分享
 */
const useShare = () => {
  return {
    modals: {
      BrandMarketingBind,
      MarketingSharePoster,
      MarketingQrCode
    },
    methods: {
      $_openMarketingSharePoster({ shsInfo, hasQrCodeBtn, shsPath }) {
        this.$modalRouter.push({
          name: 'marketing-share-poster',
          props: {
            shsInfo,
            hasQrCodeBtn,
            shsPath
          }
        })
      },
      $_openMarketingBind() {
        this.show = false
        this.$modalRouter.push({
          name: 'brand-marketing-bind'
        })
      },
      $_openQrCode({ qrCodeUrl }) {
        this.$modalRouter.push({
          name: 'marketing-qr-code',
          props: {
            qrCodeUrl
          }
        })
      },
      /**
       * 分享小程序营销插件二维码
       * params.qrCodeUrl 二维码路径
       */
      qrCode({ isAuth, qrCodeUrl }) {
        if (!isAuth) {
          this.$_openMarketingBind()
          return
        }
        this.$_openQrCode({ qrCodeUrl })
      },
      /**
       * 分享小程序营销插件海报
       * params.isAuth 是否有分享海报权限
       * params.shsPath 请求shs服务二位码
       * params.shsInfo{
       *  qrcode_url: [小程序码参数字段一定是qrcode_url作为key名]
       * } 是否有分享海报权限
       *
       */
      poster({ isAuth, shsInfo, hasQrCodeBtn, shsPath }) {
        if (!isAuth) {
          this.$_openMarketingBind()
          return
        }
        this.$_openMarketingSharePoster({ shsInfo, hasQrCodeBtn, shsPath })
      }
    }
  }
}

export default useShare
