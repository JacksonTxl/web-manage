<template>
  <st-modal title="奖品设置" v-model="show" @ok="onSubmit" size="small">
    <st-form :form="form" labelGutter="0" labelWidth="84px">
      <st-form-item label="奖品名称" required>
        <a-input
          placeholder="请输入奖品名称"
          :disabled="info"
          v-decorator="decorators.prize_name"
        ></a-input>
      </st-form-item>
      <st-form-item label="奖品类型" required>
        <a-radio-group
          v-decorator="decorators.prize_type"
          @change="getCurPrizeType"
        >
          <a-radio
            v-for="(item, index) in prizeType"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
        <div>
          <a-select
            v-if="curPrizeType === 1"
            placeholder="请选择优惠卷"
            v-decorator="decorators.coupon_id"
          >
            <a-select-option
              v-for="(item, index) in couponList"
              :key="index"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
          <span v-else>
            获得当日起
            <a-input-number
              :min="1"
              :max="999"
              class="width100px"
              placeholder="输入天数"
              v-decorator="decorators.valid_days"
            ></a-input-number>

            天内有效
          </span>
        </div>
      </st-form-item>
      <st-form-item label="兑换门店" v-if="curPrizeType === 2" required>
        <a-radio-group
          v-decorator="decorators.is_shop_range"
          @change="getCurShopType"
        >
          <a-radio v-for="item in shops" :key="item.value" :value="item.value">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
        <select-shop
          :shopIds="shopIds"
          v-if="curShopType === 2"
          @change="onChangeShopSetting"
        ></select-shop>
      </st-form-item>
      <st-form-item label="奖品数量" required>
        <st-input-number
          :min="1"
          :max="99999"
          placeholder="请输入奖品数量"
          v-decorator="decorators.number"
        >
          <span slot="addonAfter">个</span>
        </st-input-number>
      </st-form-item>
      <st-form-item label="中奖概率" required>
        <!-- <a-input-number
          :min="0.01"
          :max="100"
          :decimalSeparator="2"
          placeholder="请输入中奖概率"
          v-decorator="decorators.rate"
        >
          <span slot="addonAfter">%</span>
        </a-input-number> -->
        <a-input
          type="number"
          :decimalSeparator="2"
          :min="0.01"
          :max="100"
          addonAfter="%"
        ></a-input>
      </st-form-item>
      <st-form-item label="奖品图片">
        <a-radio-group
          v-decorator="decorators.image_default"
          @change="getCurImgType"
        >
          <a-radio
            v-for="(item, index) in imgType"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
        <st-image-upload
          v-if="curImgType === 2"
          class="default-img"
          :list="fileList"
          @change="onChangeGetAvatar"
          :sizeLimit="2"
          placeholder="上传图片"
        ></st-image-upload>
        <img
          class="default-img"
          v-else
          :src="prize[0].image_url"
          alt="默认图片"
        />
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { AddPrizeService } from './add-prize.service'
import { ruleOptions } from './add-prize.config.ts'
import { PatternService } from '@/services/pattern.service'
import { cloneDeep } from 'lodash-es'
import SelectShop from '@/views/fragments/shop/select-shop.vue'
import { IMG_TYPE, SHOP_TYPE, PRIZE_TYPE } from '@/constants/marketing/lottery'
export default {
  name: 'BrandMarketingPoster',
  bem: {
    basic: 'brand-marketing-poster'
  },
  serviceInject() {
    return {
      addPrizeService: AddPrizeService,
      pattern: PatternService
    }
  },

  rxState() {
    return {
      shops: this.addPrizeService.shops$,
      prizeType: this.addPrizeService.prizeType$,
      imgType: this.addPrizeService.imgType$,
      prize: this.addPrizeService.prize$
    }
  },
  props: {
    info: {
      type: Object
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data(vm) {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      IMG_TYPE,
      PRIZE_TYPE,
      SHOP_TYPE,
      show: false,
      shopIds: [],
      fileList: [],
      couponList: [],
      curPrizeType: PRIZE_TYPE.CUSTOM,
      curImgType: IMG_TYPE.DEFAULT,
      curShopType: SHOP_TYPE.CUSTOM
    }
  },
  mounted() {
    if (this.info) {
      this.form.setFieldsValue({
        prize_name: this.info.prize_name,
        prize_type: this.info.prize_type,
        coupon_id: this.info.coupon_id,
        prize_id: this.info.prize_id,
        is_shop_range: this.info.is_shop_range,
        support_shop_ids: this.info.support_shop_ids,
        rate: this.info.rate,
        number: this.info.number,
        image: this.info.image,
        image_default: this.info.image_default
      })
    }
  },
  created() {
    this.getCouponList()
    if (this.info) {
      this.curImgType = this.info.image_default
      this.fileList[0] = this.info.prize
      this.shopIds = this.info.support_shop_ids
    }
  },
  components: { SelectShop },
  methods: {
    onChangeShopSetting(val) {
      this.shopIds = val
    },
    getCouponList() {
      return this.addPrizeService.getCouponList().subscribe(res => {
        this.couponList = res.list
      })
    },
    onChangeGetAvatar(imageFiles) {
      this.fileList = cloneDeep(imageFiles)
    },
    getCurPrizeType(e) {
      this.curPrizeType = e.target.value
    },
    getCurShopType(e) {
      this.curShopType = e.target.value
    },
    getCurImgType(e) {
      this.curImgType = e.target.value
    },
    onSubmit() {
      this.form.validate().then(value => {
        value.prize =
          this.curImgType === this.IMG_TYPE.CUSTOM
            ? this.fileList[0]
            : this.prize[0]
        value.support_shop_ids = this.shopIds
        this.$emit('change', value)
        this.show = false
      })
    }
  }
}
</script>
