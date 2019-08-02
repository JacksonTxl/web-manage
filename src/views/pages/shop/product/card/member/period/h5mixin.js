import { cloneDeep } from 'lodash-es'
const unitEnum = {
  2: '天',
  3: '月',
  4: '年'
}
export default {
  data() {
    return {
      h5CardInfo: {
        card_name: '',
        admission_range: {},
        admission_shop_list: [],
        card_bg: {
          image_id: 0,
          image_key: this.member_card.card_bg_list.value[0].image_key,
          image_url: this.member_card.card_bg_list.value[0].image_url,
          index: 1
        },
        card_contents: '',
        card_introduction: '',
        price_gradient: [],
        price: {
          card_price: '',
          deadline: {}
        },
        can_use_shop: [],
        consumption_range: {},
        description: '',
        consumerList: []
      }
    }
  },
  watch: {
    cardIntroduction(val) {
      this.h5CardInfo.card_introduction = val
    },
    cardContents(val) {
      this.h5CardInfo.card_contents = val
    },
    cardBg(val) {
      this.h5CardInfo.card_bg = val
    },
    'cardData.price_setting'(val) {
      this.syncPrice()
    },
    'cardData.unit'(val) {
      let cardData = this.form.getFieldsValue().cardData
      let price = {
        card_price: cardData.card_price || '',
        deadline: {
          number: cardData.num || '',
          type: val
        }
      }
      this.h5CardInfo.price = price
    },
    'cardData.bg_image'(val) {
      this.h5CardInfo.card_bg = val
    },
    rallyPriceList: {
      deep: true,
      handler() {
        this.syncPrice()
      }
    },
    shopPriceList: {
      deep: true,
      handler() {
        this.syncPrice()
      }
    }
  },
  mounted() {
    this.h5CardInfo.admission_range = { id: 1, name: this.shopName.name }
  },
  methods: {
    initH5CardInfo() {
      let cardInfo = Object.assign({}, this.cardInfo)
      this.h5CardInfo.card_name = cardInfo.card_name
    },
    syncName(e) {
      this.h5CardInfo.card_name = e.target.value
    },
    syncPrice(values) {
      // 会员卡金额
      let p = []
      // 品牌统一定价
      if (this.cardType === 0) {
        this.rallyPriceList.forEach(i => {
          p.push({
            validity_period: +i.time.num + unitEnum[i.time.unit],
            sale_price: +i.rally_price + '元'
          })
        })
      } else if (this.cardType === 1) {
        this.rallyPriceList.forEach(i => {
          p.push({
            validity_times: `${+i.validity_times}次`,
            sale_price: +i.rally_price + '元'
          })
        })
      }
      this.h5CardInfo.price_gradient = cloneDeep(p)
    },
    syncConsumer(checkValue) {
      console.log(checkValue)
      let consumerEnum = this.deposit_card.consumer_type.value
      this.h5CardInfo.consumerList = checkValue.map(item => consumerEnum[item])
    }
  }
}
