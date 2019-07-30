
<template>
  <div class="shop-member-list">
    <st-panel>
      <div slot="title">
        <st-input-search placeholder="可输入姓名、手机号、卡号" v-model="query.keyword" @search="onSearch" style="width: 290px;"/>
      </div>
      <div slot="prepend">
        <st-search-panel>
          <div :class="basic('select')">
            <span style="width:90px;">用户级别：</span>
            <st-search-radio @change="onSearch" v-model="query.member_level" :list="memberLevel"/>
          </div>
          <div :class="basic('select')">
            <span style="width:90px;">来源方式：</span>
            <st-search-radio :class="basic('select-radio')" @change="onSearch" v-model="query.register_way" :list="sourceList"/>
          </div>
          <div :class="basic('select')">
            <span style="width:90px;">注册时间：</span>
            <st-range-picker :disabledDays="180" :value="selectTime"></st-range-picker>
          </div>
          <div slot="more">
            <div :class="basic('select')">
              <span style="width:90px;">入会时间：</span>
              <st-range-picker :disabledDays="180" :value="selectMemberTime"></st-range-picker>
            </div>
            <div :class="basic('select')">
              <span style="width:90px;">员工跟进：</span>
              <st-search-radio @change="onSearch" v-model="query.is_follow" :list="isFollow"/>
            </div>
          </div>
          <div slot="button">
            <st-button type="primary" @click="onSearchNative" :loading="loading.getListInfo">查询</st-button>
            <st-button class="mgl-8" @click="onSearhReset">重置</st-button>
          </div>
        </st-search-panel>
      </div>
      <div class="mg-t24 mg-b16">
        <st-button type="primary" @click="addUser()" class="shop-member-list-button" v-if="auth.add" icon='add'>
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
            :disabled="selectedRows.length > 0 ? false :true"
          >分配员工</st-button>
        </a-popover>
        <!-- NOTE: 导出 -->
        <!-- <st-button v-if="auth.export" :disabled='isSelectedDisabled' class="shop-member-list-button">批量导出</st-button> -->
      </div>
      <st-table
        :columns="columns"
        :scroll="{x:1400}"
        :alertSelection="{onReset:onSelectionReset}"
        :rowSelection="{selectedRowKeys,onChange:onSelectionChange}"
        rowKey="member_id"
        :page="page"
        @change="onTableChange"
        :dataSource="list"
      >
        <div slot="image_face" slot-scope="text,record">
          <span class="st-preview-item" v-viewer>
            <img
              v-if="record.image_face"
              :class="basic('image-face')"
              :src="record.image_face.url"
              :data-src="record.image_face.url"
            />
          </span>
        </div>
        <div slot="member_name" slot-scope="text,record">
          <a href="javascript:;" v-if="record.auth['shop:member:member|get']" @click="infoFunc(record)">{{text}}</a>
          <span v-else>{{text}}</span>
        </div>
        <div slot="action" slot-scope="text, record">
          <st-table-actions>
            <a v-if="record.auth['shop:member:member|get']" @click="infoFunc(record)">详情</a>
            <a v-if="record.auth['shop:member:member|edit']" @click="edit(record)">编辑</a>
            <a v-if="record.auth['shop:member:member|bind_coach']" @click="onDistributionCoach(record)">分配教练</a>
            <a v-if="record.auth['shop:member:member|bind_salesman']" @click="onDistributionSale(record)">分配销售</a>
            <a v-if="record.auth['shop:member:member|bind_card']" v-modal-link="{
               name: 'shop-binding-entity-card',
               props:{record},
               on: {
                 success: refeshPage
               }
            }">绑实体卡</a>
            <a v-if="record.auth['shop:member:member|rebind_card']" v-modal-link="{ name: 'shop-missing-card', props:{record}}">重绑实体卡</a>
            <!-- <a v-if="record.auth['shop:member:member|transfer']" v-modal-link="{ name: 'shop-transfer-shop', props:{record}, on: {
                 success: refeshPage
               } }">转店</a> -->
            <a v-if="record.auth['shop:member:member|frozen']" v-modal-link="{ name: 'shop-frozen', props:{record}, on: {
                 success: refeshPage
               } }">冻结用户</a>
            <a v-if="record.auth['shop:member:member|unbind_wechat']" @click="onRemoveBind(record)">解除微信绑定</a>
          </st-table-actions>
        </div>
      </st-table>
    </st-panel>
  </div>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { UserService } from '@/services/user.service'
