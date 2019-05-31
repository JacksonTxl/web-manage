<template>
  <st-form-item label="优惠券" class="global-form-item-text" labelGutter="12px">
    <div style="display: flex; justify-content: space-between;">
      <span>{{indexCoupon.price}}元</span>
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          {{coupon.length}}张可用优惠券
          <a-icon type="right"/>
        </a>
        <a-menu slot="overlay">
          <a-menu-item v-for="(item,index) in coupon" :key="index" @click="couponClick(item)">
            <a href="javascript:;">{{item.name}}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </st-form-item>
</template>

<script>
import { MembershipCardService } from '../membership-card.service'
export default {
  serviceInject() {
    return {
      membershipCardService: MembershipCardService
    }
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: ['value'],
  data() {
    return {
      coupon: [],
      indexCoupon: {}
    }
  },
  created() {
    this.membershipCardService
      .getOrderTransactionCoupon({ member_id: 1, product_type: 1 })
      .subscribe(res => {
        this.coupon = res.list
        this.indexCoupon = this.coupon[0]
        this.$emit('filterChange', {
          coupon: this.indexCoupon
        })
      })
  },
  methods: {
    couponClick(item) {
      this.indexCoupon = item
      this.$emit('filterChange', {
        coupon: item
      })
      console.log(item)
    }
  }
}
</script>
