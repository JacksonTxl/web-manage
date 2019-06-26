<template>
  <div>
    <MarkteingPluginTitle />
    <st-panel app initial :class="basic()">
      <div slot="title" :class="basic('search')">
        <st-input-search
        v-model="queryParams.couponName"
        @search="onSearch"
        placeholder="请输入优惠券名称"
        style="width: 290px;"/>
        <a-select :class="basic('select')" v-model="queryParams.couponStatus" @change="onSearch" style="width: 160px">
          <a-select-option
          v-for="(item,index) in productType"
          :key="index"
          :value="item.value">{{item.label}}</a-select-option>
        </a-select>
      </div>
      <div :class="basic('content')">
        <st-table
        :pagination="{current:query.page,total:page.total_counts,pageSize:query.size}"
        rowKey="id"
        :columns="columns"
        @change="onPageChange"
        :dataSource="list">
          <div slot="action" slot-scope="text,record">
            <a  @click="onEdit(record)">编辑</a>
            <a-divider type="vertical"></a-divider>
            <a  @click="onEdit(record)">推广</a>
            <a-divider type="vertical"></a-divider>
            <a  @click="onEdit(record)">结束</a>
          </div>
        </st-table>
      </div>
    </st-panel>
  </div>
</template>

<script>
import { ListService } from './list.service'
import { UserService } from '@/services/user.service'
import { RouteService } from '@/services/route.service'
import MarkteingPluginTitle from '../../components#/marketing-title'
export default {
  name: 'PageBrandMarktingPluginCoupon',
  bem: {
    basic: 'page-brand-plugin-coupon'
  },
  serviceInject() {
    return {
      listService: ListService,
      userService: UserService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
      loading: this.listService.loading$,
      query: this.routeService.query$,
      transaction: this.userService.transactionEnums$,
      auth: this.listService.auth$
    }
  },
  computed: {
    productType() {
      let list = []
      if (!this.transaction.product_type) return list
      Object.entries(this.transaction.product_type.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  data() {
    return {
      queryParams: {
        couponName: '',
        couponStatus: ''
      },
      columns: [
        {
          title: '优惠券名称',
          dataIndex: 'coupon_name',
          scopedSlots: { customRender: 'coupon_name' }
        }, {
          title: '类型',
          dataIndex: 'coupon_type',
          scopedSlots: { customRender: 'coupon_type' }
        }, {
          title: '可用门店',
          dataIndex: 'is_shop_range',
          scopedSlots: { customRender: 'is_shop_range' }
        }, {
          title: '面额(元)',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' }
        }, {
          title: '使用有效期',
          dataIndex: 'valid_days',
          scopedSlots: { customRender: 'valid_days' }
        }, {
          title: '剩余数量',
          dataIndex: 'margin',
          scopedSlots: { customRender: 'margin' }
        }, {
          title: '已领取',
          dataIndex: 'sold_num',
          scopedSlots: { customRender: 'sold_num' }
        }, {
          title: '已使用',
          dataIndex: 'sold_num',
          scopedSlots: { customRender: 'sold_num' }
        }, {
          title: '状态',
          dataIndex: 'put_status',
          scopedSlots: { customRender: 'put_status' }
        }, {
          title: '操作',
          dataIndex: 'action',
          width: 140,
          scopedSlots: { customRender: 'action' }
        }]
    }
  },
  mounted() {
    this.setSearchData()
  },
  watch: {
    query(newVal) {
      this.setSearchData()
    }
  },
  methods: {
    onPageChange(data) {
      this.$router.push({ query: { ...this.query, page: data.current, size: data.pageSize }, force: true })
    },
    // 查询
    onSearch() {
      let params = {
        coupon_status: this.queryParams.couponStatus,
        coupon_name: this.queryParams.couponName
      }
      this.$router.push({ query: { ...this.query, ...params } })
    },
    // 重置
    onReset() {
      let query = {
        keyword: '',
        status: -1,
        type: -1,
        start_date: '',
        end_date: ''
      }
      this.$router.push({ query: { ...this.query, ...query } })
    },
    // 设置searchData
    setSearchData() {
      this.keyword = this.query.keyword
      this.status = this.query.status
      this.type = this.query.type
      this.start_date = this.query.start_date
        ? cloneDeep(moment(this.query.start_date))
        : null
      this.end_date = this.query.end_date
        ? cloneDeep(moment(this.query.end_date))
        : null
    },
    // 编辑
    onEdit() {
      this.$modalRouter.push({
        name: 'sold-deal-gathering',
        props: {

        },
        on: {
          success: () => {

          }
        }
      })
    }
  },
  components: {
    MarkteingPluginTitle
  }
}
</script>
