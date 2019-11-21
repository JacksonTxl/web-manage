import BrandMarketingBind from '@/views/biz-modals/brand/marketing/bind'
import MarketingSharePoster from '@/views/biz-modals/brand/marketing/share-poster'
import MarketingQrCode from '@/views/biz-modals/brand/marketing/qr-code'
const useShare = () => {
  return {
    modals: {
      BrandMarketingBind,
      MarketingSharePoster,
      MarketingQrCode
    },
    methods: {
      $_openMarketingSharePoster({ shsInfo, shsPath }) {
        this.$modalRouter.push({
          name: 'marketing-share-poster',
          props: {
            shsInfo,
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
      qrCode({ qrCodeUrl }) {
        this.$_openQrCode({ qrCodeUrl })
      },
      poster({ isAuth, shsInfo, shsPath }) {
        debugger
        if (!isAuth) {
          this.$_openMarketingBind()
          return
        }
        this.$_openMarketingSharePoster({ shsInfo, shsPath })
      }
    }
  }
}

export default useShare
