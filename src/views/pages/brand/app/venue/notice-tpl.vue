<template>
  <div :class="bPage()">
    <div>
      <st-t3 class="mg-b16">通知会员信息</st-t3>
      <div :class="bTable()">
        <div :class="bTable('title')">
          <div :class="bTable('th')">模板标题</div>
          <div :class="bTable('th-wrap')">
            <div class="th" v-for="(item, index) in thsMember" :key="index">
              {{ item.title }}
            </div>
          </div>
        </div>
        <div
          :class="bTable('tr')"
          v-for="(item, index) in memberList"
          :key="index"
        >
          <notice-item @editInfo="save" :info="item" :auth="auth"></notice-item>
        </div>
      </div>
    </div>
    <div class="mg-t24">
      <st-t3 class="mg-b16">通知门店信息</st-t3>
      <div :class="bTable()">
        <div :class="bTable('title')">
          <div :class="bTable('th')">模板标题</div>
          <div :class="bTable('th-wrap')">
            <div class="th" v-for="(item, index) in thsShop" :key="index">
              {{ item.title }}
            </div>
          </div>
        </div>
        <div
          :class="bTable('tr')"
          v-for="(item, index) in shopList"
          :key="index"
        >
          <notice-item @editInfo="save" :info="item" :auth="auth"></notice-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NoticeTplService } from './notice-tpl.service'
import { thsMember, thsShop } from './notice-tpl.config'
import NoticeItem from '@/views/biz-components/notice-tpl/notice-item'
const pageName = 'page-brand-app-venue-notice-tpl'

export default {
  name: 'PageBrandAppVenueNoticeTpl',
  bem: {
    bPage: pageName,
    bTable: 'venue-notice-table'
  },
  serviceInject() {
    return {
      noticeService: NoticeTplService
    }
  },
  rxState() {
    return {
      list: this.noticeService.list$,
      auth: this.noticeService.auth$
    }
  },
  data() {
    return {
      memberList: [],
      shopList: []
    }
  },
  computed: {
    thsMember,
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
      return this.noticeService
        .getNoticeList({ notify_type: 1 })
        .subscribe(res => {
          this.memberList = this.list.filter(
            ({ notify_type }) => notify_type.value === 1
          )
          this.shopList = this.list.filter(
            ({ notify_type }) => notify_type.value === 2
          )
        })
    },
    putNotice(para) {
      return this.noticeService.putNotice({ ...para }).subscribe(res => {
        this.$message.success({
          content: '编辑成功'
        })
        this.getNoticeList()
      })
    }
  },
  components: {
    NoticeItem
  }
}
</script>
