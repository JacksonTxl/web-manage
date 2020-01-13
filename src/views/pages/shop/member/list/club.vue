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
      <st-search-panel @search="onSearchNative" @reset="onSearchReset">
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
          <st-search-panel-item label="跟进销售：">
            <a-select
              class="mg-r40 select"
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
          </st-search-panel-item>
          <st-search-panel-item label="跟进教练：">
            <a-select
              class=" select"
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
            <st-input-number
              :min="0"
              :max="9999"
              :step="1"
              :precision="0"
              placeholder="输入天数"
              class="input"
              v-model="$searchQuery.saleman_protect_remain"
            />
            天内销售客保到期
            <st-input-number
              :min="0"
              :max="9999"
              :step="1"
              :precision="0"
              placeholder="输入天数"
              class="input mg-l40"
              v-model="$searchQuery.coach_protect_remain"
            />
            天内教练客保到期
          </st-search-panel-item>
          <st-search-panel-item label="跟进次数：">
            <st-input-number
              :min="0"
              :max="9999"
              :step="1"
              :precision="0"
              placeholder="0"
              class="input"
              v-model="$searchQuery.follow_min"
            />
            -
            <st-input-number
              :min="0"
              :max="9999"
              :step="1"
              :precision="0"
              placeholder="9999"
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
          },
          on: { success: refeshPage }
        }"
      >
        加标签
      </st-button>
      <st-button
        v-if="auth.unbindSalesman"
        class="shop-member-list-button"
        :disabled="!selectedRows.length"
        @click="dropSalerSea(selectedRowKeys)"
      >
        抛入销售公海
      </st-button>
      <st-button
        v-if="auth.unbindCoach"
        class="shop-member-list-button"
        :disabled="!selectedRows.length"
        @click="dropCoachSea(selectedRowKeys)"
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
                },
                on: { success: refeshPage }
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
                },
                on: { success: refeshPage }
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
      :columns="columns"
      :loading="loading.getListInfo"
      :scroll="{ x: 1800 }"
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
      <span slot="customSaleTitle">
        跟进销售客保天数
        <st-help-tooltip id="TSCRM001" />
      </span>
      <span slot="customCoachTitle">
        跟进教练客保天数
        <st-help-tooltip id="TSCRM002" />
      </span>
      <div slot="member_name" slot-scope="text, record">
        <a
          href="javascript:;"
          v-if="record.auth['shop:member:member|get']"
          @click="infoFunc(record)"
        >
          <st-overflow-text :value="text" maxWidth="100px"></st-overflow-text>
        </a>
        <span v-else>
          <st-overflow-text :value="text" maxWidth="100px"></st-overflow-text>
        </span>
        <st-icon
          v-if="record.is_minors"
          type="user-type"
          class="mg-l4"
          :color="record.sex === SEX.GIRL ? '#FF5E41' : '#3F66F6'"
        />
      </div>
      <div slot="salesman_protect_day" slot-scope="text, record">
        <span class="mg-r4">{{ record.salesman_protect_day }}</span>
        <a-tooltip
          placement="top"
          v-if="record.sales_days_limit && record.follow_salesman_id"
        >
          <template slot="title">
            <span>{{ record.salesman_protect }}</span>
          </template>
          <span><st-icon type="help" /></span>
        </a-tooltip>
      </div>
      <div slot="coach_protect_day" slot-scope="text, record">
        <span class="mg-r4">{{ record.coach_protect_day }}</span>
        <a-tooltip
          placement="top"
          v-if="record.coach_days_limit && record.follow_coach_id"
        >
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
            绑定教练
          </a>
          <a
            v-if="record.auth['shop:member:member|change_coach']"
            @click="onDistributionCoach(record)"
          >
            分配教练
          </a>
          <a
            v-if="record.auth['shop:member:member|bind_salesman']"
            @click="onDistributionSale(record)"
          >
            绑定销售
          </a>
          <a
            v-if="record.auth['shop:member:member|change_salesman']"
            @click="onDistributionSale(record)"
          >
            分配销售
          </a>
          <a
            v-if="record.auth['shop:member:member|unbind_saleman']"
            @click="dropSalerSea(Array.of(record.member_id))"
          >
            抛入销售公海
          </a>
          <a
            v-if="record.auth['shop:member:member|unbind_coach']"
            @click="dropCoachSea(Array.of(record.member_id))"
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
          <a
            v-if="record.auth['shop:member:member|change_type']"
            @click="onChangeUserType(record)"
          >
            变更用户类型
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
import { columns } from './club.config'
import ShopAddLable from '@/views/biz-modals/shop/add-lable'
import ShopBindingEntityCard from '@/views/biz-modals/shop/binding-entity-card'
import ShopDistributionCoach from '@/views/biz-modals/shop/distribution-coach'
import ShopDistributionSale from '@/views/biz-modals/shop/distribution-sale'
import ShopChangeUserType from '@/views/biz-modals/shop/change-user-type'
import ShopFrozen from '@/views/biz-modals/shop/frozen'
import ShopMissingCard from '@/views/biz-modals/shop/missing-card'
import { MessageService } from '@/services/message.service'
import { SEX } from '@/constants/member/info'

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
    ShopChangeUserType
  },
  serviceInject() {
    return {
      clubService: ClubService,
      userService: UserService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      loading: this.clubService.loading$,
      auth: this.clubService.auth$,
      list: this.clubService.list$,
      page: this.clubService.page$,
      saleList: this.clubService.saleList$,
      coachList: this.clubService.coachList$,
      crmRule: this.clubService.crmRule$,
      memberLevel: this.clubService.memberLevel$,
      isFollow: this.clubService.isFollow$,
      sourceList: this.clubService.sourceList$,
      followStatus: this.clubService.followStatus$
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
      SEX
    }
  },
  computed: {
    columns
  },
  created() {},
  mounted() {
    this.sourceRegisters()
  },
  methods: {
    refeshPage() {
      this.selectedRowKeys = []
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
        this.messageService.warn({
          content: '最小跟进次数要小于最大跟进次数'
        })
        return
      }
      this.onSearch()
    },
    // 分配教练
    onDistributionCoach(record) {
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
    // 分配销售
    onDistributionSale(record) {
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
    dropCoachSea(para) {
      this.$confirm({
        title: '提示信息',
        content: '是否将客户抛入公海？',
        onOk: () => {
          this.clubService.dropCoachSea({ member_ids: para }).subscribe(() => {
            this.refeshPage()
          })
        },
        onCancel() {}
      })
    },
    dropSalerSea(para) {
      this.$confirm({
        title: '提示信息',
        content: '是否将客户抛入公海？',
        onOk: () => {
          this.clubService.dropSalerSea({ member_ids: para }).subscribe(() => {
            this.refeshPage()
          })
        },
        onCancel() {}
      })
    },
    onChangeUserType(record) {
      this.$modalRouter.push({
        name: 'shop-change-user-type',
        props: {
          info: record
        },
        on: {
          success: () => {
            this.refeshPage()
          }
        }
      })
    },
    edit(record) {
      this.$router.push({
        name: 'shop-member-edit',
        query: { id: record.member_id }
      })
    },
    addUser() {
      this.$router.push({ name: 'shop-member-add' })
    },
    infoFunc(record) {
      this.$router.push({
        name: 'shop-member-info-basic',
        query: { id: record.member_id }
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
      this.$router.push({ query: {} })
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
      this.$router.push({ query: this.form })
    }
  }
}
</script>
