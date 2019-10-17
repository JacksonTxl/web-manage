<template>
  <div :class="bPage()">
    <markteing-plugin-title :type="TYPE.ACTIVITY" />
    <st-panel :class="bPage('content')">
      <div slot="title" :class="bSearch()">
        <div :class="bSearch('button-group')">
          <st-button
            @click="onClickRouterPush({ pathName: 'addActivity' })"
            icon="add"
            type="primary"
          >
            新增活动
          </st-button>
          <st-button
            @click="onClickRouterPush({ pathName: 'checkinActivity' })"
            class="mg-l16"
          >
            签到验票
          </st-button>
        </div>
        <div :class="bSearch('input-group')">
          <a-select
            placeholder="请选择活动报名状态"
            @change="onSingleSearch('activity_status', $event)"
            class="mg-r16"
            style="width: 160px"
            :options="activityStatus$"
          ></a-select>
          <st-input-search
            @search="onSingleSearch('activity_name', $event)"
            placeholder="请输入活动报名标题"
            style="width: 290px;"
          />
        </div>
      </div>
      <st-table
        :page="page$"
        rowKey="id"
        :columns="columns"
        @change="onTableChange"
        :scroll="{ x: 1500 }"
        :dataSource="list$"
      >
        <template slot="action" slot-scope="text, record">
          <st-table-actions>
            <a @click="onClickEdit({ record, pathName: 'editActivity' })">
              编辑
            </a>
            <a @click="onCLickGeneralize(record)">
              推广
            </a>
            <a @click="onClickNameList({ record, pathName: 'rosterActivity' })">
              名单
            </a>
            <a @click="onClickCopy(record)">
              复制
            </a>
            <a @click="onClickStop(record)">
              结束
            </a>
          </st-table-actions>
        </template>
      </st-table>
    </st-panel>
  </div>
</template>

<script>
// table
import tableMixin from '@/mixins/table.mixin'
import { ListService } from './list.service'
import MarkteingPluginTitle from '../../components#/marketing-title'
import { columns } from './list.config'
import { TYPE } from '@/constants/marketing/plugin'
import { RouteService } from '@/services/route.service'
import MarketingPromotionActivity from '@/views/biz-modals/marketing/promotion-activity'

// modal
export default {
  name: 'ActivityList',
  mixins: [tableMixin],
  modals: {
    MarketingPromotionActivity
  },
  bem: {
    bPage: 'page-plugin-activity-registration',
    bSearch: 'search'
  },
  data() {
    return {
      TYPE,
      plugin_image: [
        'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/img-lottery-preview-1.png',
        'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/img-lottery-preview-2.png',
        'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/img-lottery-preview-2.png',
        'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/img-lottery-preview-3.png'
      ],
      redirectPath: {
        addActivity: 'brand-marketing-plugin-activity-registration-add',
        editActivity: 'brand-marketing-plugin-activity-registration-edit',
        checkinActivity: 'brand-marketing-plugin-activity-registration-checkin',
        rosterActivity: 'brand-marketing-plugin-activity-registration-roster'
      }
    }
  },
  serviceInject() {
    return {
      service: ListService,
      routeService: RouteService
    }
  },
  rxState() {
    const { page$, list$, activityStatus$ } = this.service
    return {
      query: this.routeService.query$,
      activityStatus$,
      page$,
      list$
    }
  },
  components: {
    MarkteingPluginTitle
  },
  computed: {
    columns
  },
  methods: {
    onClickRouterPush({ record, pathName }) {
      this.$router.push({ name: this.redirectPath[pathName] })
    },
    onClickEdit({ record, pathName }) {
      this.$router.push({ name: this.redirectPath[pathName] })
    },
    onCLickGeneralize({ record, pathName }) {
      this.$modalRouter.push({ name: 'marketing-promotion-activity' })
    },
    onClickNameList({ record, pathName }) {
      this.$router.push({
        name: this.redirectPath[pathName],
        query: { id: record.id }
      })
    },
    onClickStop(record) {
      this.service.cancelSignUp(record.id).subscribe(res => {
        this.$router.reload()
      })
    },
    onClickCopy({ record, pathName }) {}
  }
}
</script>
