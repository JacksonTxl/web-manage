<template>
  <st-panel app>
    <st-refresh-btn
      :date="last_updated_time"
      :action="refresh"
      class="mg-b16"
      :rangeTime="120"
    />
    <st-table
      :scroll="{ x: 1200 }"
      :page="page"
      @change="onTableChange"
      :loading="loading.getList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    >
      <!-- 任务状态 -->
      <template slot="task_status" slot-scope="text, record">
        <st-text
          :status="{
            default: record.task_status.code === TASK_STATUS.PENDING,
            info: record.task_status.code === TASK_STATUS.IN_HAND,
            warning: record.task_status.code === TASK_STATUS.PAUSE,
            success: record.task_status.code === TASK_STATUS.SUCCESS
          }"
        >
          {{ record.task_status.status }}
        </st-text>
      </template>
      <!-- 总数 -->
      <template slot="total_num" slot-scope="text, record">
        <a @click="onClickModal(record.id, 'total')">
          {{ text }}
        </a>
      </template>
      <!-- 成功数 -->
      <template slot="success_num" slot-scope="text, record">
        <a @click="onClickModal(record.id, 'success')">
          {{ text }}
        </a>
      </template>
      <!-- 失败数 -->
      <template slot="fail_num" slot-scope="text, record">
        <a @click="onClickModal(record.id, 'fail')">
          {{ text }}
        </a>
      </template>
      <!-- 操作 -->
      <div slot="action" slot-scope="text, record">
        <st-table-actions>
          <st-popconfirm
            v-if="record.auth['brand:task:task_center|end']"
            @confirm="stopTask(record)"
            title="确认要终止该任务么？"
          >
            <a>
              终止任务
            </a>
          </st-popconfirm>
        </st-table-actions>
      </div>
    </st-table>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
import { columns } from './list.config.ts'
import tableMixin from '@/mixins/table.mixin'
import { TASK_STATUS } from '@/constants/brand/setting/task'
import CommonTaskDetail from '@/views/biz-modals/common/task/detail'
import { MessageService } from '@/services/message.service'
export default {
  mixins: [tableMixin],
  name: 'PageBrandSettingShopList',
  serviceInject() {
    return {
      messageService: MessageService,
      listService: ListService
    }
  },
  rxState() {
    return {
      loading: this.listService.loading$,
      last_updated_time: this.listService.last_updated_time$,
      list: this.listService.list$,
      page: this.listService.page$
    }
  },
  computed: {
    columns
  },
  modals: {
    CommonTaskDetail
  },
  data() {
    return {
      TASK_STATUS
    }
  },
  methods: {
    refresh() {
      return this.listService.getList(this.$searchQuery)
    },
    onClickModal(id, type) {
      this.$modalRouter.push({
        name: 'common-task-detail',
        props: {
          task_id: id,
          popup_type: type
        },
        on: {}
      })
    },
    stopTask(item) {
      this.listService.stopTask(item.id).subscribe(res => {
        this.messageService.success({ content: '终止任务成功!' })
        this.$router.reload()
      })
    }
  }
}
</script>
