<template>
  <st-panel app>
    <p class="ta-r">
      <modal-link tag="st-button" :to="{ name: 'brand-setting-app-coach-level-add', on: {
        change: onListChange } }">添加</modal-link>
    </p>
    <st-table
      :columns="columns"
      rowKey="id"
      :dataSource="tableData"
      @change="onTableChange"
      :pagination="{ current: +query.page || 1, total: page.total_counts }"
    >
      <div slot="action" slot-scope="record">
        <modal-link tag="a" :to="{ name: 'brand-setting-app-coach-level-edit',
          props: { id: record.id, setting_name: record.setting_name }, on: { change: onListChange } }">编辑
        </modal-link>
        <a-popconfirm :title="`删除后不可进行恢复，${record.used_number ? '已标记的员工将删除此教练等级，' : ''}确定删除此教练等级？`" @confirm="onDelete(record.id)">
          <a class="mg-l8">删除</a>
        </a-popconfirm>
      </div>
    </st-table>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
const columns = [{
  title: '教练等级',
  dataIndex: 'setting_name'
}, {
  title: '标记员工数',
  dataIndex: 'used_number'
}, {
  title: '创建人',
  dataIndex: 'operator_name'
}, {
  title: '最后修改时间',
  dataIndex: 'updated_time'
}, {
  title: '操作',
  width: 180,
  scopedSlots: { customRender: 'action' }
}]
export default {
  serviceInject() {
    return {
      listService: ListService,
      routeService: RouteService,
      messageService: MessageService
    }
  },
  subscriptions() {
    return {
      tableData: this.listService.list$,
      page: this.listService.page$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      columns,
      tableData: []
    }
  },
  methods: {
    onDelete(id) {
      this.listService.deleteCoachLevel({ id }).subscribe(() => {
        this.messageService.success({
          content: '删除成功'
        })
        this.onListChange()
      })
    },
    onTableChange(pagination) {
      this.$router.push({
        query: {
          page: pagination.current
        }
      })
      console.log('pagination', pagination)
    },
    onListChange() {
      if (this.page.current_page !== 1) {
        this.$router.push({
          query: {
            page: 1
          }
        })
      } else {
        this.listService.refreshCoachLevelList({
          page: 1,
          size: 20
        })
      }
    }
  }
}
</script>
