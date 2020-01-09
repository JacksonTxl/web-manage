<template>
  <div :class="b()">
    <div :class="right()">
      <div :class="right('top')">
        <st-t2>代预约</st-t2>
        <st-table
          :class="right('table')"
          :columns="columns"
          :dataSource="selectedList"
          rowKey="id"
          :pagination="false"
          :scroll="{ y: 148 }"
        >
          <div slot="action" slot-scope="text, record">
            <st-table-actions>
              <a @click="deleteRow(record)">
                删除
              </a>
            </st-table-actions>
          </div>
        </st-table>
        <div :class="right('sum')">
          <span v-if="sum">{{ `总额：¥${sum}` }}</span>
        </div>
        <st-hr></st-hr>
        <st-form :form="form" labelWidth="88px">
          <member-search
            label="购买会员"
            :form="form"
            :decorators="decorators"
            :fields="{ member_id: 'member_id' }"
            type="transaction"
          ></member-search>
          <st-form-item label="减免">
            <st-input-number
              :float="true"
              v-model="reduce_price"
              placeholder="请输入减免金额"
            >
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0">
            <a-textarea
              placeholder="请填写备注"
              v-decorator="decorators.description"
              :autosize="{ minRows: 4, maxRows: 6 }"
            />
          </st-form-item>
        </st-form>
      </div>
      <div :class="right('footer')">
        <div class="price">
          <span>共{{ selectedList.length }}件商品&nbsp;合计：</span>
          <span class="font-number">&yen;{{ finalAmount }}</span>
        </div>
        <div class="button">
          <st-button
            v-if="auth.reserve"
            @click="onCreateOrder"
            :loading="loading.createOrder"
          >
            预约
          </st-button>
          <st-button
            v-if="auth.pay"
            type="primary"
            @click="onPay"
            :loading="loading.createPay"
          >
            预约并收款
          </st-button>
        </div>
      </div>
    </div>
    <div :class="b('left')" id="booking-left">
      <a-radio-group
        :value="query.venues_id"
        id="booking-left-venue"
        @change="selectHandler"
      >
        <a-radio-button
          v-for="(item, index) in venueList"
          :key="index"
          :value="item.venues_id"
        >
          {{ item.venues_name }}
        </a-radio-button>
      </a-radio-group>
      <div :class="calendar()" id="booking-left-calendar">
        <div :class="calendar('wrapper')">
          <swiper :options="sliderOptions">
            <swiper-slide v-for="(item, index) in calendarData" :key="index">
              <div
                :class="[calendar('date'), { act: pickedIndex === index }]"
                @click="pickDate(item, index)"
              >
                <div :class="calendar('week')">{{ item.week }}</div>
                <div :class="calendar('day')">{{ item.day }}</div>
              </div>
            </swiper-slide>
          </swiper>
          <div
            class="swiper-button-prev swiper-booking-button-prev"
            slot="button-prev"
          >
            <div :class="calendar('icon')">
              <st-icon type="arrow-left" class="arrow-left" />
            </div>
          </div>

          <div
            class="swiper-button-next swiper-booking-button-next"
            slot="button-next"
          >
            <div :class="calendar('icon')">
              <st-icon type="arrow-right" class="arrow-right" />
            </div>
          </div>
        </div>
      </div>

      <div :class="list()">
        <a-spin :class="list('loading')" :spinning="loading.getBookingList">
          <booking-table
            ref="bookingTable"
            :data="bookingList"
            :siteX="siteX"
            :siteY="siteY"
            :query="query"
            :selectedData="selectedList"
            @change="getSelectedList"
            @nextPage="onNextPage"
          ></booking-table>
        </a-spin>
      </div>
    </div>
  </div>
