<template>
  <div :class="bPage()">
    <div :class="bItem()">
      <st-t3 class="mg-b16">通知会员信息</st-t3>
      <div :class="bItem('table')">
        <div :class="bItem('table-title')">
          <div :class="bItem('table-th')">模板标题</div>
          <div class="th-wrap">
            <div class="th" v-for="(item, index) in thsMember" :key="index">
              {{ item.title }}
            </div>
          </div>
        </div>
        <div
          :class="bItem('table-tr')"
          v-for="(item, index) in memberList"
          :key="index"
        >
          <notice-item @editInfo="save" :info="item"></notice-item>
        </div>
      </div>
    </div>
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
          <notice-item @editInfo="save" :info="item"></notice-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NoticeTplService } from './notice-tpl.service'
import { thsMember, thsShop } from './notice-tpl.config'
import NoticeItem from '@/views/biz-components/notice-tpl/notice-item'
const pageName = 'page-setting-sms-notice'

export default {
  name: 'PageBrandAppVenueNoticeTpl',
  bem: {
    bPage: pageName,
    bItem: `${pageName}-item`
  },
  serviceInject() {
    return {
      noticeService: NoticeTplService
    }
  },
  rxState() {
    return {
      list: this.noticeService.list$
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
        this.$message.success('编辑成功')
        this.getNoticeList()
      })
    }
  },
  components: {
    NoticeItem
  }
}
</script>
