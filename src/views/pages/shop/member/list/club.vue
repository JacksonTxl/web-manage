<template>
  <st-panel app class="shop-member-list">
    <div slot="title">
      <st-input-search
        placeholder="输入用户姓名、手机号"
        v-model="$searchQuery.keyword"
        @search="onKeywordsSearch('keyword', $event)"
      />
    </div>
    <div slot="prepend">
      <st-search-panel @search="onSearchNative" @reset="onSearhReset">
        <st-search-panel-item label="用户级别：">
          <st-search-radio
            v-model="$searchQuery.member_level"
            :options="memberLevel"
          />
        </st-search-panel-item>
        <st-search-panel-item label="来源方式：">
          <st-search-radio
            v-model="$searchQuery.register_way"
            :options="sourceList"
          />
        </st-search-panel-item>
        <st-search-panel-item label="跟进状态：">
          <st-search-radio
            v-model="$searchQuery.follow_status"
            :options="followStatus"
          />
        </st-search-panel-item>
        <div slot="more">
          <st-search-panel-item label="跟进员工：">
            <a-select
              class="mg-t8 mg-r40 select"
              v-model="$searchQuery.follow_salesman_id"
              placeholder="请选择销售"
            >
              <a-select-option
                v-for="(item, index) in saleList"
                :key="index"
                :value="item.id"
              >
                {{ item.sale_name }}
              </a-select-option>
            </a-select>
            <a-select
              class="mg-t8 select"
              v-model="$searchQuery.follow_coach_id"
              placeholder="请选择教练"
            >
              <a-select-option
                v-for="(item, index) in coachList"
                :key="index"
                :value="item.id"
              >
                {{ item.coach_name }}
              </a-select-option>
            </a-select>
          </st-search-panel-item>
          <st-search-panel-item label="客保情况：">
            <a-input
              placeholder="输入天数"
              class="input"
              v-model="$searchQuery.saleman_protect_remain"
            />
            天后销售客保到期
            <a-input
              placeholder="输入天数"
              class="input mg-l40"
              v-model="$searchQuery.coach_protect_remain"
            />
            天后教练客保到期
          </st-search-panel-item>
          <st-search-panel-item label="跟进次数：">
            <a-input
              placeholder="输入次数"
              class="input"
              v-model="$searchQuery.follow_min"
            />
            -
            <a-input
              placeholder="输入次数"
              class="input"
              v-model="$searchQuery.follow_max"
            />
          </st-search-panel-item>
        </div>
      </st-search-panel>
    </div>
    <div class="mg-t24 mg-b16">
      <st-button
        type="primary"
        @click="addUser()"
        class="shop-member-list-button"
        v-if="auth.add"
        icon="add"
      >
        添加用户
      </st-button>
      <!-- NOTE: 导入 -->
      <!-- <st-button class="shop-member-list-button" v-if="auth.import">导入用户</st-button> -->
      <st-button
        v-if="auth.tag"
        class="shop-member-list-button"
        :disabled="!selectedRows.length"
        v-modal-link="{
          name: 'shop-add-lable',
          props: {
            memberIds: selectedRowKeys
          }
        }"
      >
        加标签
      </st-button>
      <st-button
        v-if="auth.sale"
        class="shop-member-list-button"
        :disabled="!selectedRows.length"
        v-modal-link="{
          name: 'shop-drop-saler-sea',
          props: { memberIds: selectedRowKeys },
          on: {
            success: refeshPage
          }
        }"
      >
        抛入销售公海
      </st-button>
      <st-button
        v-if="auth.coach"
        class="shop-member-list-button"
        :disabled="!selectedRows.length"
        v-modal-link="{
          name: 'shop-drop-coach-sea',
          props: { memberIds: selectedRowKeys },
          on: {
            success: refeshPage
          }
        }"
      >
        抛入教练公海
      </st-button>
      <a-popover placement="bottom">
        <template slot="content">
          <div v-if="auth.bindCoach" class="shop-member-list-button-div">
            <label
              class="shop-member-list-button-label"
              v-modal-link="{
                name: 'shop-distribution-coach',
                props: {
                  memberIds: selectedRowKeys
                }
              }"
            >
              分配教练
            </label>
          </div>
          <div v-if="auth.bindSalesman" class="shop-member-list-button-div">
            <label
              class="shop-member-list-button-label"
              v-modal-link="{
                name: 'shop-distribution-sale',
                props: {
                  memberIds: selectedRowKeys
                }
              }"
            >
              分配销售
            </label>
          </div>
        </template>
        <st-button
          v-if="auth.bindCoach && auth.bindSalesman"
          class="shop-member-list-button"
          :disabled="selectedRows.length > 0 ? false : true"
        >
          分配员工
        </st-button>
      </a-popover>
      <!-- NOTE: 导出 -->
      <!-- <st-button v-if="auth.export" :disabled='isSelectedDisabled' class="shop-member-list-button">批量导出</st-button> -->
    </div>
    <st-table
      :columns="
        crmRule.sales_is_protect
          ? saleColumns
          : crmRule.coach_is_protect
          ? coachColumns
          : columns
      "
      :loading="loading.getListInfo"
      :scroll="{ x: 1400 }"
      :alertSelection="{ onReset: onSelectionReset }"
      :rowSelection="{ selectedRowKeys, onChange: onSelectionChange }"
      rowKey="member_id"
      :page="page"
      @change="onTableChange"
      :dataSource="list"
    >
      <div slot="image_face" slot-scope="text, record">
        <span class="st-preview-item st-preview-item--cover" v-viewer>
          <img
            v-if="record.image_face"
            class="st-image-face"
            :src="record.image_face.url"
            :data-src="record.image_face.url"
          />
        </span>
      </div>
      <div slot="member_name" slot-scope="text, record">
        <a
          href="javascript:;"
          v-if="record.auth['shop:member:member|get']"
          @click="infoFunc(record)"
        >
          {{ text }}
        </a>
        <span v-else>{{ text }}</span>
      </div>
      <div slot="salesman_protect_day" slot-scope="text, record">
        <span class="mg-r4">{{ record.salesman_protect_day }}</span>
        <a-tooltip placement="top" v-if="record.sales_days_limit">
          <template slot="title">
            <span>{{ record.salesman_protect }}</span>
          </template>
          <span><st-icon type="help" /></span>
        </a-tooltip>
      </div>
      <div slot="coach_protect_day" slot-scope="text, record">
        <span class="mg-r4">{{ record.coach_protect_day }}</span>
        <a-tooltip placement="top" v-if="record.coach_days_limit">
          <template slot="title">
            <span>{{ record.coach_protect }}</span>
          </template>
          <span><st-icon type="help" /></span>
        </a-tooltip>
      </div>
      <div slot="action" slot-scope="text, record">
        <st-table-actions>
          <a
            v-if="record.auth['shop:member:member|get']"
            @click="infoFunc(record)"
          >
            详情
          </a>
          <a
            v-if="record.auth['shop:member:member|edit']"
            @click="edit(record)"
          >
            编辑
          </a>
          <a
            v-if="record.auth['shop:member:member|bind_coach']"
            @click="onDistributionCoach(record)"
          >
            分配教练
          </a>
          <a
            v-if="record.auth['shop:member:member|bind_salesman']"
            @click="onDistributionSale(record)"
          >
            分配销售
          </a>
          <a
            v-if="record.auth['shop:member:member|unbind_saleman']"
            v-modal-link="{
              name: 'shop-drop-saler-sea',
              props: { memberIds: Array.of(record.member_id) },
              on: {
                success: refeshPage
              }
            }"
          >
            抛入销售公海
          </a>
          <a
            v-if="record.auth['shop:member:member|unbind_coach']"
            v-modal-link="{
              name: 'shop-drop-coach-sea',
              props: { memberIds: Array.of(record.member_id) },
              on: {
                success: refeshPage
              }
            }"
          >
            抛入教练公海
          </a>
          <a
            v-if="record.auth['shop:member:member|bind_card']"
            v-modal-link="{
              name: 'shop-binding-entity-card',
              props: { record },
              on: {
                success: refeshPage
              }
            }"
          >
            绑实体卡
          </a>
          <a
            v-if="record.auth['shop:member:member|rebind_card']"
            v-modal-link="{ name: 'shop-missing-card', props: { record } }"
          >
            重绑实体卡
          </a>
          <!-- <a v-if="record.auth['shop:member:member|transfer']" v-modal-link="{ name: 'shop-transfer-shop', props:{record}, on: {
                 success: refeshPage
               } }">转店</a> -->
          <a
            v-if="record.auth['shop:member:member|frozen']"
            v-modal-link="{
              name: 'shop-frozen',
              props: { record },
              on: {
                success: refeshPage
              }
            }"
          >
            冻结用户
          </a>
          <a
            v-if="record.auth['shop:member:member|unbind_wechat']"
            @click="onRemoveBind(record)"
          >
            解除微信绑定
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </st-panel>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { UserService } from '@/services/user.service'
import { ClubService } from './club.service'
import tableMixin from '@/mixins/table.mixin'
import { columns, coachColumns, saleColumns } from './club.config'
import ShopAddLable from '@/views/biz-modals/shop/add-lable'
import ShopBindingEntityCard from '@/views/biz-modals/shop/binding-entity-card'
import ShopDistributionCoach from '@/views/biz-modals/shop/distribution-coach'
import ShopDistributionSale from '@/views/biz-modals/shop/distribution-sale'
import ShopFrozen from '@/views/biz-modals/shop/frozen'
import ShopMissingCard from '@/views/biz-modals/shop/missing-card'
import ShopDropSalerSea from '@/views/biz-modals/shop/drop-saler-sea'
import ShopDropCoachSea from '@/views/biz-modals/shop/drop-coach-sea'
import { MessageService } from '@/services/message.service'

