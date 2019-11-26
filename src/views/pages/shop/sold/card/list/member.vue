<template>
  <div :class="basic()">
    <div v-di-view="{ name: 'SHOP_SOLD_CARD_LIST_ACTIONS' }">
      <st-input-search
        v-model="$searchQuery.search"
        @search="onKeywordsSearch('search', $event)"
        placeholder="请输入卡名、合同编号、会员姓名或手机号查找"
        style="width:360px"
      />
    </div>
    <st-search-panel @search="onSearchNative" @reset="onSearhReset">
      <st-search-panel-item :label="`${$c('member_card')}类型：`">
        <st-search-radio
          v-model="$searchQuery.card_type"
          :options="cardTypes"
        />
      </st-search-panel-item>
      <st-search-panel-item :label="`${$c('member_card')}状态：`">
        <st-search-radio
          v-model="$searchQuery.card_status"
          :options="cardStatus"
        />
      </st-search-panel-item>
      <st-search-panel-item label="开卡状态：">
        <st-search-radio v-model="$searchQuery.is_open" :options="isOpens" />
      </st-search-panel-item>

      <div slot="more">
        <st-search-panel-item label="开卡时间：">
          <st-range-picker
            :disabledDays="180"
            :value="selectTime"
          ></st-range-picker>
        </st-search-panel-item>
      </div>
    </st-search-panel>
    <div :class="basic('content')">
      <div :class="basic('content-batch')" class="mg-b16">
        <!-- NOTE: 导出 -->
        <!-- <st-button type="primary" class="mg-r8" v-if="auth.export">批量导出</st-button> -->
        <template
          v-if="selectedRowKeys.length >= 1 && diffSelectedRows.length === 0"
        >
          <st-button
            type="primary"
            class="mg-r8"
            v-if="auth.gift"
            @click="onGiving"
          >
            赠送额度
          </st-button>
        </template>
        <template v-else>
          <st-help-tooltip
            :isCustom="true"
            title="只支持一种类型卡选择"
            :defaultVisible="true"
            v-model="visible"
          >
            <st-button
              type="primary"
              class="mg-r8"
              v-if="auth.gift"
              :disabled="true"
            >
              赠送额度
            </st-button>
          </st-help-tooltip>
        </template>

        <st-button
          type="primary"
          class="mg-r8"
          v-if="auth.vipRegion"
          :disabled="selectedRowKeys.length < 1"
          @click="onAreas"
        >
          变更入场vip区域
        </st-button>

        <st-button
          v-if="auth.batch_admission"
          type="primary"
          class="mg-r8"
          :disabled="selectedRowKeys.length < 1"
          @click="onEnterTime"
        >
          变更入场时段
        </st-button>
      </div>
      <div>
        <st-table
          :page="page"
          :loading="loading.getList"
          :alertSelection="{ onReset: onClear }"
          :rowSelection="{
            selectedRowKeys: selectedRowKeys,
            fixed: true,
            onChange: onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: disabledSelect(record) // Column configuration not to be checked
              }
            })
          }"
          rowKey="id"
          @change="onTableChange"
          :columns="columns"
          :dataSource="list"
          :scroll="{ x: 1800 }"
        >
          <template slot="remain_amount" slot-scope="text, record">
            {{ text }}{{ record.unit | enumFilter('sold_common.unit') }}
          </template>
          <template slot="init_amount" slot-scope="text, record">
            {{ text }}{{ record.unit | enumFilter('sold_common.unit') }}
          </template>
          <template slot="card_status" slot-scope="text">
            {{ text | enumFilter('sold_common.card_status') }}
          </template>
          <template slot="end_time" slot-scope="text">
            {{ text }}
          </template>
          <template slot="is_open" slot-scope="text">
            {{ text | enumFilter('sold_common.is_open') }}
          </template>
          <template slot="start_time" slot-scope="text">
            {{ text }}
          </template>
          <div slot="action" slot-scope="text, record">
            <st-table-actions>
              <a
                v-if="record.auth['shop:sold:sold_member_card|get']"
                @click="onDetail(record)"
              >
                详情
              </a>
              <a
                v-if="record.auth['shop:sold:sold_member_card|upgrade']"
                @click="cardActions.upgradeCard(record)"
              >
                升级
              </a>
              <a
                v-if="record.auth['shop:sold:sold_member_card|renew']"
                @click="cardActions.onRenewal(record)"
              >
                续卡
              </a>
              <a
                v-if="record.auth['shop:sold:sold_member_card|vaild_time']"
                @click="onSetTime(record)"
              >
                修改有效时间
              </a>
              <a
                v-if="record.auth['shop:sold:sold_member_card|frozen']"
                @click="onFreeze(record)"
              >
                冻结
              </a>
              <a
                v-if="record.auth['shop:sold:sold_member_card|unfrozen']"
                @click="onUnfreeze(record)"
              >
                取消冻结
              </a>
              <a
                v-if="record.auth['shop:sold:sold_member_card|transfer']"
                @click="onTransfer(record)"
              >
                转让
              </a>
              <a
                v-if="record.auth['brand_shop:order:order|refund']"
                @click="onRefund(record)"
              >
                退款
              </a>
              <a
                v-if="record.auth['shop:sold:sold_member_card|export_contract']"
                @click="toContract(record)"
              >
                查看合同
              </a>
              <a
                v-if="record.auth['shop:sold:sold_member_card|vip_region']"
                @click="onArea(record)"
              >
                修改入场vip区域
              </a>
              <a @click="cardActions.onChangeMember(record)">
                变更成员
              </a>
            </st-table-actions>
          </div>
        </st-table>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { MemberService } from './member.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './member.config'
