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
import { ListService } from './list.service'
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
      listService: ListService
    }
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
      loading: this.listService.loading$,
      auth: this.listService.auth$,
      info: this.listService.info$
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
          value: { 1: '已结束', 2: '活动中', 3: '未开始', 4: '待发布' }
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
      Object.entries(this.activity_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return [{ value: -1, label: '全部状态' }, ...list]
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
    // 设置状态&名称
    setSearchData() {
      let { activity_name, activity_status } = this.$searchQuery
      console.log(activity_name, activity_status)
      this.activityName = activity_name
      this.activityStatus = activity_status || -1
    },
    // 活动发布
    onRelease(record) {
      this.listService.releaseGroup({ id: record.id }).subscribe(res => {
        that.$router.reload()
      })
    },
    // 数据
    onData(record) {
      console.log(record)
      this.$router.push({
        path: '/brand/marketing/plugin/group/data',
        query: { id: record.id }
      })
    },
    // 推广
    onGeneralize(record) {
      console.log(record.id)
      this.listService.getSharePosterInfo({ id: record.id }).subscribe(res => {
        console.log(res)
      })
    },
    // 编辑列表
    onEdit(record) {
      let id = record.product_type.id
      let url = ['edit-personal', 'dit-stored', 'edit-member', 'edit-course']
      if (id === 3) {
        this.$router.push({
          path: '/brand/marketing/plugin/group/edit-personal',
          query: { id: id }
        })
      } else if (id === 2) {
        this.$router.push({
          path: '/brand/marketing/plugin/group/edit-stored',
          query: { id: id }
        })
      } else if (id === 1) {
        this.$router.push({
          path: '/brand/marketing/plugin/group/edit-member',
          query: { id: id }
        })
      } else {
        this.$router.push({
          path: '/brand/marketing/plugin/group/edit-course',
          query: { id: id }
        })
      }
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
      this.$router.push({ path: '/brand/marketing/plugin/group/choose' })
    }
  },
  components: {
    MarkteingPluginTitle
  }
}
</script>