export default {
  name: 'ShopMemberListClub',
  mixins: [tableMixin],
  modals: {
    ShopAddLable,
    ShopBindingEntityCard,
    ShopDistributionCoach,
    ShopDistributionSale,
    ShopFrozen,
    ShopMissingCard,
    ShopDropCoachSea,
    ShopDropSalerSea
  },
  serviceInject() {
    return {
      clubService: ClubService,
      userService: UserService,
      messageService: MessageService
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.clubService.loading$,
      shopMemberEnums: user.shopMemberEnums$,
      reserveEnums: user.reserveEnums$,
      memberEnums: user.memberEnums$,
      auth: this.clubService.auth$,
      list: this.clubService.list$,
      page: this.clubService.page$
    }
  },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      expand: false,
      sourceRegisterList: [],
      consumption: [],
      selectDataList: [],
      selectedRowKeys: [],
      selectedRows: [],
      coachList: [],
      saleList: [],
      crmRule: {}
    }
  },
  computed: {
    columns,
    coachColumns,
    saleColumns,
    memberLevel() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.shopMemberEnums.member_level) return list
      Object.entries(this.shopMemberEnums.member_level.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    sourceList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.memberEnums.source_channel) return list
      Object.entries(this.memberEnums.source_channel.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    followStatus() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.memberEnums.follow_status) return list
      Object.entries(this.memberEnums.source_channel.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
    // computedColumn() {
    //   let res = this.crmRule.sales_is_protect
    //     ? this.saleColumns
    //     : this.crmRule.coach_is_protect
    //     ? this.coachColumns
    //     : columns
    //   return res
    // }
  },
  created() {
    this.getCoachList()
    this.getSaleList()
    this.getCrmRule()
  },
  mounted() {
    this.sourceRegisters()
  },
  methods: {
    refeshPage() {
      this.$router.reload()
    },
    sourceRegisters() {
      this.clubService.getMemberSourceRegisters().subscribe(status => {
        this.sourceRegisterList = status
      })
    },
    // 查询
    onSearchNative() {
      if (this.$searchQuery.follow_min > this.$searchQuery.follow_max) {
        this.messageService.warning({
          content: '最小跟进次数要小于最大跟进次数'
        })
        return
      }
      this.onSearch()
    },
    // 分配教练
    onDistributionCoach(record) {
      if (record.follow_coach) {
        this.$confirm({
          title: '提示信息',
          content: `该用户已存在跟进${this.$c('coach')}，是否确认替换？`,
          onOk: () => {
            this.$modalRouter.push({
              name: 'shop-distribution-coach',
              props: {
                memberIds: [record.member_id],
                coachId: record.follow_coach_id
              },
              on: {
                success: () => {
                  this.$router.reload()
                }
              }
            })
          },
          onCancel() {}
        })
      } else {
        this.$modalRouter.push({
          name: 'shop-distribution-coach',
          props: {
            memberIds: [record.member_id],
            coachId: record.follow_coach_id
          },
          on: {
            success: () => {
              this.$router.reload()
            }
          }
        })
      }
    },
    // 分配销售
    onDistributionSale(record) {
      if (record.follow_salesman) {
        this.$confirm({
          title: '提示信息',
          content: '该用户已存在跟进销售，是否确认替换？',
          onOk: () => {
            this.$modalRouter.push({
              name: 'shop-distribution-sale',
              props: {
                memberIds: [record.member_id],
                saleId: record.follow_salesman_id
              },
              on: {
                success: () => {
                  this.$router.reload()
                }
              }
            })
          },
          onCancel() {}
        })
      } else {
        this.$modalRouter.push({
          name: 'shop-distribution-sale',
          props: {
            memberIds: [record.member_id],
            saleId: record.follow_salesman_id
          },
          on: {
            success: () => {
              this.$router.reload()
            }
          }
        })
      }
    },
    onRemoveBind(record) {
      this.$confirm({
        title: '提示信息',
        content: '确认解绑选中的会员关系？',
        onOk: () => {
          this.clubService.removeWechatBind(record.member_id).subscribe(() => {
            this.$router.reload()
          })
        },
        onCancel() {}
      })
    },
    edit(record) {
      this.$router.push({
        name: 'shop-member-edit',
        $searchQuery: { id: record.member_id }
      })
    },
    addUser() {
      this.$router.push({ name: 'shop-member-add' })
    },
    infoFunc(record) {
      this.$router.push({
        name: 'shop-member-info-basic',
        $searchQuery: { id: record.member_id }
      })
    },
    moment,
    handleReset() {
      let self = this
      for (let prop in self.form) {
        self.form[prop] = ''
      }
      this.$refs.stSeleter.handleResetItem()
      this.consumption = []
      this.$router.push({ $searchQuery: {} })
    },
    toggle() {
      this.expand = !this.expand
    },
    onSelectionReset() {
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    onSelectionChange(keys, selectedRows) {
      this.selectedRowKeys = keys
      this.selectedRows = selectedRows
      this.selectDataList = selectedRows.map(item => {
        return item.id
      })
    },
    $searchQueryFunc() {
      this.$router.push({ $searchQuery: this.form })
    },
    getCoachList() {
      return this.clubService.getCoachList().subscribe(res => {
        this.coachList = res.list
      })
    },
    getSaleList() {
      return this.clubService.getSaleList().subscribe(res => {
        this.saleList = res.list
      })
    },
    getCrmRule() {
      return this.clubService.getCrmRule().subscribe(res => {
        this.crmRule = res
      })
    }
  }
}
</script>
