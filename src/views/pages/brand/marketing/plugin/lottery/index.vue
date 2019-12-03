<template>
  <st-panel-layout :class="bPage()">
    <MarkteingPluginTitle :type="TYPE.LOTTERY" />
    <st-panel app>
      <div :class="bPage('action')" class="mg-b16">
        <div>
          <router-link to="./add">
            <st-button type="primary" icon="add" class="mg-r16">
              新建活动
            </st-button>
          </router-link>
          <router-link to="./checkin">
            <st-button type="default">核销兑换码</st-button>
          </router-link>
        </div>
        <div style="text-align:right">
          <a-select
            placeholder="活动状态"
            v-model="$searchQuery.activity_status"
            class="mg-r16"
            @change="onSingleSearch('activity_status', $event)"
            style="width:100px;display:inline-block;"
          >
            <a-select-option
              v-for="(item, index) of status"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
          <st-input-search
            style="display:inline-block;"
            v-model="$searchQuery.keyword"
            @search="onKeywordsSearch('keyword', $event)"
            placeholder="请输入活动名称"
          ></st-input-search>
        </div>
      </div>

      <st-table
        :page="page"
        @change="onTableChange"
        :loading="loading.getActivityList"
        :columns="columns"
        :dataSource="list"
        rowKey="id"
      >
        <span slot="join_num" slot-scope="record">
          <router-link
            :to="{
              name: 'brand-marketing-plugin-lottery-info-users',
              query: { id: record.id }
            }"
          >
            {{ record.activity_join_num }}
          </router-link>
        </span>
        <template slot="activity_status_name" slot-scope="text, record">
          <st-text
            :status="{
              error: record.activity_status === 2,
              success: record.activity_status === 1,
              default: record.activity_status === 3
            }"
          >
            {{ text }}
          </st-text>
        </template>
        <span slot="time" slot-scope="record">
          {{ record.activity_start_time }}~{{ record.activity_end_time }}
        </span>
        <span slot="prize_num" slot-scope="record">
          <router-link
            :to="{
              name: 'brand-marketing-plugin-lottery-info-users',
              query: { id: record.id, prize_status: 1 }
            }"
          >
            {{ record.activity_prize_num }}
          </router-link>
        </span>
        <div slot="action" slot-scope="text, record">
          <st-table-actions>
            <router-link
              v-if="record.activity_status !== ACTIVITY_STATUS.ISSTOPED"
              :to="{
                name: 'brand-marketing-plugin-lottery-info-prize',
                query: { id: record.id }
              }"
            >
              数据
            </router-link>
            <a
              v-if="record.activity_status !== ACTIVITY_STATUS.ISSTOPED"
              @click="onGeneralize(record)"
            >
              推广
            </a>
            <router-link
              v-if="record.activity_status !== ACTIVITY_STATUS.ISSTOPED"
              :to="{
                name: 'brand-marketing-plugin-lottery-add',
                query: {
                  activity_id: record.id,
                  status: record.activity_status
                }
              }"
            >
              编辑
            </router-link>
            <a @click="onStop(record)">
              {{
                record.activity_status === ACTIVITY_STATUS.ISSTOPED
                  ? '数据'
                  : record.activity_status === ACTIVITY_STATUS.DISABLED
                  ? '结束'
                  : '取消'
              }}
            </a>
          </st-table-actions>
        </div>
      </st-table>
    </st-panel>
  </st-panel-layout>
</template>
<script>
import { IndexService } from './index.service'
import MarkteingPluginTitle from '../../components#/marketing-title'
import { columns } from './index.config.ts'
import tableMixin from '@/mixins/table.mixin'
import { ACTIVITY_STATUS } from '@/constants/marketing/lottery'
import { TYPE } from '@/constants/marketing/plugin'
import useShare from '@/hooks/marketing/share.hook'
export default {
  name: 'PluginLotteryIndex',
  mixins: [tableMixin],
  data() {
    return {
      ACTIVITY_STATUS,
      TYPE
    }
  },
  bem: {
    bPage: 'page-brand-marketing-plugin-lottery-index'
  },
  serviceInject() {
    return {
      indexService: IndexService
    }
  },
  hooks() {
    return {
      share: useShare()
    }
  },
  rxState() {
    return {
      list: this.indexService.list$,
      page: this.indexService.page$,
      loading: this.indexService.loading$,
      info: this.indexService.info$,
      status: this.indexService.status$
    }
  },
  components: {
    MarkteingPluginTitle
  },
  computed: {
    columns
  },
  methods: {
    onGeneralize(record) {
      // let is_auth = record.is_auth
      // 绑定小程序
      this.indexService.getPosterInfo(record.id).subscribe(res => {
        const info = this.info
        const shsInfo = {
          qrcode_url: info.qrcode_url,
          sub_name: info.sub_name
        }
        const isAuth = res.is_auth
        this.share.poster({ isAuth, shsInfo, shsPath: '/saas/lottery_poster' })
      })
    },
    // 停止优惠券模板
    onStop(record) {
      if (record.activity_status === this.ACTIVITY_STATUS.ISSTOPED) {
        this.$router.push({
          path: '/brand/marketing/plugin/lottery/info/prize',
          query: {
            id: record.id
          }
        })
        return
      }
      let that = this
      this.$confirm({
        title: '提示',
        okText:
          record.activity_status === this.ACTIVITY_STATUS.ISHOLDING
            ? '取消'
            : '结束',
        cancelText: '我再想想',
        content:
          record.activity_status === this.ACTIVITY_STATUS.ISHOLDING
            ? '确认取消该活动'
            : '确认要结束',
        onOk() {
          that.indexService.stopActivity(record.id).subscribe(res => {
            that.$router.reload()
          })
        }
      })
    }
  }
}
</script>
