<template>
  <st-panel class="mg-t16">
    <div slot="title">
      <st-input-search
        placeholder="请输入商品名查找"
        v-model="query.product_name"
        @search="productName"
        style="width: 290px;"
      />
    </div>
    <div slot="prepend">
      <div style="background: #F7F9FC; padding: 24px;display: flex;align-items: center;">
        <span style="width:90px;">商品类型：</span>
        <st-search-radio
          v-model="query.product_type"
          @change="productType"
          :list="cardSaleStatusList"
        />
      </div>
    </div>
    <st-table
      class="mg-t24"
      :columns="columns"
      rowKey="id"
      @change="onTableChange"
      :dataSource="indexList.list"
      :pagination="pagination"
    >
      <span slot="product_type" slot-scope="text" href="javascript:;">{{text| filterType}}</span>
      <div slot="action" slot-scope="record">
        <a href="javascript:;">详情</a>
        <a-divider type="vertical"></a-divider>

        <a href="javascript:;" @click="signing(record)">签单</a>
      </div>
    </st-table>
    {{indexList}}
  </st-panel>
</template>
<script>
import { UserService } from '@/services/user.service'
import { IndexService } from './index.service'
export default {
  serviceInject() {
    return {
      userService: UserService,
      indexService: IndexService
    }
  },
  bem: {
    basic: 'page-shop-sold'
  },
  rxState() {
    return {
      indexList: this.indexService.indexList$
    }
  },
  data() {
    return {
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 50
      },
      query: {
        product_name: '',
        product_type: '',
        page: '',
        size: ''
      },
      product_type: 1,
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
          product_name: 'XXXXXXXXX',
          product_type: '会员卡',
          price: 1999,
          number: 999
        }
      ],
      columns: [
        { title: '商品名称', dataIndex: 'product_name' },
        {
          title: '商品类型',
          dataIndex: 'product_type',
          scopedSlots: { customRender: 'product_type' }
        },
        {
          title: '价格',
          dataIndex: 'price',
          sorter: (a, b) => a.price - b.price
        },
        {
          title: '销量',
          dataIndex: 'number',
          sorter: (a, b) => a.number - b.number
        },

        { title: '操作', width: 140, scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  filters: {
    /* 1会员卡 2储值卡 3私教课 4课程包 5储物柜租赁 */
    filterType(type) {
      let arr = ['会员卡', '储值卡', '私教课', '课程包', '储物柜租赁']
      return arr[type - 1]
    }
  },
  created() {
    this.pagination.total = this.indexList.page.total_counts
    this.pagination.pageSize = this.indexList.page.size
    this.pagination.current = this.indexList.page.current_page
    this.query.page = this.indexList.page.current_page
    this.query.size = this.indexList.page.size
  },
  methods: {
    signing(record) {
      let that = this
      /* 期限卡/次卡 sold-transaction-membership-card */
      /* 储值卡 sold-transaction-stored-value-card  */
      /* 课程包 sold-transaction-course-package */
      /* 储物柜 sold-transaction-lockers */
      /* 私教课 sold-transaction-private-teaching */

      this.$modalRouter.push({
        name: 'sold-transaction-membership-card',
        /* type
            0 （期限卡/次卡）[0]
            1 （储值卡）
            2 （私教课）[2, 2]
            3 （课程包）
            4 （储物柜）
         */
        props: {
          id: record.id,
          type: [3]
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
      this.query.page = pagination.current
      this.query.size = pagination.pageSize
      this.$router.push({ query: this.query, force: true })
    },
    productType() {
      this.$router.push({ query: this.query, force: true })
    },
    productName(data) {
      this.$router.push({ query: this.query, force: true })
    }
  }
}
</script>
