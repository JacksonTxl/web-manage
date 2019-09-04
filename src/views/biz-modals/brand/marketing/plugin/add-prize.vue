<template>
  <st-modal title="奖品设置" v-model="show" @ok="onSubmit">
    <div :class="basic()">
      <st-form :form="form" labelGutter="0">
        <st-form-item label="奖品名称" labelWidth="84px" required>
          <a-input
            placeholder="请输入奖品名称"
            v-decorator="decorators.prize_name"
          ></a-input>
        </st-form-item>
        <st-form-item label="奖品类型" labelWidth="84px" required>
          <a-radio-group v-decorator="decorators.prize_type">
            <a-radio
              v-for="(item, index) in prizeType"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </a-radio>
          </a-radio-group>
        </st-form-item>
        <st-form-item label="售卖门店" labelWidth="84px" required>
          <a-radio-group v-decorator="decorators.support_shop_ids">
            <a-radio
              v-for="item in shops"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-radio>
          </a-radio-group>
        </st-form-item>
        <st-form-item label="奖品数量" labelWidth="84px" required>
          <a-input
            placeholder="请输入奖品数量"
            v-decorator="decorators.number"
          ></a-input>
        </st-form-item>
        <st-form-item label="中奖概率" labelWidth="84px" required>
          <a-input
            placeholder="请输入中奖概率"
            v-decorator="decorators.rate"
          ></a-input>
        </st-form-item>
        <st-form-item label="奖品图片" labelWidth="84px">
          <a-radio-group v-decorator="decorators.image">
            <a-radio
              v-for="(item, index) in imgType"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </a-radio>
          </a-radio-group>
        </st-form-item>
      </st-form>
    </div>
  </st-modal>
</template>
<script>
import { AddPrizeService } from './add-prize.service'
import { ruleOptions } from './add-prize.config.ts'
import { PatternService } from '@/services/pattern.service'

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
      imgType: this.addPrizeService.imgType$
    }
  },
  props: {
    info: {
      type: Object
    }
  },
  data(vm) {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false
    }
  },
  mounted() {
    this.form.setFieldsValue({
      prize_name: this.info.prize_name,
      prize_type: this.info.prize_type,
      coupon_id: this.info.coupon_id,
      prize_id: this.info.prize_id,
      is_shop_range: this.info.is_shop_range,
      support_shop_ids: this.info.support_shop_ids,
      rate: this.info.rate,
      number: this.info.number,
      image: this.info.image
    })
  },
  methods: {
    onSubmit() {
      this.form.validate().then(value => {
        this.$emit('change', value)
        this.show = false
      })
    }
  }
}
</script>
