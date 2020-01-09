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
            新增优惠券
          </st-button>
        </div>
        <a-select
          :class="basic('select')"
          v-model="couponStatus"
          placeholder="优惠券状态"
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
          placeholder="请输入优惠券名称"
        />
      </div>
      <div :class="basic('content')">
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
            <!-- 改为弹框start -->
            <a
              v-else
              v-modal-link="{
                name: 'brand-marketing-coupon-table',
                props: { id: record.id, type: 'Sale', title: '可用门店' }
              }"
            >
              共{{ record.shop_num }}家门店
            </a>
            <!-- 改为弹框end -->
            <!-- <a-popover placement="right" v-else>
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
                <span>可用门店</span>
              </template>
              <a>可用门店</a>
            </a-popover> -->
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
          <template slot="action" slot-scope="text, record">
            <st-table-actions sytle="width: 120px">
              <a
                @click="onEdit(record)"
                v-if="record.auth['brand:activity:coupon|edit']"
              >
                编辑
              </a>
              <a
                @click="onGeneralize(record)"
                v-if="record.auth['brand:activity:coupon|promotion']"
              >
                推广
              </a>
              <a
                @click="onStop(record)"
                v-if="record.auth['brand:activity:coupon|end']"
              >
                结束
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
import MarkteingPluginTitle from '../../components#/marketing-title'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './list.config'
import { TYPE } from '@/constants/marketing/plugin'
import useShare from '@/hooks/marketing/share.hook'
import BrandMarketingCouponTable from '@/views/biz-modals/brand/marketing/coupon-table'
export default {
  name: 'PageBrandMarketingPluginCouponList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-brand-plugin-coupon'
  },
  modals: {
    BrandMarketingCouponTable
  },
  serviceInject() {
    return {
      listService: ListService,
      userService: UserService
    }
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
      loading: this.listService.loading$,
      info: this.listService.info$,
      brand: this.listService.brand$,
      auth: this.listService.auth$,
      productType: this.listService.productType$
    }
  },
  hooks() {
    return {
      share: useShare()
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
      let { coupon_name, coupon_status } = this.$searchQuery
      this.couponName = coupon_name
      this.couponStatus = coupon_status || -1
    },
    // 编辑
    onEdit(record) {
      this.$router.push({
        path: '/brand/marketing/plugin/coupon/edit',
        query: { id: record.id }
      })
    },
    onGeneralize(record) {
      let isAuth = record.is_auth
      this.listService.getPosterInfo(record.id).subscribe(res => {
        const shsInfo = {
          qrcode_url: this.info.qrcode_url,
          brand_logo: this.info.brand_logo,
          brand_name: this.info.brand_name,
          price: this.info.price
        }
        this.share.poster({ isAuth, shsInfo, shsPath: '/saas/poster' })
      })
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
  // FIXME: 改用枚举
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
