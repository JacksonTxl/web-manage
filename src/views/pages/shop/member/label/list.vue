<template>
  <st-panel class="page-shop-label-container">
    <div slot="title">
      <st-button type="primary" v-if="auth.add">
        <modal-link tag="a" :to=" { name: 'label-add',on:{ change: onSearhReset }}">
          <a-icon type="plus" class="mg-r8"/>添加标签
        </a>
      </st-button>
    </div>
    <div slot="actions">
      <st-input-search v-model="query.tag_name" placeholder="请输入标签名" style="width: 290px;" @search="onSearch"/>
    </div>
    <a-row :gutter="8" class="mg-t8">
      <st-table
        :columns="columns"
        :dataSource="list"
        :page="page"
        @change="onTableChange"
        rowKey="id"
      >

        <div slot="action" slot-scope="record">
          <st-table-actions>
            <router-link
              v-if="record.auth['shop:member:tag|edit']"
              :to="{ name: 'label-edit',props: {item : record} , on:{ change: onSearhReset }}"
            >编辑</router-link>
            <a v-if="record.auth['shop:member:tag|del']" @click="onDelete(record)">删除</a>
          </st-table-actions>
        </div>
      </st-table>
    </a-row>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
import { MessageService } from '@/services/message.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './list.config.ts'

export default {
  name: 'ShopMemberLabelList',
  mixins: [tableMixin],
  serviceInject() {
    return {
      listService: ListService,
      messageService: MessageService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      auth: this.listService.auth$,
      query: this.routeService.query$,
      list: this.listService.list$,
      page: this.listService.page$
    }
  },
  data() {
    return {
      tag_name: ''
    }
  },
  mounted() {
  },
  computed: {
    columns
  },
  methods: {
    onEdit(e) {
      console.log(e)
    },
    onDelete(e) {
      this.$confirm({
        title: '提示',
        content:
          '用户信息里所有此标签将会被同步删除，无法恢复，确认删除此标签？',
        onOk: () => {
          this.listService.deleteLabel(e.id).subscribe(() => {
            this.messageService.success({ content: '删除成功' })
            this.$router.push({ force: true })
          })
        },
        onCancel() {
          console.log('Cancel')
        },
        class: 'test'
      })
    }
  }
}
</script>
