<template>
  <div :class="activities()">
    <st-panel-layout>
      <st-panel class="mg-b12" app>
        <!-- 这里是动态 -->
        <st-t2>{{ info.activity_name }}</st-t2>
        <div :class="activities('desc')">
          <p :class="activities('activity')">
            活动商品：{{ info.product_name }}
          </p>
          <p :class="activities('activity')">
            活动时间：{{ info.start_time }}~{{ info.end_time }}
          </p>
        </div>
      </st-panel>
      <st-panel>
        <div :class="activities('block')">
          <a-row :class="activities('acount')">
            <a-col :span="4">
              <p :class="activities('acount-title')">
                开团数
                <st-help-tooltip id="" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="collect.group_total"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                成团数
                <st-help-tooltip id="" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="collect.group_success_total"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                参与人数
                <st-help-tooltip id="" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="collect.join_total"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                新用户数
                <st-help-tooltip id="" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="collect.new_total"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                成单数
                <st-help-tooltip id="" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="collect.success_order_total"
              />
            </a-col>
            <a-col :span="4">
              <p :class="activities('acount-title')">
                成交金额
                <st-help-tooltip id="" />
              </p>
              <ICountUp
                class="number-up font-number"
                :endVal="collect.success_amount_total"
              />
            </a-col>
          </a-row>
        </div>
        <div :class="activities('search')">
          <a-select
            :class="activities('select')"
            v-model="groupStatus"
            placeholder="活动状态"
            @change="onSingleSearch('data_status', $event)"
            style="width: 130px"
          >
            <a-select-option v-for="item in groupType" :key="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
          <st-input-search
            v-model="searchWhere"
            @search="onSingleSearch('searchWhere', $event)"
            placeholder="请输入活动名称"
            maxlength="50"
          />
        </div>
        <template v-if="list.length > 1">
          <a-table
            rowKey="id"
            :columns="columns"
            :scroll="{ x: 1200 }"
            :dataSource="list"
            :rowClassName="rowClassName"
            @expandedRowsChange="onShow"
          ></a-table>
        </template>
        <template v-else>
          <a-table
            id="atable_no_data"
            rowKey="id"
            :columns="columns"
            :dataSource="list"
          ></a-table>
        </template>
      </st-panel>
    </st-panel-layout>
  </div>
</template>
<script>
import { DataService } from './data.service.ts'
import { columns } from './data.config.ts'
import { State, Effect } from 'rx-state'
import tableMixin from '@/mixins/table.mixin'
import Header from '../lottery/info/components#/header'
let Color = ''
export default {
  name: 'PageBrandMarketingPluginGroupListData',
  bem: {
    activities: 'brand-marketing-plugin-group-data'
  },
  mixins: [tableMixin],
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
      loading: this.dataService.loading$,
      info: this.dataService.info$
    }
  },
  data(vm) {
    return {
      showList: [],
      flag: true,
      searchWhere: '',
      groupStatus: -1,
      columns: columns(vm),
      dataEnum: {
        // select 假数据
        group_status: {
          description: '活动状态',
          value: { 1: '已结束', 2: '活动中', 3: '未开始', 4: '待发布' }
        }
      },
      numTwo: ''
    }
  },

  computed: {
    group_status() {
      return (this.dataEnum && this.dataEnum.group_status) || []
    },
    groupType() {
      let list = []
      Object.entries(this.group_status.value).forEach(item => {
        list.push({ value: +item[0], label: item[1] })
      })
      return [{ value: -1, label: '全部状态' }, ...list]
      // console.log(list)
    }
  },
  watch: {
    $searchQuery(newVal) {
      console.log(newVal)
      this.setSearchData()
    }
  },
  mounted() {
    console.log(this.info)
    this.setSearchData()
    console.log((3.987).toFixed(1))
    // this.numTwo = this.collect.success_amount_total.toFixed(1)
    console.log(parseInt(this.collect.success_amount_total))
    // console.log(this.numTwo)
  },

  methods: {
    setSearchData() {
      let { searchWhere, group_status } = this.$searchQuery
      this.searchWhere = searchWhere
      this.groupStatus = group_status || -1
    },
    rowClassName(record, index) {
      let id = record && record.id
      let has = this.showList.includes(id)
      let className = ''
      if (index % 2 !== 0) {
        className = has ? 'evengb shadow' : 'evengb'
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
    onGroupSearch(val, e) {
      console.log(val, e)
    },
    onShow(list) {
      this.showList = list
      this.rowClassName()
    }
  }
}
</script>
