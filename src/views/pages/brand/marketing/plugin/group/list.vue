<template>
  <st-panel-layout>
    <MarkteingPluginTitle :type="TYPE.GROUP_BUY" />
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
          @search="onSingleSearch('activty_name', $event)"
          placeholder="请输入活动名称"
          maxlength="50"
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
import { UserService } from '@/services/user.service'

import { ListService } from './list.service'
import MarkteingPluginTitle from '../../components#/marketing-title'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './list.config'
import { TYPE } from '@/constants/marketing/plugin'
import BrandMarketingBind from '@/views/biz-modals/brand/marketing/bind'
import MarketingSharePoster from '@/views/biz-modals/brand/marketing/share-poster'
import CardBrandMemberShopTable from '@/views/biz-modals/card/brand-member/shop-table'

export default {
  name: 'PageBrandMarketingPluginGroupList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-brand-plugin-group-list'
  },
  modals: {
    BrandMarketingBind,
    MarketingSharePoster,
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
      loading: this.listService.loading$,
      auth: this.listService.auth$,
      info: this.listService.info$,
      couponEnums: this.userService.couponEnums$
    }
  },

  data(vm) {
    return {
      TYPE,
      activityName: '',
      activityStatus: -1,
      columns: columns(vm),
      activityEnum: {
        // select 假数据做处理
        activity_status: {
          description: '活动状态',
          value: { 5: '已结束', 2: '未开启', 1: '已开启' }
        }
      }
    }
  },
  computed: {
    //状态
    activity_status() {
      return (this.activityEnum && this.activityEnum.activity_status) || []
    },
    activityType() {
      let list = []
      Object.entries(this.activity_status.value).forEach(item => {
        list.push({ value: +item[0], label: item[1] })
      })
      return [{ value: -1, label: '全部状态' }, ...list]
    }
  },
  mounted() {
    this.setSearchData()
    console.log(this.couponEnums, '枚举')
    console.log(this.auth, '权限点')
    console.log(this.page, 'page页面')
  },
  watch: {
    query(newVal) {
      this.setSearchData()
    }
  },
  methods: {
    // 设置状态&名称
    setSearchData() {
      let { activty_name, activity_status } = this.$searchQuery
      this.activityName = activty_name
      this.activityStatus = activity_status || -1
    },
    // 活动发布
    onRelease(record) {
      let that = this
      this.$confirm({
        title: '提示',
        content: '确定发布该活动?发布成功后，用户即可在小程序端看到该活动。',
        onOk() {
          that.listService.releaseGroup(record.id).subscribe(res => {
            that.$router.reload()
          })
        },
        onCancel() {}
      })
    },

    // 数据
    onData(record) {
      console.log(record.id)
      this.routeRul('data', record.id)
    },
    // 推广
    onGeneralize(record) {
      this.listService.getSharePosterInfo({ id: record.id }).subscribe(res => {
        console.log(res)
        const info = res
        // const activity_date = `${info.start_time} - ${info.end_time}`
        this.$modalRouter.push({
          name: 'marketing-share-poster',
          props: {
            info: {
              qrcode_url: info.qrcode_base, // besa  64
              brand_name: info.brand_name,
              brand_logo: info.product_logo,
              activity_img: info.product_logo,
              activity_title: info.product_name
              // activity_date,
              // activity_address: info.address
            },
            shsUrl: '/saas/activity'
          }
        })
      })
    },
    // 编辑列表
    onEdit(record) {
      console.log(record.id, '活动id')
      let typeId = record.product_type.id
      console.log(typeId)
      let id = record.id
      switch (typeId) {
        case 3:
          this.routeRul('edit-personal', `${id}`)
          break
        case 2:
          this.routeRul('edit-stored', `${id}`)
          break
        case 1:
          this.routeRul('edit-member', `${id}`)
          break
        case 4:
          this.routeRul('edit-course', `${id}`)
          break
        default:
      }
    },
    routeRul(url, id) {
      console.log(url, id)
      this.$router.push({
        path: `/brand/marketing/plugin/group/${url}`,
        query: { id: id }
      })
    },
    // 结束活动
    onStop(record) {
      let that = this
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
      this.routeRul('choose')
    }
  },
  components: {
    MarkteingPluginTitle
  }
}
</script>
