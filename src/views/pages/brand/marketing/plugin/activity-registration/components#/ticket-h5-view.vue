<template>
  <div :class="bComponent()">
    <h5-container>
      <template v-slot:title>
        选择票种
      </template>
      <div :class="bComponent('content')">
        <div :class="bItem()" v-for="(ticket, index) in stepInfo" :key="index">
          <st-t3 :class="bItem('title')">
            {{ ticket.ticket_name }}
          </st-t3>
          <div :class="bItem('price-info')">
            <span v-if="ticket.reduce_price" class="discount-price">
              ¥ xxx
            </span>
            <span class="discount-price" v-else>
              ¥{{ ticket.ticket_price }}
            </span>
            <span class="original-price" v-if="ticket.reduce_price">
              /¥{{ ticket.ticket_price }}
            </span>
            <span class="discount-terms" v-if="ticket.group_buy_min">
              超过{{ ticket.group_buy_min }}张，每张减¥{{ ticket.reduce_price }}
            </span>
          </div>
          <div :class="bItem('date')">
            售票时间：{{ ticket.buy_start_time }} - {{ ticket.buy_end_time }}
          </div>
          <div :class="bItem('remark')">
            备注说明：{{ ticket.ticket_remark }}
          </div>
        </div>
        <div class="contnet-mgt120"></div>
        <div :class="bComponent('footer')">
          <div class="footer__count">
            <span class="price">¥2000</span>
            <i class="reduce">优惠减¥500</i>
          </div>
          <st-button pill class="footer__button" type="primary">
            下一步
          </st-button>
        </div>
      </div>
    </h5-container>
  </div>
</template>

<script>
import H5Container from '@/views/biz-components/h5/h5-container'
export default {
  name: 'TicketH5View',
  bem: {
    bComponent: 'component-ticket-h5-view',
    bItem: 'ticket-item'
  },
  components: {
    H5Container
  },
  filters: {
    filterPrice(ticket) {
      return +ticket.ticket_price - ticket.reduce_price <= 0.1
        ? 0.1
        : +ticket.ticket_price - +ticket.reduce_price
    }
  },
  props: {
    stepInfo: {
      type: Array,
      default: () => {
        return [
          {
            ticket_name: '票种名'
          }
        ]
      }
    }
  }
}
</script>
