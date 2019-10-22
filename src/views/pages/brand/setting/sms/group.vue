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
      <div slot="action" slot-scope="text, record">
        <st-table-actions
          v-if="record.send_status === 0 || record.send_status === 1"
        >
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
      </div>
      <div slot="send_status_text" slot-scope="text, record">
        <span
          class="page-setting-sms-group__status"
          :class="bPage('status-') + record.send_status"
        ></span>
        <span>{{ record.send_status_text }}</span>
      </div>
      <div slot="content" slot-scope="text, record">
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
          <a>发送</a>
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
    BrandSettingSmsTemplate
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
      if (this.isShowList === 1) {
        this.$router.push({ query: { ...this.query, current_page: 1 } })
        this.getGroupList()
      } else {
        this.$router.push({ query: { ...this.query, current_page: 1 } })
        this.getTemplateList()
      }
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
