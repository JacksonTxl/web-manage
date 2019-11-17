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
          v-model="activityStatus"
          placeholder="活动状态"
          @change="onSingleSearch('activity_status', $event)"
          style="width: 160px"
        >
          <a-select-option v-for="item in activityType" :key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
        <st-input-search
          v-model="activityName"
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
              <a>共几家门店</a>
            </a-popover>
          </template>
          <template slot="draw_num" slot-scope="text, record">
            <a @click="goReceive(record)">{{ text }}</a>
          </template>
          <template slot="coupon_type" slot-scope="text">
            <span>{{ text | couponTypeFilter }}</span>
          </template>
          <!-- 做权限点判断 -->
          <template slot="action" slot-scope="text, record">
            <st-table-actions sytle="width: 120px">
              <a @click="onData(record)">
                数据
              </a>
              <a @click="onEdit(record)">
                编辑
              </a>
              <!-- 写静态页面-->
              <!-- <a
                @click="onGeneralize(record)"
                v-if="record.auth['brand:activity:coupon|promotion']"
              >
                推广
              </a> -->
              <a @click="onStop(record)">
                结束
              </a>
              <a @click="onStop(record)">
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
  name: 'PageBrandMarketingPluginGroupActivitiesList',
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
      // loading: this.listService.loading$,
      query: this.routeService.query$,
      // couponEnums: this.userService.couponEnums$,
      auth: this.listService.auth$
    }
  },
  computed: {
    activity_status() {
      return (this.activityEnums && this.activityEnums.activity_status) || []
    },
    activityType() {
      let list = []
      Object.entries(this.activity_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      // return list
      return [{ value: -1, label: '全部状态' }, ...list]
    }
  },
  data(vm) {
    return {
      TYPE,
      activityName: '',
      activityStatus: -1,
      columns: columns(vm),
      activityEnums: {
        // select 假数据
        activity_status: {
          description: '活动状态',
          value: { 1: '已结束', 2: '活动中', 3: '未开始', 4: '待发布' }
        }
      }
    }
  },
  mounted() {
    this.setSearchData()
    console.log(this.list)
  },
  watch: {
    query(newVal) {
      console.log(newVal)
      this.setSearchData()
    }
  },
  methods: {
    // 设置searchData
    setSearchData() {
      // let { activity_name, activity_status } = this.query
      // this.activityName = activity_name
      // this.activityStatus = activity_status || -1
    },
    // 查看数据   根据id传id获取数据列表
    onData(record) {
      this.$router.push({
        path: '/brand/marketing/plugin/group-activities/data',
        query: { id: record.id }
      })
    },
    // 编辑
    onEdit(record) {
      // 跳转编辑页面  传类型卡及卡id
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
    // 结束活动
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
    // 新增活动
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
  //  过滤器
  filters: {
    couponTypeFilter(val) {
      switch (val) {
        case 1:
          return '会籍卡'
        case 2:
          return '私教课'
        case 3:
          return '小班课'
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
