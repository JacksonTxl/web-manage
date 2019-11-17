<template>
  <div :class="activities()">
    <st-panel-layout>
      <st-panel class="mg-b12">
        <!-- 这里是动态 -->
        <st-t2>
          双十一健身拼团活动
        </st-t2>
        <div :class="activities('desc')">
          <p :class="activities('activity')">活动商品：健身房年卡</p>
          <p :class="activities('activity')">
            活动时间：2019-05-20 10:38-2019-05-27 10:38
          </p>
        </div>
        <!-- <Header :id="query.id" /> -->
      </st-panel>
      <st-panel style="margin-top: 20px;">
        <div :class="activities('block')">
          <a-row :class="activities('acount')">
            <a-col :span="4">
              <p :class="activities('acount-title')">
                开团数
                <st-help-tooltip id="TBMGM001" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="collect[0].group_total"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                成团数
                <st-help-tooltip id="TBMGM002" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="collect[0].group_success_total"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                参与人数
                <st-help-tooltip id="TBMGM003" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="collect[0].join_total"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                新用户数
                <st-help-tooltip id="TBMGM004" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="collect[0].new_total"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                成单数
                <st-help-tooltip id="TBMGM004" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="collect[0].success_order_total"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                成交金额
                <st-help-tooltip id="TBMGM004" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="collect[0].success_amount_total"
              />
            </a-col>
          </a-row>
        </div>
      </st-panel>
      <st-panel :class="activities('search')">
        <a-select
          :class="activities('select')"
          v-model="groupStatus"
          placeholder="活动状态"
          @change="onSingleSearch('group_status', $event)"
          style="width: 130px"
        >
          <a-select-option v-for="item in groupType" :key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
        <st-input-search
          v-model="groupName"
          @search="onSingleSearch('coupon_name', $event)"
          placeholder="请输入活动名称"
        />
      </st-panel>
      <st-panel>
        <a-table
          rowKey="id"
          :columns="columns"
          :scroll="{ x: 1200 }"
          :dataSource="list"
          :rowClassName="rowClassName"
          @expandedRowsChange="onShow"
        ></a-table>
      </st-panel>
    </st-panel-layout>
  </div>
</template>
<script>
import { DataService } from './data.service.ts'
import { columns } from './data.config.ts'
import { State, Effect } from 'rx-state'
import tableMixin from '@/mixins/table.mixin'

let Color = ''
export default {
  name: 'PageBrandMarketingPluginGroupListData',
  bem: {
    activities: 'brand-marketing-plugin-group-list-data'
  },
  serviceInject() {
    return {
      dataService: DataService
    }
  },
  rxState() {
    return {
      list: this.dataService.list$,
      page: this.dataService.page$,
      collect: this.dataService.collect$,
      // loading: this.listService.loading$,
      // query: this.routeService.query$,
      auth: this.dataService.auth$
    }
  },
  data(vm) {
    return {
      showList: [],
      flag: true,
      groupName: '',
      groupStatus: -1,
      columns: columns(vm),
      couponEnums: {
        // select 假数据
        coupon_status: {
          description: '活动状态',
          value: { 1: '已结束', 2: '活动中', 3: '未开始', 4: '待发布' }
        }
      }
    }
  },
  computed: {
    group_status() {
      return (this.couponEnums && this.couponEnums.coupon_status) || []
    },
    groupType() {
      let list = []
      Object.entries(this.group_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return [{ value: -1, label: '全部状态' }, ...list]
      console.log(list)
    }
  },
  mounted() {
    this.setSearchData()
    console.log(this.collect[0].group_success_total)
  },
  watch: {
    query(newVal) {
      this.setSearchData()
    }
  },
  methods: {
    rowClassName(record, index) {
      let id = record && record.id
      let has = this.showList.includes(id)
      let className = ''
      if (index % 2 !== 0) {
        className = has ? 'classname shadow' : 'classname'
      } else {
        className = has ? 'shadow' : ''
      }
      if (record && record.children) {
        Color = className
        return className
      } else {
        let name = Color
        return name.indexOf('shadow') === -1 ? name : name.replace('shadow', '')
      }
    },

    // 设置searchData
    setSearchData() {
      // let { group_name, group_status } = this.query
      // this.groupName = coupon_name
      // this.groupStatus = group_status || -1
    },
    onSingleSearch(val, e) {
      console.log(val, e)
    },
    onShow(list) {
      this.showList = list
      this.rowClassName()
    }
  }
}
</script>
