<template>
    <div :class="inviation()">
        <a-row :class="inviation('acount')">
            <a-col :span="6">
                <p :class="inviation('acount-title')">
                    参与活动邀请人
                    <st-icon type="help"></st-icon>
                </p>
                <ICountUp class="number-up" :endVal="reportInfo.total_inviter_num"/>
            </a-col>
            <a-col :span="6">
                <p :class="inviation('acount-title')">
                    拉新注册人数
                    <st-icon type="help"></st-icon>
                </p>
                <ICountUp class="number-up" :endVal="reportInfo.total_newbie_register_num"/>
            </a-col>
            <a-col :span="6">
                <p :class="inviation('acount-title')">
                    拉新领券人数
                    <st-icon type="help"></st-icon>
                </p>
                <ICountUp class="number-up" :endVal="reportInfo.total_coupon_num"/>
            </a-col>
            <a-col :span="6">
                <p :class="inviation('acount-title')">
                    拉新交易人数
                    <st-icon type="help"></st-icon>
                </p>
                <ICountUp class="number-up" :endVal="reportInfo.total_order_num"/>
            </a-col>
        </a-row>
        <div v-if="!isOpen" :class="inviation('data-none')">
            <img
            :src="config.PLACEHOLDER_IMG.NODATA | imgFilter({w:197,h:136})"
            width="197"
            height="136"
            alt="暂无数据">
            <p>还未开启邀请有礼功能，立即开启吧！</p>
            <st-button type="primary" @click="onGoOpen">立即开启</st-button>
        </div>
        <div v-else :class="inviation('table')">
            <div :class="inviation('table-operation')" class="mg-b16">
                <st-button :disabled="!selectedRowKeys.length" type="primary">批量导出</st-button>
                <a-radio-group v-model="tableType" @change="onTabChange" buttonStyle="solid">
                    <a-radio-button :value="0">活动效果</a-radio-button>
                    <a-radio-button :value="1">邀请用户</a-radio-button>
                </a-radio-group>
            </div>
            <st-table
            v-if="!tableType"
            :alertSelection="{onReset: onClear}"
            :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
            @change="onDayPageChange"
            :columns="columnsActivity"
            :dataSource="stDayList"
            :pagination="{current:dayPage.page,total:dayPage.total_counts,pageSize:dayPage.size}"
            rowKey="key"
            />
            <st-table
            v-if="tableType"
            :alertSelection="{onReset: onClear}"
            :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
            @change="onInviteePageChange"
            :columns="columnsUser"
            :dataSource="stInviteeList"
            :pagination="{current:inviteePage.page,total:inviteePage.total_counts,pageSize:inviteePage.size}"
            rowKey="key"
            />
        </div>
    </div>
</template>
<script>
import { AppConfig } from '@/constants/config'
import { columnsActivity, columnsUser } from './data.config'
import { DataService } from './data.service'
import { IndexService } from '../index.service'
export default {
  name: 'PageBrandMarketingInviationData',
  bem: {
    inviation: 'page-brand-marketing-inviation-data'
  },
  serviceInject() {
    return {
      config: AppConfig,
      dataService: DataService,
      indexService: IndexService
    }
  },
  rxState() {
    return {
      isOpen: this.indexService.isOpen$,
      dataLoading: this.dataService.loading$,
      reportInfo: this.dataService.reportInfo$,
      dayList: this.dataService.dayList$,
      dayPage: this.dataService.dayPage$,
      inviteeList: this.dataService.inviteeList$,
      inviteePage: this.dataService.inviteePage$
    }
  },
  computed: {
    stDayList() {
      let array = []
      this.dayList.forEach(i => {
        let key = parseInt(Math.random() * 999999).toString()
        array.push({ ...i, key: key })
      })
      return array
    },
    stInviteeList() {
      let array = []
      this.inviteeList.forEach(i => {
        let key = parseInt(Math.random() * 999999).toString()
        array.push({ ...i, key: key })
      })
      return array
    }
  },
  data() {
    return {
      columnsActivity,
      columnsUser,
      selectedRowKeys: [],
      selectedRows: [],
      // 表格类别 0活动效果 1邀请用户
      tableType: 0,

      list: [
        { id: 1, aaaaa: 'aaaaa', bbbbb: 'bbbbb', ccccc: 'ccccc', ddddd: 'ddddd', eeeee: 'eeeee', fffff: 'fffff', ggggg: 'ggggg' },
        { id: 2, aaaaa: 'aaaaa', bbbbb: 'bbbbb', ccccc: 'ccccc', ddddd: 'ddddd', eeeee: 'eeeee', fffff: 'fffff', ggggg: 'ggggg' },
        { id: 3, aaaaa: 'aaaaa', bbbbb: 'bbbbb', ccccc: 'ccccc', ddddd: 'ddddd', eeeee: 'eeeee', fffff: 'fffff', ggggg: 'ggggg' },
        { id: 4, aaaaa: 'aaaaa', bbbbb: 'bbbbb', ccccc: 'ccccc', ddddd: 'ddddd', eeeee: 'eeeee', fffff: 'fffff', ggggg: 'ggggg' }
      ]
    }
  },
  methods: {
    // 去开启
    onGoOpen() {
      this.$router.push({
        name: 'brand-marketing-plugin-invitation-index-setting',
        params: {
          from: 'data'
        }
      })
    },
    // 清空列表选择
    onClear() {
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    // 列表选择
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 分页
    onDayPageChange(data) {
      this.onClear()
      this.dataService.getInviteDay({
        page: data.current,
        size: data.pageSize
      }).subscribe()
    },
    onInviteePageChange(data) {
      this.onClear()
      this.dataService.getInviteInvitee({
        page: data.current,
        size: data.pageSize
      }).subscribe()
    },

    onTabChange() {
      this.onClear()
    }
  }
}
</script>
