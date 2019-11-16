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
                :endVal="statInfo.total_inviter_num"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                成团数
                <st-help-tooltip id="TBMGM002" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="statInfo.total_newbie_register_num"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                参与人数
                <st-help-tooltip id="TBMGM003" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="statInfo.total_coupon_num"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                新用户数
                <st-help-tooltip id="TBMGM004" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="statInfo.total_newbieorder_num"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                成单数
                <st-help-tooltip id="TBMGM004" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="statInfo.total_ordernewbie_num"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                成交金额
                <st-help-tooltip id="TBMGM004" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="statInfo.total_newbiorder_num"
              />
            </a-col>
          </a-row>
        </div>
        <div :class="activities('search')">
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
        </div>
      </st-panel>
      <st-panel>
        <a-table
          rowKey="id"
          :columns="columns"
          :scroll="{ x: 1300 }"
          :dataSource="newList"
          :rowClassName="rowClassName"
          @expandedRowsChange="onShow"
        ></a-table>
      </st-panel>
    </st-panel-layout>
  </div>
</template>
<script>
import { columns } from './data.config.ts'
import { columnsData } from './totaldata.config.js'
let Color = ''
export default {
  name: 'PageBrandMarketingPluginGroupActivitiesListData',
  bem: {
    activities: 'brand-marketing-plugin-group-activities-data'
  },
  rxState() {
    return {
      list: this.dataService.list$,
      page: this.dataService.page$,
      // loading: this.listService.loading$,
      query: this.routeService.query$,
      // couponEnums: this.userService.couponEnums$,
      auth: this.dataService.auth$
    }
  },
  data(vm) {
    return {
      showList: [],
      flag: true,
      groupName: '',
      groupStatus: -1,
      columnsData,
      columns: columns(vm),
      couponEnums: {
        // select 假数据
        coupon_status: {
          description: '活动状态',
          value: { 1: '已结束', 2: '活动中', 3: '未开始', 4: '待发布' }
        }
      },
      statInfo: {
        total_coupon_num: 1,
        total_inviter_num: 56,
        total_newbie_register_num: 345,
        total_newbieorder_num: 4352,
        total_ordernewbie_num: 432,
        total_newbiorder_num: 3425
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
    },
    newList() {
      let newList = []
      this.list.filter((item, index) => {
        newList.push({
          id: item.group_number,
          start_time: item.opening_time,
          children: item.children,
          shop_name: item.group_store,
          member_name: item.group_member,
          member_type: item.group_identity,
          group_status: item.group_status,
          member_mobile: item.group_phone,
          join_start_time: item.participation_time,
          is_new_member: item.newold_users,
          order_id: item.order_number
        })
      })
      return newList
    }
  },
  mounted() {
    this.setSearchData()
    console.log(Color)
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
