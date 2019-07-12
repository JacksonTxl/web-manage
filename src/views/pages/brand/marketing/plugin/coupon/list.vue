<template>
  <div>
    <MarkteingPluginTitle :type="1"/>
    <st-panel app initial :class="basic()">
      <div slot="title" :class="basic('search')">
        <div :class="basic('add')">
          <st-button icon="add" type="primary" @click="onAddCoupon" v-if="auth.add">新增优惠券</st-button>
        </div>
        <a-select
          :class="basic('select')"
          v-model="couponStatus"
          placeholder="优惠券状态"
          :allowClear="true"
          @change="onSingleSearch('coupon_status', $event)"
          style="width: 160px">
          <a-select-option
            v-for="item in productType"
            :key="item.value">{{item.label}}</a-select-option>
        </a-select>
        <st-input-search
          v-model="couponName"
          @search="onSingleSearch('coupon_name', $event)"
          placeholder="请输入优惠券名称"
          style="width: 290px;"/>
      </div>
      <div :class="basic('content')">
        <st-table
          :page="page"
          rowKey="id"
          :columns="columns"
          @change="onTableChange"
          :scroll="{ x: 1500 }"
          :dataSource="list">
          <template slot="is_shop_range" slot-scope="text, record">
            <a-popover placement="right">
              <template slot="content">
                <p v-for="(item, index) in record.shop_list" :key="index" :value="index">{{item}}</p>
              </template>
              <template slot="title">
                <span>可用门店</span>
              </template>
              <a>{{text}}</a>
            </a-popover>
          </template>
          <template slot="draw_num" slot-scope="text, record">
            <a @click="goReceive(record)">{{text}}</a>
          </template>
          <template slot="action" slot-scope="text,record">
            <st-table-actions>
              <a href="#" @click="onEdit(record)" v-if="record.auth['brand:activity:coupon|edit']">编辑</a>
              <a href="#" @click="onGeneralize(record)" v-if="record.auth['brand:activity:coupon|promotion']">推广</a>
              <a href="#" @click="onStop(record)" v-if="record.auth['brand:activity:coupon|end']">结束</a>
            </st-table-actions>
          </template>
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
import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'PageBrandMarketingPluginCouponList',
  mixins: [ tableMixin ],
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
      couponEnums: this.userService.couponEnums$,
      auth: this.listService.auth$
    }
  },
  computed: {
    coupon_status() {
      return (this.couponEnums && this.couponEnums.coupon_status) || []
    },
    productType() {
      let list = []
      Object.entries(this.coupon_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  data() {
    return {
      couponName: '',
      couponStatus: undefined,
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
          dataIndex: 'draw_num',
          scopedSlots: { customRender: 'draw_num' }
        }, {
          title: '已使用',
          dataIndex: 'use_num',
          scopedSlots: { customRender: 'use_num' }
        }, {
          title: '状态',
          dataIndex: 'coupon_status',
          scopedSlots: { customRender: 'coupon_status' }
        }, {
          title: '投放状态',
          dataIndex: 'put_status',
          scopedSlots: { customRender: 'put_status' }
        }, {
          title: '操作',
          dataIndex: 'action',
          width: 140,
          fixed: 'right',
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
    // 设置searchData
    setSearchData() {
      let { coupon_name, coupon_status } = this.query
      this.couponName = coupon_name
      this.couponStatus = coupon_status || undefined
    },
    // 编辑
    onEdit(record) {
      this.$router.push({ path: '/brand/marketing/plugin/coupon/add', query: { id: record.id } })
    },
    onGeneralize(record) {
      let is_auth = record.is_auth
      if (is_auth) {
        // 分享海报
        this.$modalRouter.push({
          name: 'brand-marketing-poster',
          props: {
            id: String(record.id),
            type: 1
          },
          on: {
            success: () => {
              console.log('success')
            }
          }
        })
      } else {
        // 分享小程序
        this.$modalRouter.push({
          name: 'brand-marketing-poster',
          props: {
            id: record.id,
            type: 2
          },
          on: {
            success: () => {
              console.log('success')
            }
          }
        })
      }
    },
    // 停止优惠券模板
    onStop(record) {
      this.$confirm({
        title: '提示',
        content: '结束后当用户进入投放该优惠券的活动时，将无法领取该优惠券。确认要结束？',
        onOk() {
          this.listService.stopMarketingCoupon(record.id).subscribe(res => {
            this.$router.push({ force: true })
          })
        },
        onCancel() {}
      })
    },
    // 新增优惠券活动
    onAddCoupon() {
      this.$router.push({ path: '/brand/marketing/plugin/coupon/add' })
    },
    goReceive(record) {
      this.$router.push({ path: '/brand/marketing/plugin/coupon/receive', query: { id: record.id } })
    }
  },
  components: {
    MarkteingPluginTitle
  }
}
</script>
