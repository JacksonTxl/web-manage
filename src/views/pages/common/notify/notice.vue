<template>
  <div :class="b()">
    <st-search-panel @search="onSearch" @reset="onSearchReset">
      <st-search-panel-item label="公告类型：">
        <st-search-radio
          v-model="$searchQuery.notify_type"
          :options="noticeTypeOptions$"
        />
      </st-search-panel-item>
    </st-search-panel>

    <st-table
      class="pd-24"
      @change="onTableChange"
      rowKey="id"
      :columns="columns"
      :dataSource="list$"
      :loading="loading$.getList"
      :page="page$"
    >
      <template slot="notify_type" slot-scope="text, record">
        {{ record.notify_type.name }}
      </template>
      <template slot="st-title" slot-scope="text">
        <st-overflow-text maxWidth="250px" :value="text" />
      </template>
      <template slot="actions" slot-scope="text, record">
        <st-table-actions>
          <a @click="onClickDetail(record)">
            查看
          </a>
        </st-table-actions>
      </template>
    </st-table>
  </div>
</template>

<script>
import { columns } from './notice.config'
import { NoticeService } from './notice.service'
import tableMixin from '@/mixins/table.mixin'
import CommonNotifyInfo from '@/views/biz-modals/common/notify/info'
import CommonNotifyActivity from '@/views/biz-modals/common/notify/activity'
import { InfoService } from '@/views/biz-modals/common/notify/info.service.ts'

export default {
  name: 'NotifyNotice',
  mixins: [tableMixin],
  bem: {
    b: 'page-notify-Notice'
  },
  modals: {
    CommonNotifyInfo,
    CommonNotifyActivity
  },
  serviceInject() {
    return {
      service: NoticeService,
      infoService: InfoService
    }
  },
  rxState() {
    const { list$, page$, loading$, noticeTypeOptions$ } = this.service
    return { list$, page$, loading$, noticeTypeOptions$ }
  },
  data() {
    return {
      date: null
    }
  },
  computed: {
    columns
  },
  methods: {
    onClickDetail(record) {
      const { id, notify_type } = record
      this.infoService
        .getAnnouncementInfo({ id, notify_type: notify_type.id })
        .subscribe(res => {
          const info = res.info
          const link = res.info.image_link
          if (link.length > 0) {
            // 有链接链接弹窗
            window.open(link)
          } else if (
            info.image_key.length > 0 &&
            info.notify_type !== '系统公告'
          ) {
            // 有图片没连接出现图片
            const list = info.image_key.map(item => {
              return {
                image_key: item,
                announcement_link: ''
              }
            })
            this.$modalRouter.push({
              name: 'common-notify-activity',
              props: { list }
            })
          } else {
            // 常规公告 系统公告都弹详情
            this.$modalRouter.push({
              name: 'common-notify-info'
            })
          }
        })
    }
  }
}
</script>