import SoldCardArea from '@/views/biz-modals/sold/card/area'
import SoldCardBatchArea from '@/views/biz-modals/sold/card/batch-area'
import SoldCardBatchEnterTime from '@/views/biz-modals/sold/card/batch-enter-time'
import SoldCardFreeze from '@/views/biz-modals/sold/card/freeze'
import SoldCardGiving from '@/views/biz-modals/sold/card/giving'
import SoldCardRefund from '@/views/biz-modals/sold/card/refund'
import SoldCardSetTime from '@/views/biz-modals/sold/card/set-time'
import SoldCardTransfer from '@/views/biz-modals/sold/card/transfer'
import useCardActions from '@/hooks/card-actions.hook'
import CommonTaskSuccessTip from '@/views/biz-modals/common/task/success-tip'
export default {
  name: 'PageShopSoldCardMemberList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-sold'
  },
  modals: {
    SoldCardArea,
    SoldCardFreeze,
    SoldCardGiving,
    SoldCardRefund,
    SoldCardSetTime,
    SoldCardTransfer,
    CommonTaskSuccessTip,
    SoldCardBatchArea,
    SoldCardBatchEnterTime
  },
  serviceInject() {
    return {
      memberService: MemberService
    }
  },
  rxState() {
    return {
      loading: this.memberService.loading$,
      list: this.memberService.list$,
      page: this.memberService.page$,
      cardTypes: this.memberService.cardTypes$,
      cardStatus: this.memberService.cardStatus$,
      isOpens: this.memberService.isOpens$,
      auth: this.memberService.auth$
    }
  },
  beforeCreate() {
    this.cardActions.$on('refresh', val => {
      this.$router.reload()
    })
  },
  hooks() {
    return {
      cardActions: useCardActions()
    }
  },
  computed: {
    columns,
    // 列表选择的卡是否一致
    isUnifyCard() {
      return (
        this.selectedRows.length > 0 &&
        this.selectedRows.every(
          o => o.card_type === this.selectedRows[0].card_type
        )
      )
    }
  },
  data() {
    return {
      visible: false,
      // 结束时间面板是否显示
      endOpen: false,
      selectedRowKeys: [],
      selectedRows: [],
      diffSelectedRows: [],
      selectTime: {
        startTime: {
          showTime: false,
          disabledBegin: null,
          placeholder: '开始日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: $event => {}
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: $event => {}
        }
      }
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
    disabledSelect(record) {
      if (record.card_status !== 1) {
        return true
      }
    },
    // 查询
    onSearchNative() {
      this.$searchQuery.start_time = this.selectTime.startTime.value
        ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')} 00:00:00`
        : ''
      this.$searchQuery.end_time = this.selectTime.endTime.value
        ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')} 23:59:59`
        : ''
      this.onSearch()
    },
    // 设置searchData
    setSearchData() {
      this.selectTime.startTime.value = this.$searchQuery.start_time
        ? cloneDeep(moment(this.$searchQuery.start_time))
        : null
      this.selectTime.endTime.value = this.$searchQuery.end_time
        ? cloneDeep(moment(this.$searchQuery.end_time))
        : null
    },
    // moment
    moment,
    // 列表选择
    onSelectChange(selectedRowKeys, selectedRows) {
      this.visible = false
      if (selectedRows && selectedRows.length > 0) {
        const firstItem = selectedRows[0]
        this.diffSelectedRows = selectedRows.filter(
          item => item.card_type !== firstItem.card_type
        )
        if (this.diffSelectedRows.length) {
          this.visible = true
        }
      }
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 详情
    onDetail(record) {
      this.$router.push({
        path: `/shop/sold/card/info/member/info/operation-record`,
        query: { id: record.id, card_type: record.card_type }
      })
    },
    // 冻结
    onFreeze(record) {
      this.$modalRouter.push({
        name: 'sold-card-freeze',
        props: {
          id: record.id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 取消冻结
    onUnfreeze(record) {
      this.$confirm({
        title: '提示',
        content: '是否取消冻结？',
        maskClosable: true,
        onOk: () => {
          return this.memberService
            .unFreeze(record.id)
            .toPromise()
            .then(() => {
              this.$router.reload()
            })
        }
      })
    },
    // 退款
    onRefund(record) {
      this.$modalRouter.push({
        name: 'sold-card-refund',
        props: {
          type: 'member',
          id: record.id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 跳转合同
    toContract(record) {
      let url = `${window.location.origin}/common/contract-preview?id=${
        record.order_id
      }`
      window.open(url)
    },
    // 转让
    onTransfer(record) {
      this.$modalRouter.push({
        name: 'sold-card-transfer',
        props: {
          id: record.id,
          type: 'member'
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 修改有效时间
    onSetTime(record) {
      this.$modalRouter.push({
        name: 'sold-card-set-time',
        props: {
          id: record.id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 变更vip入场区域
    onArea(record) {
      this.$modalRouter.push({
        name: 'sold-card-area',
        props: {
          id: [record.id]
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 批量变更vip入场区域
    onAreas() {
      this.$modalRouter.push({
        name: 'sold-card-batch-area',
        props: {
          ids: this.selectedRowKeys,
          searchQuery: cloneDeep(this.$searchQuery)
        },
        on: {
          success: () => {
            this.successTip()
          }
        }
      })
    },
    // 批量变更入场时间段
    onEnterTime() {
      this.$modalRouter.push({
        name: 'sold-card-batch-enter-time',
        props: {
          ids: this.selectedRowKeys,
          searchQuery: cloneDeep(this.$searchQuery)
        },
        on: {
          success: () => {
            this.successTip()
          }
        }
      })
    },
    // 额度赠送
    onGiving() {
      this.$modalRouter.push({
        name: 'sold-card-giving',
        props: {
          ids: this.selectedRowKeys,
          type: this.selectedRows[0].card_type,
          searchQuery: cloneDeep(this.$searchQuery)
        },
        on: {
          success: () => {
            this.successTip()
          }
        }
      })
    },
    successTip() {
      this.$modalRouter.push({
        name: 'common-task-success-tip',
        on: {
          success: () => {
            this.$router.reload()
            this.onClear()
          }
        }
      })
    },
    onClear() {
      this.selectedRowKeys = []
      this.selectedRows = []
    }
  }
}
</script>
