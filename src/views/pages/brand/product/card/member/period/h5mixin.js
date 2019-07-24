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
    'cardData.card_introduction'(val) {
      this.h5CardInfo.card_introduction = val
    },
    'cardData.card_contents'(val) {
      this.h5CardInfo.card_contents = val
    },
    'cardData.description'(val) {
      this.h5CardInfo.description = val
    },
    'cardData.card_bg'(val) {
      console.log(val)
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
  methods: {
    initH5CardInfo() {
      let cardInfo = Object.assign({}, this.cardInfo)
      this.h5CardInfo.card_name = cardInfo.card_name
      this.syncAdmission()
      if (this.cardType === 2) {
        let price = {
          card_price: cardInfo.card_price,
          deadline: {
            number: cardInfo.num,
            type: cardInfo.unit
          }
        }
        this.h5CardInfo.price = price
        cardInfo.card_consumer_id && this.syncConsumer(cardInfo.card_consumer_id)
      }
    },
    syncName(e) {
      this.h5CardInfo.card_name = e.target.value
    },
    syncDeadlineNum(value) { // 储值卡金额
      let cardData = this.form.getFieldsValue().cardData
      let price = {
        card_price: cardData.card_price || '',
        deadline: {
          number: value,
          type: this.cardData.unit
        }
      }
      this.h5CardInfo.price = price
    },
    syncDepositPrice(value) { // 储值卡金额
      let cardData = this.form.getFieldsValue().cardData
      let price = {
        card_price: value,
        deadline: {
          number: cardData.num || '',
          type: this.cardData.unit
        }
      }
      this.h5CardInfo.price = price
    },
    syncPrice(values) { // 会员卡金额
      let p = []
      switch (this.cardData.price_setting) {
        case 1:
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
          break
        case 2:
          // 门店自主定价
          if (this.cardType === 0) {
            this.shopPriceList.forEach(i => {
              p.push({
                validity_period: +i.time.num + unitEnum[i.time.unit],
                sale_price: `${+i.rally_price.min_price}元~${+i.rally_price.max_price}元`
              })
            })
          } else if (this.cardType === 1) {
            this.shopPriceList.forEach(i => {
              p.push({
                validity_times: `${+i.validity_times}次`,
                sale_price: `${+i.rally_price.min_price}元~${+i.rally_price.max_price}元`
              })
            })
          }
          break
      }
      this.h5CardInfo.price_gradient = cloneDeep(p)
    },
    syncAdmission() {
      if (this.cardType === 2) {
        let rangeId = this.cardData.consumption_range
        switch (rangeId) {
          case 1:
            this.h5CardInfo.consumption_range = { id: 1, name: '仅消费门店' }
            break
          case 2:
            this.h5CardInfo.consumption_range = { id: 2, name: '多门店' }
            break
          case 3:
            this.h5CardInfo.consumption_range = { id: 3, name: '全门店' }
            break
        }
      } else {
        let rangeId = this.cardData.admission_range
        switch (rangeId) {
          case 1:
            this.h5CardInfo.admission_range = { id: 1, name: '仅消费门店' }
            break
          case 2:
            this.h5CardInfo.admission_range = { id: 2, name: '多门店' }
            break
          case 3:
            this.h5CardInfo.admission_range = { id: 3, name: '全门店' }
            break
        }
      }
    },
    syncAdmissionShop() {
      if (this.cardType === 2) {
        let shopIDs = this.cardData.consumer_shop_list
        if (shopIDs.length) {
          this.addService.getShopBasic({ shop_ids: shopIDs }).subscribe(res => {
            this.h5CardInfo.can_use_shop = res
          })
        }
      } else {
        let shopIDs = this.cardData.admission_shop_list
        if (shopIDs.length) {
          this.addService.getShopBasic({ shop_ids: shopIDs }).subscribe(res => {
            this.h5CardInfo.admission_shop_list = res
          })
        }
      }
    },
    syncConsumer(checkValue) {
      console.log(checkValue)
      let consumerEnum = this.deposit_card.consumer_type.value
      this.h5CardInfo.consumerList = checkValue.map(item => consumerEnum[item])
    }
  }
}
