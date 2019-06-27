<template>
    <div :class="inviation()">
        <a-row :class="inviation('acount')">
            <a-col :span="6">
                <p :class="inviation('acount-title')">
                    参与活动邀请人
                    <st-icon type="help"></st-icon>
                </p>
                <span>10231</span>
            </a-col>
            <a-col :span="6">
                <p :class="inviation('acount-title')">
                    参与活动邀请人
                    <st-icon type="help"></st-icon>
                </p>
                <span>10231</span>
            </a-col>
            <a-col :span="6">
                <p :class="inviation('acount-title')">
                    参与活动邀请人
                    <st-icon type="help"></st-icon>
                </p>
                <span>10231</span>
            </a-col>
            <a-col :span="6">
                <p :class="inviation('acount-title')">
                    参与活动邀请人
                    <st-icon type="help"></st-icon>
                </p>
                <span>10231</span>
            </a-col>
        </a-row>
        <div v-if="false" :class="inviation('data-none')">
            <img
            :src="config.PLACEHOLDER_IMG.NODATA | imgFilter({w:197,h:136})"
            width="197"
            height="136"
            alt="暂无数据">
            <p>还未开启邀请有礼功能，立即开启吧！</p>
            <st-button type="primary">立即开启</st-button>
        </div>
        <div v-if="true" :class="inviation('table')">
            <div :class="inviation('table-operation')" class="mg-b16">
                <st-button :disabled="!selectedRowKeys.length" type="primary">批量导出</st-button>
                <a-radio-group v-model="tableType" @change="onTabChange" buttonStyle="solid">
                    <a-radio-button :value="0">活动效果</a-radio-button>
                    <a-radio-button :value="1">邀请用户</a-radio-button>
                </a-radio-group>
            </div>
            <!-- <st-table
            :alertSelection="{onReset: onClear}"
            :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
            @change="onPageChange"
            :columns="columns"
            :dataSource="list"
            :pagination="{current:query.page,total:page.total_counts,pageSize:query.size}"
            rowKey="id"
            > -->
            <st-table
            v-if="!tableType"
            :alertSelection="{onReset: onClear}"
            :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
            @change="onPageChange"
            :columns="columnsActivity"
            :dataSource="list"
            :pagination="{current:1,total:4,pageSize:20}"
            rowKey="id"
            />
            <st-table
            v-if="tableType"
            :alertSelection="{onReset: onClear}"
            :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
            @change="onPageChange"
            :columns="columnsUser"
            :dataSource="list"
            :pagination="{current:1,total:4,pageSize:20}"
            rowKey="id"
            />
        </div>
    </div>
</template>
<script>
import { AppConfig } from '@/constants/config'
import { columnsActivity, columnsUser } from './data.config'
export default {
  name: 'PageBrandMarketingInviationData',
  bem: {
    inviation: 'page-brand-marketing-inviation-data'
  },
  serviceInject() {
    return {
      config: AppConfig
    }
  },
  data() {
    return {
      columnsActivity,
      columnsUser,
      selectedRowKeys: [],
      selectedRows: [],
      // 表格类别 0活动效果 1邀请用户
      tableType: 1,
      list: [
        { id: 1, aaaaa: 'aaaaa', bbbbb: 'bbbbb', ccccc: 'ccccc', ddddd: 'ddddd', eeeee: 'eeeee', fffff: 'fffff', ggggg: 'ggggg' },
        { id: 2, aaaaa: 'aaaaa', bbbbb: 'bbbbb', ccccc: 'ccccc', ddddd: 'ddddd', eeeee: 'eeeee', fffff: 'fffff', ggggg: 'ggggg' },
        { id: 3, aaaaa: 'aaaaa', bbbbb: 'bbbbb', ccccc: 'ccccc', ddddd: 'ddddd', eeeee: 'eeeee', fffff: 'fffff', ggggg: 'ggggg' },
        { id: 4, aaaaa: 'aaaaa', bbbbb: 'bbbbb', ccccc: 'ccccc', ddddd: 'ddddd', eeeee: 'eeeee', fffff: 'fffff', ggggg: 'ggggg' }
      ]
    }
  },
  methods: {
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
    onPageChange(data) {
      // this.$router.push({ query: { ...this.query, page: data.current, size: data.pageSize } })
    },
    onTabChange() {
      this.onClear()
    }
  }
}
</script>
