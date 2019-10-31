<template>
  <div :class="bPage()">
    <div class="mg-b24">
      <st-button
        type="primary"
        class="mg-r12"
        v-modal-link="{
          name: 'brand-setting-sms-group',
          on: { success: refresh }
        }"
      >
        群发消息
      </st-button>
      <st-button
        v-modal-link="{
          name: 'brand-setting-sms-template',
          on: { success: refresh }
        }"
      >
        新建短信模版
      </st-button>
      <a-radio-group
        :value="isShowList"
        @change="handleTableChange"
        class="fl-r"
      >
        <a-radio-button :value="1">发送记录</a-radio-button>
        <a-radio-button :value="0">短信模版</a-radio-button>
      </a-radio-group>
    </div>
    <st-table
      v-if="isShowList"
      :page="groupPage"
      :loading="loading.getGroupList"
      @change="onTableChange"
      :columns="recordColumns"
      :dataSource="groupList"
      rowKey="group_id"
      :class="bPage('table')"
    >
      <span slot="action" slot-scope="text, record">
        <st-table-actions v-if="record.send_status === 0">
          <st-popconfirm title="确定撤销吗" @confirm="onReset(record.group_id)">
            <a>撤销</a>
          </st-popconfirm>
          <a
            v-modal-link="{
              name: 'brand-setting-sms-group',
              props: { id: record.group_id },
              on: { success: refresh }
            }"
          >
            编辑
          </a>
        </st-table-actions>
      </span>
      <div slot="send_status_text" slot-scope="text, record">
        <st-status-text
          v-if="record.send_status === 2"
          :status="{ success: 1 }"
        >
          {{ record.send_status_text }}
        </st-status-text>
        <st-status-text v-if="record.send_status === 3" :status="{ error: 1 }">
          {{ record.send_status_text }}
        </st-status-text>
        <st-status-text v-if="record.send_status === 1" :status="{ normal: 1 }">
          {{ record.send_status_text }}
        </st-status-text>
        <st-status-text v-if="record.send_status === 0" :status="{ info: 1 }">
          {{ record.send_status_text }}
        </st-status-text>
        <st-status-text v-if="record.send_status === 4" :status="{ error: 1 }">
          {{ record.send_status_text }}
        </st-status-text>
      </div>
      <div slot="received_count" slot-scope="text, record">
        <a
          v-modal-link="{
            name: 'brand-setting-sms-receive',
            props: { id: record.group_id }
          }"
        >
          {{ record.received_count }}
        </a>
      </div>
      <div
        slot="content"
        style=" text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
"
        slot-scope="text, record"
      >
        <a-tooltip
          placement="topLeft"
          overlayClassName="page-setting-sms-group-tooltip"
        >
          <template slot="title">
            <span>{{ record.content }}</span>
          </template>
          {{ record.content }}
        </a-tooltip>
      </div>
    </st-table>
    <st-table
      v-else
      :page="templatePage"
      :loading="loading.getTemplateList"
      @change="onTableChange"
      :columns="templateColumns"
      :dataSource="templateList"
      rowKey="tmpl_id"
      :class="bPage('table')"
    >
      <div slot="action" slot-scope="text, record">
        <st-table-actions>
          <a
            v-modal-link="{
              name: 'brand-setting-sms-template',
              on: { success: refresh },
              props: { info: record }
            }"
          >
            编辑
          </a>
          <st-popconfirm
            title="
                  确定删除吗
                "
            @confirm="onDelete(record.tmpl_id)"
          >
            <a>删除</a>
          </st-popconfirm>
          <a
            v-modal-link="{
              name: 'brand-setting-sms-group',
              props: { tmpl: { tmpl_type: 2, tmpl_id: record.tmpl_id } },
              on: { success: refresh }
            }"
          >
            发送
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>
<script>
import { RouteService } from '@/services/route.service'
import { GroupService } from './group.service'
import { recordColumns, templateColumns } from './group.config.ts'
import { UserService } from '@/services/user.service'
import BrandSettingSmsGroup from '@/views/biz-modals/brand/setting/sms/group'
import BrandSettingSmsTemplate from '@/views/biz-modals/brand/setting/sms/template'
import BrandSettingSmsReceive from '@/views/biz-modals/brand/setting/sms/receive'

import tableMixin from '@/mixins/table.mixin'
const pageName = 'page-setting-sms-group'

export default {
  mixins: [tableMixin],
  bem: {
    bPage: pageName
  },
  serviceInject() {
    return {
      routeService: RouteService,
      groupService: GroupService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      loading: this.groupService.loading$,
      templatePage: this.groupService.templatePage$,
      templateList: this.groupService.templateList$,
      groupPage: this.groupService.groupPage$,
      groupList: this.groupService.groupList$
    }
  },
  modals: {
    BrandSettingSmsGroup,
    BrandSettingSmsTemplate,
    BrandSettingSmsReceive
  },
  computed: {
    recordColumns,
    templateColumns
  },
  created() {},
  mounted() {},
  data() {
    return {
      isShowList: 1
    }
  },
  methods: {
    // 撤销
    onReset(id) {
      return this.groupService.onReset(id).subscribe(res => {
        this.refresh()
      })
    },
    // 删除
    onDelete(id) {
      return this.groupService.onDelete(id).subscribe(res => {
        this.refresh()
      })
    },
    handleTableChange(e) {
      this.isShowList = e.target.value
      this.$router.push({ query: { ...this.query, current_page: 1 } })
    },
    getTemplateList() {
      return this.groupService.getTemplateList().subscribe()
    },
    getGroupList() {
      return this.groupService.getGroupList().subscribe()
    },
    refresh() {
      this.$router.reload()
    }
  }
}
</script>