import { ListService } from './list.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './list.config'
import StRangePicker from '@/views/components/datetime-picker/range-picker'

export default {
  name: 'memberList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-finance'
  },
  serviceInject() {
    return {
      listService: ListService,
      userService: UserService,
      routeService: RouteService
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.listService.loading$,
      shopMemberEnums: user.shopMemberEnums$,
      reserveEnums: user.reserveEnums$,
      memberEnums: user.memberEnums$,
      auth: this.listService.auth$,
      query: this.routeService.query$,
      list: this.listService.list$,
      page: this.listService.page$
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
      selectTime: {
        startTime: {
          showTime: false,
          disabledBegin: null,
          placeholder: '开始日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: ($event) => { }
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: ($event) => {}
        }
      },
      selectMemberTime: {
        startTime: {
          showTime: false,
          disabledBegin: null,
          placeholder: '开始日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: ($event) => { }
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: ($event) => {}
        }
      }
    }
  },
  computed: {
    columns,
    memberLevel() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.shopMemberEnums.member_level) return list
      Object.entries(this.shopMemberEnums.member_level.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    isFollow() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.memberEnums.is_follow) return list
      Object.entries(this.memberEnums.is_follow.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    defaultRegValue() {
      if (!this.query.register_start_time) return []
      return [moment(this.query.register_start_time, this.dateFormat), moment(this.query.register_stop_time, this.dateFormat)]
    },
    defaultBeMemberValue() {
      if (!this.query.be_member_start_time) return null
      return [moment(this.query.be_member_start_time, this.dateFormat), moment(this.query.be_member_stop_time, this.dateFormat)]
    },
    sourceList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.memberEnums.source_channel) return list
      Object.entries(this.memberEnums.source_channel.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  mounted() {
    this.sourceRegisters()
    this.setSearchData()
  },
  watch: {
    query(newVal) {
      this.setSearchData()
    }
  },
  components: {
    StRangePicker
  },
  methods: {
    refeshPage() {
      this.$router.push({ force: true })
    },
    sourceRegisters() {
      this.listService.getMemberSourceRegisters().subscribe(status => {
        this.sourceRegisterList = status
      })
    },
    // 查询
    onSearchNative() {
      this.query.register_start_time = this.selectTime.startTime.value ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')}` : ''
      this.query.register_stop_time = this.selectTime.endTime.value ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')}` : ''
      this.query.be_member_start_time = this.selectMemberTime.startTime.value ? `${this.selectMemberTime.startTime.value.format('YYYY-MM-DD')}` : ''
      this.query.be_member_stop_time = this.selectMemberTime.endTime.value ? `${this.selectMemberTime.endTime.value.format('YYYY-MM-DD')}` : ''
      this.onSearch()
    },
    // 设置searchData
    setSearchData() {
      this.selectTime.startTime.value = this.query.register_start_time
        ? cloneDeep(moment(this.query.register_start_time))
        : null
      this.selectTime.endTime.value = this.query.register_stop_time
        ? cloneDeep(moment(this.query.register_stop_time))
        : null
      this.selectMemberTime.startTime.value = this.query.be_member_start_time
        ? cloneDeep(moment(this.query.be_member_start_time))
        : null
      this.selectMemberTime.endTime.value = this.query.be_member_stop_time
        ? cloneDeep(moment(this.query.be_member_stop_time))
        : null
    },
    // 分配教练
    onDistributionCoach(record) {
      if (record.follow_coach) {
        this.$confirm({
          title: '提示信息',
          content: '该用户已存在跟进教练，是否确认替换？',
          onOk: () => {
            this.$modalRouter.push({
              name: 'shop-distribution-coach',
              props: {
                memberIds: [record.member_id],
                coachId: record.follow_coach_id
              },
              on: {
                success: () => {
                  this.$router.push({ force: true })
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
              this.$router.push({ force: true })
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
                  this.$router.push({ force: true })
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
              this.$router.push({ force: true })
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
          this.listService.removeWechatBind(record.member_id).subscribe(() => {
            this.$router.push({ force: true })
          })
        },
        onCancel() {}
      })
    },
    edit(record) {
      this.$router.push({ name: 'shop-member-edit', query: { id: record.member_id } })
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
    queryFunc() {
      this.$router.push({ query: this.form })
    }
  }
}
</script>
