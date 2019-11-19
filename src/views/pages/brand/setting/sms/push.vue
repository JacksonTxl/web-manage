<template>
  <div :class="bPage()">
    <div :class="bItem()" class="mg-t24">
      <st-t3 class="mg-b16">通知门店信息</st-t3>
      <div :class="bItem('table')">
        <div :class="bItem('table-title')">
          <div :class="bItem('table-th')">模板标题</div>
          <div class="th-wrap">
            <div class="th" v-for="(item, index) in thsShop" :key="index">
              {{ item.title }}
            </div>
          </div>
        </div>
        <div
          :class="bItem('table-tr')"
          v-for="(item, index) in shopList"
          :key="index"
        >
          <push-item @editInfo="save" :info="item"></push-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RouteService } from '@/services/route.service'

import { NoticeService } from './push.service'
import { thsShop } from './push.config'
import PushItem from './components#/push-item'
const pageName = 'page-setting-sms-notice'

export default {
  bem: {
    bPage: pageName,
    bItem: `${pageName}-item`
  },
  serviceInject() {
    return {
      routeService: RouteService,
      noticeService: NoticeService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      list: this.noticeService.list$
    }
  },
  data() {
    return {
      shopList: []
    }
  },
  computed: {
    thsShop
  },
  created() {
    this.getNoticeList()
  },
  methods: {
    onSearch() {},
    save(para) {
      this.putNotice(para)
    },
    getNoticeList() {
      return this.noticeService.getNoticeList().subscribe(res => {
        this.shopList = this.list.filter(
          ({ notify_type }) => notify_type.value === 2
        )
      })
    },
    putNotice(para) {
      return this.noticeService.putNotice({ ...para }).subscribe(res => {
        this.$message.success('编辑成功')
        this.getNoticeList()
      })
    }
  },
  components: {
    PushItem
  }
}
</script>
