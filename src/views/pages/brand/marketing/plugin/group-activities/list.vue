<template>
  <st-panel-layout>
    <MarkteingPluginTitle :type="TYPE.COUPON" />
    <st-panel app initial :class="basic()">
      <div slot="title" :class="basic('search')">
        <div :class="basic('add')">
          <st-button
            icon="add"
            type="primary"
            @click="onAddCoupon"
            v-if="auth.add"
          >
            新增活动
          </st-button>
        </div>
        <a-select
          :class="basic('select')"
          v-model="couponStatus"
          placeholder="活动状态"
          @change="onSingleSearch('coupon_status', $event)"
          style="width: 160px"
        >
          <a-select-option v-for="item in productType" :key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
        <st-input-search
          v-model="couponName"
          @search="onSingleSearch('coupon_name', $event)"
          placeholder="请输入活动名称"
        />
      </div>
      <div :class="basic('content')">
        <!-- 做判断  -->
        <st-table
          :page="page"
          rowKey="id"
          :columns="columns"
          @change="onTableChange"
          :scroll="{ x: 1500 }"
          :dataSource="list"
        >
          <template slot="is_shop_range" slot-scope="text, record">
            <span
              v-if="!record.shop_list.length || record.shop_list.length === 1"
            >
              {{ record.shop_list[0] }}
            </span>
            <a-popover placement="right" v-else>
              <template slot="content">
                <p
                  v-for="(item, index) in record.shop_list"
                  :key="index"
                  :value="index"
                >
                  {{ item }}
                </p>
              </template>
              <template slot="title">
                <span>支持门店</span>
              </template>
              <template>
                <a
                  v-modal-link="{
                    name: 'finance-search-staff-list-salary'
                  }"
                >
                  {{ text }}
                </a>
              </template>
              <a>共几家门店</a>
            </a-popover>
          </template>
          <template slot="valid_days" slot-scope="text">
            <span>领券当天开始 {{ text }} 天内有效</span>
          </template>
          <template slot="draw_num" slot-scope="text, record">
            <a @click="goReceive(record)">{{ text }}</a>
          </template>
          <template slot="coupon_type" slot-scope="text">
            <span>{{ text | couponTypeFilter }}</span>
          </template>
          <template slot="put_status" slot-scope="text">
            <span>{{ text | putStatusFilter }}</span>
          </template>
          <!-- 做权限点判断 -->
          <template slot="action" slot-scope="text, record">
            <st-table-actions sytle="width: 120px">
              <a
                @click="onData(record)"
                v-if="record.auth['brand:activity:coupon|edit']"
              >
                数据
              </a>
              <a
                @click="onEdit(record)"
                v-if="record.auth['brand:activity:coupon|edit']"
              >
                编辑
              </a>
              <!-- 写静态页面-->
              <!-- <a
                @click="onGeneralize(record)"
                v-if="record.auth['brand:activity:coupon|promotion']"
              >
                推广
              </a> -->
              <a
                @click="onStop(record)"
                v-if="record.auth['brand:activity:coupon|end']"
              >
                结束
              </a>
              <a
                @click="onStop(record)"
                v-if="record.auth['brand:activity:coupon|end']"
              >
                删除
              </a>
            </st-table-actions>
          </template>
        </st-table>
      </div>
    </st-panel>
  </st-panel-layout>
</template>
<script>
import { ListService } from './list.service'
import { UserService } from '@/services/user.service'
import { RouteService } from '@/services/route.service'
import MarkteingPluginTitle from '../../components#/marketing-title'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './list.config'
import { TYPE } from '@/constants/marketing/plugin'
import BrandMarketingBind from '@/views/biz-modals/brand/marketing/bind'
import BrandMarketingPoster from '@/views/biz-modals/brand/marketing/poster'

export default {
  name: 'PageBrandMarketingPluginCouponList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-brand-plugin-coupon'
  },
  modals: {
    BrandMarketingBind,
    BrandMarketingPoster
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
      // return list
      return [{ value: -1, label: '全部状态' }, ...list]
    }
  },
  data(vm) {
    return {
      TYPE,
      couponName: '',
      couponStatus: -1,
      columns: columns(vm)
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
      this.couponStatus = coupon_status || -1
    },
    // 查看数据   根据id传id获取数据列表
    onData() {
      this.$router.push({
        path: '/brand/marketing/plugin/group-activities/data'
        // query: { id: record.id }
      })
    },
    // 编辑
    onEdit(record) {
      // 跳转编辑页面
      this.$router.push({
        path: '/brand/marketing/plugin/coupon/edit', // 路由要改
        query: { id: record.id }
      })
    },
    // 推广
    onGeneralize(record) {
      let is_auth = record.is_auth
      // 绑定小程序
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
        // 未绑定小程序
        this.$modalRouter.push({
          name: 'brand-marketing-bind',
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
      let that = this
      this.$confirm({
        title: '提示',
        content:
          '结束后当用户进入投放该优惠券的活动时，将无法领取该优惠券。确认要结束？',
        onOk() {
          that.listService.stopMarketingCoupon(record.id).subscribe(res => {
            that.$router.reload()
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
      this.$router.push({
        path: '/brand/marketing/plugin/coupon/receive',
        query: { id: record.id }
      })
    }
  },
  filters: {
    couponTypeFilter(val) {
      switch (val) {
        case 1:
          return '普通券'
        case 2:
          return '活动券'
        default:
          return ''
      }
    },
    putStatusFilter(val) {
      switch (val) {
        case 1:
          return '未投放'
        case 2:
          return '已投放'
        default:
          return ''
      }
    }
  },
  components: {
    MarkteingPluginTitle
  }
}
</script>
