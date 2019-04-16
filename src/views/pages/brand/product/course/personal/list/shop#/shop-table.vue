<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="id"
      :alertSelection="{onReset: start}"
      :columns="columns"
      :dataSource="personalCourseList"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :scroll="{ x: 1300}"
      @change="onChange"
    >
      <a
        slot="member"
        slot-scope="text,record"
        href="javascript:;"
        @click="name(text,record)"
      >{{text}}</a>
      <a
        slot="admission"
        slot-scope="text,record"
        href="javascript:;"
        @click="name(text,record)"
      >{{text}}</a>
      <a slot="sellStatus" slot-scope="text,record" href="javascript:;" @click="name(text,record)">
        <span
          v-if="text ==='可售卖'"
          style="width:8px;
                 height:8px;
                 display: inline-block;
                 border-radius: 50%;
                 background:rgba(82,196,26,1);"
        ></span>
        <span
          v-if="text ==='停售'"
          style="width:8px;
                 height:8px;
                 display: inline-block;
                 border-radius: 50%;
                 background:rgba(245,34,45,1);"
        ></span>
        {{text}}
        <a-popover title="Title" placement="bottomRight">
          <template slot="content">
            <p>Content</p>
            <p>Content</p>
          </template>
          <a-icon type="exclamation-circle" v-if="text ==='停售'"/>
        </a-popover>
      </a>
      <div slot="action" slot-scope="record">
        <modal-link tag="a" :to="{name:'test'}">打开</modal-link>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确认删除该权限么?" @confirm="onDelete(record.id)">
          <a>删除</a>
        </a-popconfirm>
        <st-more-dropdown style="margin-left: 12px;">
          <a-menu-item>转让</a-menu-item>
          <a-menu-item>出售</a-menu-item>
          <a-menu-item>你好</a-menu-item>
        </st-more-dropdown>
      </div>
    </st-table>

</div>

</template>

<script>
import { columns } from './shop.config'
export default {
  name: 'ShopSaleListTable',
  data() {
    return {
      columns,
      selectedRowKeys: []
    }
  },
  props: {
    personalCourseList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    start() {
      this.selectedRowKeys = []
    },
    onChange() {

    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style scoped>

</style>
