<template>
  <st-panel-layout :class="bPage()">
    <markteing-plugin-title :type="TYPE.ACTIVITY" />
    <st-panel app :class="bPage('content')">
      <div slot="title" :class="bSearch()">
        <div :class="bSearch('button-group')">
          <st-button
            @click="onClickRouterPush({ pathName: 'addActivity' })"
            icon="add"
            :disabled="!auth$.add"
            type="primary"
          >
            新增活动
          </st-button>
          <st-button
            @click="onClickRouterPush({ pathName: 'checkinActivity' })"
            :disabled="!auth$.checkIn"
            class="mg-l8"
          >
            签到验票
          </st-button>
        </div>
        <div :class="bSearch('input-group')">
          <a-select
            placeholder="请选择活动报名状态"
            @change="onSingleSearch('activity_status', $event)"
            v-model="$searchQuery.activity_status"
            class="mg-r8"
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
      <div :class="bPage('table')">
        <st-table
          :page="page$"
          rowKey="id"
          :loading="loading$.getList"
          :columns="columns"
          @change="onTableChange"
          :scroll="{ x: 1500 }"
          :dataSource="list$"
        >
          <template slot="activity_status" slot-scope="text, record">
            <st-text
              :status="{
                error: record.activity_status.id === 3,
                success:
                  record.activity_status.id === 2 ||
                  record.activity_status.id === 1,
                default:
                  record.activity_status.id === 4 ||
                  record.activity_status.id === 5
              }"
            >
              {{ text.name }}
            </st-text>
          </template>
          <template slot="join_people" slot-scope="text, record">
            <a
              @click="onClickNameList({ record, pathName: 'rosterActivity' })"
              v-if="text > 0"
            >
              {{ text }}
            </a>
            <span v-else>{{ text }}</span>
          </template>

          <template slot="action" slot-scope="text, record">
            <st-table-actions>
              <a
                v-if="record.auth.isEdit"
                @click="onClickEdit({ record, pathName: 'editActivity' })"
              >
                编辑
              </a>
              <a v-if="record.auth.isAdv" @click="onCLickGeneralize(record)">
                推广
              </a>
              <a
                v-if="record.auth.isName"
                @click="onClickNameList({ record, pathName: 'rosterActivity' })"
              >
                名单
              </a>
              <a
                v-if="record.auth.isCopy"
                @click="onClickCopy({ record, pathName: 'copyActivity' })"
              >
                复制
              </a>
              <a @click="onClickStop(record)" v-if="record.auth.isCancel">
                取消
              </a>
            </st-table-actions>
          </template>
        </st-table>
      </div>
    </st-panel>
  </st-panel-layout>
</template>
<script>
// table
import tableMixin from '@/mixins/table.mixin'
import { ListService } from './list.service'
import MarkteingPluginTitle from '../../components#/marketing-title'
import { columns } from './list.config'
import { TYPE } from '@/constants/marketing/plugin'
import useShare from '@/hooks/marketing/poster.hook'
// modal
export default {
  name: 'ActivityList',
  mixins: [tableMixin],
  bem: {
    bPage: 'page-plugin-activity-registration',
    bSearch: 'search'
  },
  data() {
    return {
      TYPE,
      plugin_image: [],
      redirectPath: {
        addActivity: 'brand-marketing-plugin-activity-registration-add',
        editActivity: 'brand-marketing-plugin-activity-registration-edit',
        checkinActivity: 'brand-marketing-plugin-activity-registration-checkin',
        copyActivity: 'brand-marketing-plugin-activity-registration-copy',
        rosterActivity: 'brand-marketing-plugin-activity-registration-roster'
      }
    }
  },
  hooks() {
    return {
      share: useShare()
    }
  },
  serviceInject() {
    return {
      service: ListService
    }
  },
  rxState() {
    const {
      info$,
      brand$,
      page$,
      list$,
      activityStatus$,
      loading$,
      auth$
    } = this.service
    return {
      activityStatus$,
      page$,
      list$,
      auth$,
      loading$,
      brand$,
      info$
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
      this.$router.push({
        name: this.redirectPath[pathName]
      })
    },
    onClickEdit({ record, pathName }) {
      this.$router.push({
        name: this.redirectPath[pathName],
        query: { id: record.id }
      })
    },
    onCLickGeneralize(record) {
      this.service.getSharePosterInfo(record.id).subscribe(res => {
        const info = this.info$
        const activity_date = `${info.start_time} - ${info.end_time}`
        const shsInfo = {
          qrcode_url: info.qrcode,
          brand_name: this.brand$.name,
          brand_logo: this.brand$.logo,
          activity_img: info.image.image_url,
          activity_title: info.activity_name,
          activity_date,
          activity_address: info.address
        }
        this.share.poster({
          isAuth: res.is_auth,
          shsInfo,
          shsPath: '/saas/activity'
        })
      })
    },
    onClickNameList({ record, pathName }) {
      this.$router.push({
        name: this.redirectPath[pathName],
        query: { id: record.id }
      })
    },
    onClickStop(record) {
      this.$confirm({
        title: '提示',
        content: '确认取消该活动吗?',
        okText: '是的',
        cancelText: '再想想',
        onOk: () => {
          this.service.cancelSignUp(record.id).subscribe(res => {
            this.$router.reload()
          })
        },
        onCancel() {}
      })
    },
    onClickCopy({ record, pathName }) {
      this.$router.push({
        name: this.redirectPath[pathName],
        query: { id: record.id }
      })
    }
  }
}
</script>
