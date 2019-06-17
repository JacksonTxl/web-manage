<template>
  <st-panel class="page-shop-label-container">
    <div slot="title">
      <st-button type="primary" v-if="auth.add">
        <modal-link tag="a" :to=" { name: 'label-add',on:{ change: refesh }}">
          <a-icon type="plus" class="mg-r8"/>添加标签
        </modal-link>
      </st-button>
    </div>
    <div slot="actions">
      <st-input-search placeholder="请输入标签名" style="width: 290px;" @search="onSearch"/>
    </div>
    <a-row :gutter="8" class="mg-t8">
      <st-table
        :columns="listColumns"
        :dataSource="listInfo.list"
        :pagination="false"
        @change="pageChange"
      >
        <template slot="action" slot-scope="record">
          <modal-link tag="a" v-if="record.auth['shop:member:tag|edit']" :to=" { name: 'label-edit',props: {item : record} , on:{ change: refesh }}" >编辑</modal-link>
          <a-divider type="vertical"></a-divider>
          <a href="javascript:;" v-if="record.auth['shop:member:tag|del']" @click="onDelete(record)">删除</a>
        </template>
      </st-table>
    </a-row>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
import { MessageService } from '@/services/message.service'
const listColumns = [
  {
    title: '标签名称',
    dataIndex: 'tag_name'
  },
  {
    title: '用户数量',
    dataIndex: 'user_number'
  },
  {
    title: '创建人',
    dataIndex: 'operator_name'
  },
  {
    title: '更新时间',
    dataIndex: 'updated_time'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  serviceInject() {
    return {
      listService: ListService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      listInfo: this.listService.listInfo$,
      auth: this.listService.auth$
    }
  },
  data() {
    return {
      pagination: {},
      listColumns
    }
  },
  methods: {
    onSearch(e) {
      console.log(e)
      this.$router.push({ query: {
        size: 51,
        page: 1,
        tag_name: e
      },
      force: true })
    },
    refesh() {
      this.$router.push({ query: {
        size: 51,
        page: 1
      },
      force: true })
    },
    onEdit(e) {
      console.log(e)
    },
    onDelete(e) {
      console.log(e)
      let that = this
      this.$confirm({
        title: '提示',
        content:
          '用户信息里所有此标签将会被同步删除，无法恢复，确认删除此标签？',
        onOk() {
          console.log('OK')
          that.listService.deleteLabel(e.id).subscribe(() => {
            console.log('ok')
            that.messageService.success({ content: '删除成功' })
            that.$router.push({ query: {
              size: 51,
              page: 1
            },
            force: true })
          })
        },
        onCancel() {
          console.log('Cancel')
        },
        class: 'test'
      })
    },
    pageChange(pagination) {
      console.log(pagination)
    }
  },
  mounted() {
    console.log('====', this.listInfo)
  }
}
</script>
