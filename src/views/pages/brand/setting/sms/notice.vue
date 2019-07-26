<template>
  <div :class="bPage()">
    <div :class="bItem()">
      <st-t3 class="mg-b16">通知会员信息</st-t3>
      <div :class="bItem('table')">
        <div :class="bItem('table-tr')">
          <div class="th" v-for="(item,index) in thsMember" :key="index">{{item.title}}</div>
        </div>
        <div :class="bItem('table-tr')" v-for="(item,index) in memberList" :key="index">
          <NoticeItem :info="item"></NoticeItem>
        </div>
      </div>
    </div>
    <div :class="bItem()" class="mg-t24">
      <st-t3 class="mg-b16">通知门店信息</st-t3>
      <div :class="bItem('table')">
        <div :class="bItem('table-tr')">
          <div class="th" v-for="(item,index) in thsShop" :key="index">{{item.title}}</div>
        </div>
        <div :class="bItem('table-tr')" v-for="(item,index) in shopList" :key="index">
          <NoticeItem :info="item"></NoticeItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RouteService } from '@/services/route.service'

import { NoticeService } from './notice.service'
import { thsMember, thsShop } from './notice.config'
import NoticeItem from './notice#/item'
const pageName = 'page-setting-sms-notice'

export default {
  bem: {
    bPage: pageName,
    bItem: `${pageName}-item`
  },
  serviceInject() {
    return {
      routeService: RouteService,
      NoticeService: NoticeService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      list: this.NoticeService.list$
    }
  },
  data() {
    return {}
  },
  computed: {
    thsMember,
    thsShop
  },
  created() {
    this.memberList = this.list.filter(
      ({ notify_type }) => notify_type.value === 1
    )
    this.shopList = this.list.filter(
      ({ notify_type }) => notify_type.value === 2
    )
  },
  metdods: {
    onSearch() {}
  },
  components: {
    NoticeItem
  }
}
</script>
