<template>
  <st-panel class="mg-t16">
    <div slot="title">
      <st-input-search placeholder="请输入商品名查找" style="width: 290px;"/>
    </div>
    <div slot="prepend">
      <div style="background: #F7F9FC; padding: 24px;display: flex;align-items: center;">
        <span style="width:90px;">商品类型：</span>
        <st-search-radio v-model="is_valid" :list="cardSaleStatusList"/>
      </div>
    </div>
    <st-table
      class="mg-t24"
      :columns="columns"
      rowKey="id"
      @change="onTableChange"
      :dataSource="memberListInfo"
      :pagination="pagination"
    >
      <div slot="action" slot-scope="record">
        <a href="javascript:;">详情</a>
        <a-divider type="vertical"></a-divider>

        <a href="javascript:;" @click="signing(record)">签单</a>
      </div>
    </st-table>
  </st-panel>
</template>
<script>
import { UserService } from '@/services/user.service'

export default {
  serviceInject() {
    return {
      userService: UserService
    }
  },
  bem: {
    basic: 'page-shop-sold'
  },
  rxState() {
    return {}
  },
  data() {
    return {
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 50
      },
      is_valid: 1,
      search: '',
      // 售卡状态
      cardSaleStatusList: [
        { value: 1, label: '全部' },
        { value: 2, label: '会员卡' },
        { value: 3, label: '私教课' },
        { value: 4, label: '课程包' },
        { value: 5, label: '储值卡' },
        { value: 6, label: '租赁' }
      ],
      memberListInfo: [
        {
          id: 1,
          name: 'XXXXXXXXX',
          member_name: '会员卡',
          mobile: 1999,
          member_level: 999
        }
      ],
      columns: [
        { title: '商品名称', dataIndex: 'name' },
        {
          title: '商品类型',
          dataIndex: 'member_name'
        },
        { title: '价格', dataIndex: 'mobile' },
        {
          title: '销量',
          dataIndex: 'member_level'
        },

        { title: '操作', width: 140, scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  methods: {
    signing(record) {
      let that = this
      /* 期限卡/次卡 sold-transaction-membership-card */
      /* 私教课 sold-transaction-private-teaching */
      this.$modalRouter.push({
        name: 'sold-transaction-private-teaching',
        /* type
            0 （期限卡/次卡）[0]
            1 （储值卡）
            2 （私教课）[2, 2]
            3 （课程包）
            4 （储物柜）
         */
        props: {
          id: record.id,
          type: [0]
        },
        on: {
          success() {
            that.$router.push({ force: true, query: that.query })
          }
        }
      })
    },
    onSearchCourseName(val) {
      // this.$router.push({ query: { ...this.query, search: this.query.search } })
    },
    onTableChange(pagination, filters, sorter) {
      console.log(pagination, filters, sorter)

      // this.$router.push({ query: this.form })
    }
  }
}
</script>
