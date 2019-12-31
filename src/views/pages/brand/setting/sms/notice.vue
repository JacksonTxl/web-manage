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
          v-for="(item, index) in memberList$"
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
          v-for="(item, index) in shopList$"
          :key="index"
        >
          <notice-item @editInfo="save" :info="item">
            <template
              v-if="
                item.notify_sub_type.value === 24 ||
                  item.notify_sub_type.value === 23
              "
              v-slot:custom="slotProps"
            >
              <a-select
                style="width:44%"
                mode="multiple"
                :options="roleList$"
                v-model="slotProps.params.custom_phone"
              ></a-select>
            </template>
          </notice-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NoticeService } from './notice.service'
import { thsMember, thsShop } from './notice.config'
import NoticeItem from './components#/notice-item'
const pageName = 'page-setting-sms-notice'

export default {
  name: 'NoticeConfig',
  bem: {
    bPage: pageName,
    bItem: `${pageName}-item`
  },
  serviceInject() {
    return {
      noticeService: NoticeService
    }
  },
  rxState() {
    const { memberList$, roleList$, shopList$ } = this.noticeService
    return { memberList$, roleList$, shopList$ }
  },
  computed: {
    thsMember,
    thsShop
  },

  methods: {
    onSearch() {},
    save(para) {
      this.putNotice(para)
    },
    getNoticeList() {
      return this.noticeService.getNoticeList().subscribe()
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
