<template>
  <st-form-item label="定金抵扣" class="global-form-item-text" labelGutter="12px">
    <div style="display: flex; justify-content: space-between;">
      <span>{{indexAdvance.price}}元</span>
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          定金选择
          <a-icon type="right"/>
        </a>
        <a-menu slot="overlay">
          <a-menu-item v-for="(item,index) in advance" :key="index" @click="couponClick(item)">
            <a href="javascript:;">{{item.price}}</a>
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
      advance: [],
      indexAdvance: {}
    }
  },
  created() {
    this.membershipCardService
      .getOrderTransactionAdvance({ member_id: 1 })
      .subscribe(res => {
        this.advance = res.list
        this.indexAdvance = this.advance[0]
        this.$emit('filterChange', {
          advance: this.indexAdvance
        })
      })
  },
  methods: {
    couponClick(item) {
      this.indexCoupon = item
      this.$emit('filterChange', {
        advance: item
      })
      console.log(item)
    }
  }
}
</script>
