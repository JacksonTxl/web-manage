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
        <st-search-panel-item label="注册时间：">
          <st-range-picker :disabledDays="180" v-model="date" />
        </st-search-panel-item>
        <div slot="more">
          <st-search-panel-item label="入会时间：">
            <st-range-picker :disabledDays="180" v-model="memberDate" />
          </st-search-panel-item>
          <st-search-panel-item label="员工跟进：">
            <st-search-radio
              v-model="$searchQuery.is_follow"
              :options="isFollow"
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
          <st-overflow-text :value="text" maxWidth="100px"></st-overflow-text>
        </a>
        <span v-else>
          <st-overflow-text :value="text" maxWidth="100px"></st-overflow-text>
        </span>
        <st-icon
          type="user-type"
          v-if="record.sex === SEX.BOY && record.is_minors"
          color="#3F66F6"
        />
        <st-icon
          type="user-type"
          v-if="record.sex === SEX.GIRL && record.is_minors"
          color="#FF5E41"
        />
      </div>
      <div slot="action" slot-scope="text, record">
        <st-table-actions>
          <a
            v-if="record.auth['shop:member:member|get']"
            @click="infoFunc(record)"
          >
            详情
          </a>
          <a @click="edit(record)">
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
import { StudioService } from './studio.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './studio.config'
import ShopAddLable from '@/views/biz-modals/shop/add-lable'
import ShopBindingEntityCard from '@/views/biz-modals/shop/binding-entity-card'
import ShopDistributionCoach from '@/views/biz-modals/shop/distribution-coach'
import ShopDistributionSale from '@/views/biz-modals/shop/distribution-sale'
import ShopChangeUserType from '@/views/biz-modals/shop/change-user-type'
import ShopFrozen from '@/views/biz-modals/shop/frozen'
import ShopMissingCard from '@/views/biz-modals/shop/missing-card'
import { SEX } from '@/constants/member/info'
export default {
  name: 'ShopMemberListStudio',
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
      studioService: StudioService,
      userService: UserService
    }
  },
  rxState() {
    return {
      loading: this.studioService.loading$,
      auth: this.studioService.auth$,
      list: this.studioService.list$,
      page: this.studioService.page$,
      memberLevel: this.studioService.memberLevel$,
      isFollow: this.studioService.isFollow$,
      sourceList: this.studioService.sourceList$
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
      date: [],
      memberDate: [],
      SEX
    }
  },
  computed: {
    columns
  },
  mounted() {
    this.sourceRegisters()
    this.setSearchData()
  },
  watch: {
    $searchQuery(newVal) {
      this.setSearchData()
    }
  },

  methods: {
    refeshPage() {
      this.selectedRowKeys = []
      this.$router.reload()
    },
    sourceRegisters() {
      this.studioService.getMemberSourceRegisters().subscribe(status => {
        this.sourceRegisterList = status
      })
    },
    // 查询
    onSearchNative() {
      this.$searchQuery.register_start_time = this.date[0]
        ? `${this.date[0].format('YYYY-MM-DD')}`
        : ''
      this.$searchQuery.register_stop_time = this.date[1]
        ? `${this.date[1].format('YYYY-MM-DD')}`
        : ''
      this.$searchQuery.be_member_start_time = this.memberDate[0]
        ? `${this.memberDate[0].format('YYYY-MM-DD')}`
        : ''
      this.$searchQuery.be_member_stop_time = this.memberDate[1]
        ? `${this.memberDate[1].format('YYYY-MM-DD')}`
        : ''
      this.onSearch()
    },
    // 设置searchData
    setSearchData() {
      const start = this.$searchQuery.register_start_time
        ? cloneDeep(moment(this.$searchQuery.register_start_time))
        : null
      const end = this.$searchQuery.register_stop_time
        ? cloneDeep(moment(this.$searchQuery.register_stop_time))
        : null
      const memberStart = this.$searchQuery.be_member_start_time
        ? cloneDeep(moment(this.$searchQuery.be_member_start_time))
        : null
      const memberEnd = this.$searchQuery.be_member_stop_time
        ? cloneDeep(moment(this.$searchQuery.be_member_stop_time))
        : null
      this.date = [start, end]
      this.memberDate = [memberStart, memberEnd]
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
            this.refeshPage()
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
            this.refeshPage()
          }
        }
      })
    },
    onRemoveBind(record) {
      this.$confirm({
        title: '提示信息',
        content: '确认解绑选中的会员关系？',
        onOk: () => {
          this.studioService
            .removeWechatBind(record.member_id)
            .subscribe(() => {
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