</template>
<script>
import { BookingService } from './booking.service'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import moment from 'moment'
import bookingTable from './components#/booking-table'
import memberSearch from '@/views/biz-components/member-search/member-search'
import { ruleOptions, columns } from './booking.config'
import SoldDealGatheringTip from '@/views/biz-modals/sold/deal/gathering-tip'
import SoldDealGathering from '@/views/biz-modals/sold/deal/gathering'
import { PatternService } from '@/services/pattern.service'
export default {
  name: 'PageShopAppVenueBooking',
  bem: {
    b: 'page-shop-app-venue-booking',
    calendar: 'calendar',
    list: 'list',
    right: 'right'
  },
  serviceInject() {
    return {
      bookingService: BookingService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      venueList: this.bookingService.venueList$,
      loading: this.bookingService.loading$,
      auth: this.bookingService.auth$,
      hasNext: this.bookingService.hasNext$
    }
  },
  modals: {
    SoldDealGatheringTip,
    SoldDealGathering
  },
  components: {
    swiper,
    swiperSlide,
    bookingTable,
    memberSearch
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      sum: 0,
      finalAmount: 0,
      reduce_price: '',
      form,
      decorators,
      selectedList: [],
      columns,
      sliderOptions: {
        autoplay: false,
        navigation: {
          nextEl: '.swiper-booking-button-next',
          prevEl: '.swiper-booking-button-prev'
        },
        slidesPerView: 7,
        slidesPerGroup: 7,
        centeredSlides: false,
        normalizeSlideIndex: false
      },
      calendarData: [],
      query: {
        venues_id: '',
        page: 1,
        size: 10,
        reserve_day: ''
      },
      pickedIndex: 0,
      bookingList: [],
      siteX: [],
      siteY: []
    }
  },
  mounted() {
    this.calendarData = Array(28)
      .fill()
      .map((item, index) => {
        return {
          week: moment()
            .add(index, 'days')
            .format('ddd'),
          date: moment()
            .add(index, 'days')
            .format('YYYY-MM-DD'),
          day: moment()
            .add(index, 'days')
            .format('MM/DD')
        }
      })
    this.query.venues_id = this.venueList[0].venues_id
    this.pickDate(this.calendarData[0], 0)
  },
  watch: {
    reduce_price(val) {
      this.calcPrice()
    }
  },
  methods: {
    onNextPage() {
      if (!this.hasNext) return
      this.query.page++
      this.bookingService.getBookingList(this.query).subscribe(res => {
        this.bookingList = this.bookingList.concat(res.list)
        this.siteX = this.siteX.concat(res.site_x)
        this.siteY = res.site_y
      })
    },
    resetPage() {
      this.form.resetFields()
      this.reduce_price = ''
      this.getList()
    },
    createdOrderPay(props) {
      this.$modalRouter.push({
        name: 'sold-deal-gathering',
        props,
        on: {
          success: res => {
            this.payCallBack(props.order_id, res.type)
          },
          cancel: () => {
            this.resetPage()
          }
        }
      })
    },
    payCallBack(orderId, callBackType) {
      switch (callBackType) {
        case 'cancel':
          this.resetPage()
          break
        case 'pay':
          this.createdGatheringTip({
            message: '收款成功',
            order_id: orderId,
            needPay: false,
            needContract: false,
            needTicket: false
          })
          break
      }
    },
    tipCallBack({ orderId, type }) {
      switch (type) {
        case 'cancel':
          this.resetPage()
          break
        case 'ViewOrder':
          this.createdOrderViewOrder(orderId)
          break
        case 'Pay':
          this.createdOrderPay({ order_id: orderId, type: 'venues' })
          break
      }
    },
    createdGatheringTip(props) {
      this.$modalRouter.push({
        name: 'sold-deal-gathering-tip',
        props,
        on: {
          success: this.tipCallBack
        }
      })
    },
    createdOrderViewOrder(order_id) {
      this.$router.push({
        name: 'shop-finance-order-info-collection-details',
        query: {
          id: order_id
        }
      })
    },
    createOrder() {
      return new Promise((resolve, reject) => {
        this.form.validate().then(values => {
          const venues_data = this.selectedList.map(item => {
            return {
              time_start: item.start_time,
              time_end: item.end_time,
              venues_site_id: +item.id.replace(/\-.*/, ''),
              price: item.price,
              venues_site_name: item.site_name
            }
          })
          this.bookingService
            .createOrder({
              venues_id: this.query.venues_id,
              venues_name: this.query.venues_name,
              reduce_price: this.reduce_price,
              actual_amount: this.finalAmount,
              order_amount: this.sum,
              reserve_day: this.query.reserve_day,
              venues_data: venues_data,
              ...values
            })
            .subscribe(result => {
              resolve(result)
            })
        })
      })
    },
    onCreateOrder() {
      this.createOrder().then(result => {
        const props = {
          order_id: result.info.order_id,
          message: '订单创建成功',
          needPay: true,
          needContract: false,
          needTicket: false
        }
        this.createdGatheringTip(props)
      })
    },
    onPay() {
      this.createOrder().then(result => {
        this.createdOrderPay({
          order_id: result.info.order_id,
          type: 'venues'
        })
      })
    },
    deleteRow(row) {
      let index
      this.selectedList.forEach((item, inx) => {
        if (item.id === row.id) {
          index = inx
        }
      })
      this.$refs.bookingTable.deleteRow(index)
    },
    calcPrice() {
      const list = this.selectedList
      const venues_site_time = list.map(item => {
        return {
          start_time: item.start_time,
          end_time: item.end_time,
          site_id: +item.id.replace(/\-.*/, '')
        }
      })
      const params = {
        venues_id: this.query.venues_id,
        date: this.query.reserve_day,
        reduce_price: this.reduce_price || 0,
        venues_site_time
      }
      this.bookingService.calcPrice(params).subscribe(res => {
        this.sum = res.total_price
        this.finalAmount = res.price
      })
    },
    getSelectedList(list) {
      this.selectedList = list
      if (list.length === 0) {
        this.sum = 0
        this.finalAmount = 0
        return
      }
      this.calcPrice()
    },
    pickDate(dateObj, index) {
      this.calendarData.forEach(item => (item.ispick = false))
      this.pickedIndex = index
      this.query.reserve_day = dateObj.date
      this.resetPagination()
      this.getList()
    },
    selectHandler(e) {
      this.query.venues_id = e.target.value
      this.resetPagination()
      this.getList()
    },
    resetPagination() {
      this.query.page = 1
      this.$refs.bookingTable.resetScroll()
    },
    getList() {
      this.bookingService.getBookingList(this.query).subscribe(res => {
        this.$refs.bookingTable.deleteAll()
        this.bookingList = res.list
        this.siteX = res.site_x
        this.siteY = res.site_y
      })
    }
  }
}
</script>
