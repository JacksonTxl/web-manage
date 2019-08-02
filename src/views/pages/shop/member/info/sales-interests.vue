<template>
  <div class="member-info-sales-interests">
    <div class="member-info-sales-interests-item">
      <st-t2 class="member-info-sales-interests-item__padding">优惠劵</st-t2>
      <st-t4 class="member-info-sales-interests-item__padding">
        可用优惠劵:{{ couponCount.can_use }}
      </st-t4>
      <st-t4 class="member-info-sales-interests-item__padding">
        已使用优惠劵:{{ couponCount.used }}
      </st-t4>
      <st-t4 class="member-info-sales-interests-item__padding">
        过期优惠券:{{ couponCount.expire }}
      </st-t4>
    </div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <st-table
          rowKey=""
          :dataSource="couponList"
          :columns="coupon"
          :page="page"
          @change="onPageChange"
        ></st-table>
      </a-col>
    </a-row>
    <!-- <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>

    <div class="member-info-sales-interests-item">
      <st-t2 class="member-info-sales-interests-item__padding">积分</st-t2>
      <st-t4 class="member-info-sales-interests-item__padding">可用积分:{{1}}</st-t4>
      <st-t4 class="member-info-sales-interests-item__padding">消耗积分:{{5}}</st-t4>
      <st-t4 class="member-info-sales-interests-item__padding">过期积分:{{4}}</st-t4>
    </div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-table rowKey="age" :dataSource="data" :columns="integral" :pagination="false">
          <span
            slot="age"
            slot-scope="text"
            :style="text < 0 ? 'color:#3dd49f':'color:#FF5E41' "
          >{{text >= 0 ? '+' + text: text}}</span>
        </a-table>
      </a-col>
    </a-row> -->
  </div>
</template>
<script>
import { SalesInterestsService } from './sales-interests.service'
import { coupon, integral } from './sales-interests.config'
export default {
  serviceInject() {
    return {
      salesInterrests: SalesInterestsService
    }
  },
  rxState() {
    return {
      couponList: this.salesInterrests.couponList$,
      couponCount: this.salesInterrests.couponCount$,
      page: this.salesInterrests.page$
    }
  },
  computed: {
    coupon,
    integral
  },
  methods: {
    onPageChange(e) {
      this.$router.push({
        query: {
          id: this.$route.query.id,
          size: e.size,
          page: e.current_page
        }
      })
    }
  },
  mounted() {
    console.log(this.$route.query.id)
  }
}
</script>
