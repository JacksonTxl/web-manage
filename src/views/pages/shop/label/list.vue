<template>
  <st-panel class="page-shop-label-container">
    <div slot="title">
      <st-button type="primary"><a-icon type="plus" />
        <modal-link tag="a"  v-if="item.salary != 0" :to=" { name: 'label-add'}">添加标签</modal-link>
      </st-button>
    </div>
    <div slot="actions">
      <st-input-search placeholder="请输入标签名" style="width: 290px;"/>
    </div>
    <a-row :gutter="8" class="mg-t8">
      <st-table
        :columns="listColumns"
        :dataSource="listInfo.list"
        :pagination="pagination"
        @change="pageChange"
      >
        <template slot="action" slot-scope="record">
            <modal-link tag="a"  v-if="item.salary != 0" :to=" { name: 'label-edit',props: {item : record}}">编辑</modal-link>
            <a-divider type="vertical"></a-divider>
            <a href="javascript:;" @click="onDelete(record)">删除</a>
        </template>
      </st-table>
    </a-row>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
import { MessageService } from '@/services/message.service'
const listColumns = [{
  title: '标签名称',
  dataIndex: 'tag_name'
}, {
  title: '用户数量',
  dataIndex: 'user_number'
}, {
  title: '创建人',
  dataIndex: 'operator_name'
}, {
  title: '更新时间',
  dataIndex: 'updated_time'
}, {
  title: '操作',
  scopedSlots: { customRender: 'action' }
}]

export default {
  serviceInject() {
    return {
      listService: ListService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      listInfo: this.listService.listInfo$
    }
  },
  data() {
    return {
      pagination: {},
      // list:[{
      //     q: '小胖砸',
      //     w: 6,
      //     e: 'tony',
      //     r: '2017-23-12',
      //     id: 1
      // }],
      listColumns
    }
  },
  methods: {
    onEdit(e) {
      console.log(e)
    },
    onDelete(e) {
      console.log(e)
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
