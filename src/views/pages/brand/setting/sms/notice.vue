<template>
  <div :class="bPage()">
    <div :class="bItem()">
      <st-t3 class="mg-b16">通知会员信息</st-t3>
      <st-form-table :class="bItem('table')">
        <thead :class="bItem('table-head')">
          <tr :class="bItem('table-tr')">
            <th class="th" v-for="(item,index) in ths" :key="index">{{item.title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="bItem('table-tr')">
            <td class="td">预约成功通知</td>
            <td colspan="4">
              <NoticeItem>
                <span slot="rule">预约成功后发送</span>
                <span slot="role">会员</span>
              </NoticeItem>
            </td>
          </tr>
        </tbody>
      </st-form-table>
    </div>
    <div :class="bItem()" class="mg-t24">
      <st-t3 class="mg-b16">通知门店信息</st-t3>
      <table :class="bItem('table')">
        <thead :class="bItem('table-head')">
          <tr :class="bItem('table-tr')">
            <th class="th" v-for="(item,index) in ths" :key="index">{{item.title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="bItem('table-tr')">
            <td class="td">会员预约通知</td>
            <td colspan="4">
              <NoticeItem>
                <span slot="rule">会员预约成功后即时发送</span>
                <span slot="role">门店</span>
              </NoticeItem>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { RouteService } from '@/services/route.service'

import { NoticeService } from './notice.service'
import { ths } from './notice.config'
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
      query: this.routeService.query$
    }
  },
  data() {
    return {}
  },
  computed: {
    ths
  },
  metdods: {
    onSearch() {}
  },
  components: {
    NoticeItem
  }
}
</script>
