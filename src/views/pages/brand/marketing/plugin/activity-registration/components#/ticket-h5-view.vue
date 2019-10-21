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
            <span class="discount-price">
              ¥{{ +ticket.ticket_price - +ticket.reduce_price }}
            </span>
            <span class="original-price">/¥{{ ticket.ticket_price }}</span>
            <span class="discount-terms">超过3张，每张减¥50</span>
          </div>
          <div :class="bItem('date')">
            售票时间：2019.06.22 19:30-2019.06.30 21:30
          </div>
          <div :class="bItem('remark')">
            备注说明：{{ ticket.ticket_remark }}
          </div>
        </div>
        <div class="contnet-mgt120"></div>
        <div :class="bComponent('footer')">
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
