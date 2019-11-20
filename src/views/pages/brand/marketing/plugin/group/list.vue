<template>
  <st-panel-layout>
    <MarkteingPluginTitle :type="TYPE.COUPON" />
    <st-panel app initial :class="basic()">
      <div slot="title" :class="basic('search')">
        <div :class="basic('add')">
          <st-button icon="add" type="primary" @click="onAddGroup">
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
        <st-table
          :page="page"
          rowKey="id"
          :columns="columns"
          @change="onTableChange"
          :scroll="{ x: 1240 }"
          :dataSource="list"
        >
          <!-- 商品类型 -->
          <template slot="product_type" slot-scope="text, record">
            <span>{{ record.product_type.name }}</span>
          </template>
          <!-- 支持门店 -->
          <!-- v-if="text.id === SUPPORT_SALES.SPECIFIED_STORE" 做判断 -->

          <template slot="support_sales" slot-scope="text, record">
            <a
              v-if="record.id"
              v-modal-link="{
                name: 'card-brand-member-shop-table',
                props: { id: record.id, type: 'Group', title: '支持门店' }
              }"
            >
              {{ text }}
            </a>
            <!-- <span class="use_num">{{ text.name }}</span> -->
          </template>
          <!-- 活动状态 -->
          <template slot="activity_state" slot-scope="text, record">
            <span
              v-if="
                record.activity_state.length === 1 &&
                  record.activity_state[0].published_time
              "
            >
              <a-popover
                v-if="record.activity_state[0].published_time"
                trigger="click"
                placement="topLeft"
                :overlayStyle="{ width: '300px' }"
              >
                <template slot="content">
                  <span>发布时间：</span>
                  <span>{{ record.activity_state[0].published_time }}</span>
                </template>
                <span>
                  {{ record.activity_state[0].name }}
                  <a-icon type="exclamation-circle" />
                </span>
                <!-- v-if="text.id === SELL_STATUS.NO_SELL"  做判断 -->
              </a-popover>
            </span>
            <span v-else>
              {{ record.activity_state[0].name }}
            </span>
          </template>
          <!-- 做权限点判断 -->
          <template slot="action" slot-scope="text, record">
            <st-table-actions sytle="width: 120px">
              <a @click="onData(record)">
                数据
              </a>
              <!-- v-if="record.auth['brand:activity:coupon|promotion']" 推广的数据判断 -->
              <a @click="onGeneralize(record)">
                推广
              </a>
              <!-- v-if="record.auth['brand:activity:group|edit']" 推广的数据判断 -->
              <a @click="onEdit(record)">
                编辑
              </a>
              <!-- v-if="record.auth['brand:activity:group|del']" 推广的数据判断 -->
              <a @click="onStop(record)">
                结束
              </a>
              <a @click="onRelease(record)">
                发布
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
// import { RouteService } from '@/services/route.service'
import MarkteingPluginTitle from '../../components#/marketing-title'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './list.config'
import { TYPE } from '@/constants/marketing/plugin'
import BrandMarketingBind from '@/views/biz-modals/brand/marketing/bind'
import BrandMarketingPoster from '@/views/biz-modals/brand/marketing/poster'
import CardBrandMemberShopTable from '@/views/biz-modals/card/brand-member/shop-table'

export default {
  name: 'PageBrandMarketingPluginGroupList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-brand-plugin-group-list'
  },
  modals: {
    BrandMarketingBind, //
    BrandMarketingPoster, // 海报
    CardBrandMemberShopTable
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
      // loading: this.listService.loading$,
      // query: this.$searchQuery,
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
        // select 假数据做处理
        activity_status: {
          description: '活动状态',
          value: { 1: '已结束', 2: '活动中', 3: '未开始', 4: '待发布' }
        }
      }
    }
  },
  mounted() {
    this.setSearchData()
  },
  watch: {
    $searchQuery(newVal) {
      console.log(newVal)
      this.setSearchData()
    }
  },
  methods: {
    // 设置searchData
    setSearchData() {
      let { activity_name, activity_status } = this.$searchQuery
      console.log(this.$searchQuery)
      this.activityName = activity_name
      this.activityStatus = activity_status || -1
    },
    // 活动发布
    onRelease(record) {
      // 活动发布
      // releaseGroup
      this.listService.releaseGroup({ id: record.id }).subscribe(res => {
        that.$router.reload()
      })
    },
    onData(record) {
      console.log(record)
      this.$router.push({
        path: '/brand/marketing/plugin/group/data',
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
    // 编辑列表
    onEdit(record) {
      let id = record.product_type.id
      if (id === 3) {
        this.$router.push({
          path: '/brand/marketing/plugin/group/add-personal',
          query: { id: id }
        })
      } else if (id === 2) {
        this.$router.push({
          path: '/brand/marketing/plugin/group/add-stored',
          query: { id: id }
        })
      } else if (id === 1) {
        this.$router.push({
          path: '/brand/marketing/plugin/group/add-member',
          query: { id: id }
        })
      } else {
        this.$router.push({
          path: '/brand/marketing/plugin/group/add-course',
          query: { id: id }
        })
      }
    },
    // 结束活动
    onStop(record) {
      let that = this
      // 结束tip不对
      this.$confirm({
        title: '提示',
        content: '确定停止该活动吗？活动停止后，未成团订单将自动关闭并退款。',
        onOk() {
          that.listService.stopGroup({ id: record.id }).subscribe(res => {
            console.log(res)
            that.$router.reload()
          })
        },
        onCancel() {}
      })
    },
    // 新增活动
    onAddGroup() {
      this.$router.push({ path: '/brand/marketing/plugin/group/choose' })
    }
  },
  //  过滤器
  filters: {
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
